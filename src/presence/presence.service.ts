import { Injectable, NotFoundException } from '@nestjs/common';
import { spawn, ChildProcess, exec } from 'child_process';
import * as path from 'path';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Presence } from './entities/presence.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Etudiant } from 'src/etudiant/entities/etudiant.entity';
import { AiLog } from './entities/ai-log.entity';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationType } from 'src/notification/entities/notification.entity';
import { presenceType } from './entities/presence.entity';

@Injectable()
export class PresenceService {
  private aiProcess: ChildProcess | null = null;
  private piProcess: ChildProcess | null = null;



  constructor(
    @InjectRepository(Presence) private presenceRepository: Repository<Presence>,
    @InjectRepository(Etudiant) private etudiantRepository: Repository<Etudiant>,
    @InjectRepository(AiLog) private aiLogRepository: Repository<AiLog>,
    private readonly notificationService: NotificationService
  ) {

  }



  async create(createPresenceDto: CreatePresenceDto): Promise<Presence> {

    const etudiant = await this.etudiantRepository.findOne({ where: { id: createPresenceDto.etudiant } })
    if (!etudiant) {
      throw new NotFoundException("etudiant not found")
    }

    const newpresence = await this.presenceRepository.create({ ...createPresenceDto, etudiant: etudiant })
    const saved = await this.presenceRepository.save(newpresence);

    if (saved.statut === presenceType.ABSENT) {
      try {
        // Extract matiere name from seance (e.g. "Réseaux (COURS)" -> "Réseaux")
        const matiereName = saved.seance.split('(')[0].trim().toLowerCase();
        
        // Find all absences for this student in this specific matiere
        const allPresences = await this.presenceRepository.find({ where: { etudiant: { id: etudiant.id }, statut: presenceType.ABSENT } });
        const absencesInMatiere = allPresences.filter(p => p.seance.toLowerCase().startsWith(matiereName)).length;

        let titre = "Absence enregistrée";
        let message = `Une absence a été enregistrée pour vous en ${saved.seance}. Total: ${absencesInMatiere} absence(s).`;

        if (absencesInMatiere === 3) {
          titre = "Avertissement : Absences";
          message = `Dernier avertissement : encore une absence et vous serez éliminé de la matière ${matiereName.toUpperCase()}.`;
        } else if (absencesInMatiere >= 4) {
          titre = "Élimination";
          message = `Vous avez été éliminé de la matière ${matiereName.toUpperCase()} suite à 4 absences.`;
        }

        await this.notificationService.create({
          titre,
          message,
          type: NotificationType.ABSENCE,
          user: etudiant.id
        });
      } catch (err) {
        console.error('Erreur lors de la notification absence:', err);
      }
    }

    return saved;
  }


  async findByEtudiant(etudiantId: number): Promise<Presence[]> {
    return this.presenceRepository.find({ 
      where: { etudiant: { id: etudiantId } },
      order: { id: 'DESC' }
    });
  }


  async findAll(): Promise<Presence[]> {
    const presence = await this.presenceRepository.find()
    return presence
  }








  async findOne(id: number): Promise<Presence> {
    const presence = await this.presenceRepository.findOneBy({ id })
    if (!presence) {
      throw new NotFoundException("presence not found")
    }
    return presence
  }






  async update(id: number, updatePresenceDto: UpdatePresenceDto): Promise<Presence> {
    const presence = await this.presenceRepository.findOneBy({ id })
    if (!presence) {
      throw new NotFoundException("presence not found")
    }
    const updatedpresence = await this.presenceRepository.preload({ ...updatePresenceDto as DeepPartial<Presence>, id })
    if (!updatedpresence) {
      throw new NotFoundException(`can not update a #${id} presence `)

    }
    return this.presenceRepository.save(updatedpresence)
  }




  async remove(id: number) {
    const presence = await this.presenceRepository.findOneBy({ id })
    if (!presence) {
      throw new NotFoundException("presence not found")

    }
    await this.presenceRepository.delete(id)
    return id
  }

  startAI() {
    if (this.aiProcess) return { message: 'AI is already running' };

    const pythonPath = 'python'; 
    const scriptPath = path.join(__dirname, '..', '..', '..', 'ai', 'face-api', 'web_stream.py');

    // 1. Démarrer le serveur local (PC)
    this.aiProcess = spawn(pythonPath, [scriptPath]);
    console.log(`Démarrage du serveur AI local: ${scriptPath}`);

    // 2. Démarrer le serveur caméra distant (Raspberry Pi via SSH)
    const piCommand = 'ssh -o StrictHostKeyChecking=no adnen@192.168.1.23 "python3 \\$(find ~ -name camera_server.py -print -quit 2>/dev/null)"';
    console.log(`Exécution de la commande SSH: ${piCommand}`);
    this.piProcess = spawn('ssh', ['-o', 'StrictHostKeyChecking=no', 'adnen@192.168.1.23', 'python3 $(find ~ -name camera_server.py -print -quit 2>/dev/null)']);

    this.aiProcess.stdout.on('data', (data) => console.log(`AI Local: ${data}`));
    this.aiProcess.stderr.on('data', (data) => console.error(`AI Local Error: ${data}`));
    
    this.piProcess.stdout.on('data', (data) => console.log(`Raspberry Pi: ${data}`));
    this.piProcess.stderr.on('data', (data) => console.error(`Raspberry Pi Error: ${data}`));

    return { message: 'AI and Camera processes started' };
  }

  stopAI() {
    let message = "";
    if (this.aiProcess) {
      this.aiProcess.kill();
      this.aiProcess = null;
      message += 'AI stopped. ';
    }
    if (this.piProcess) {
      // Pour arrêter proprement sur le Pi, on peut envoyer un kill via SSH
      spawn('ssh', ['adnen@192.168.1.23', 'pkill -f camera_server.py']);
      this.piProcess.kill();
      this.piProcess = null;
      message += 'Camera Pi stopped.';
    }
    return { message: message || 'Nothing was running' };
  }

  async detectFromImage(imagePath: string, classeId: number): Promise<{ detected_ids: number[] }> {
    return new Promise((resolve) => {
      const scriptDir  = path.join(process.cwd(), '..', 'ai', 'face-api');
      const scriptPath = path.join(scriptDir, 'detect_from_image.py');
      const absImagePath = path.resolve(imagePath);

      console.log(`[detect-from-image] Script: ${scriptPath}`);
      console.log(`[detect-from-image] Image : ${absImagePath}`);
      console.log(`[detect-from-image] Classe: ${classeId}`);
      console.log(`[detect-from-image] CWD   : ${scriptDir}`);

      const python = spawn('python', [scriptPath, absImagePath, classeId.toString()], {
        cwd: scriptDir,   // CRUCIAL : le script utilise des imports relatifs (services/train)
      });

      let stdout = '';
      let stderr = '';

      python.stdout.on('data', (data) => { stdout += data.toString(); });
      python.stderr.on('data', (data) => {
        stderr += data.toString();
        // Logger en temps réel pour debug
        console.log(`[Python] ${data.toString().trim()}`);
      });

      python.on('close', (code) => {
        console.log(`[detect-from-image] Exit code: ${code}`);
        console.log(`[detect-from-image] stdout: ${stdout.trim()}`);
        if (code !== 0) {
          console.error(`[detect-from-image] stderr: ${stderr}`);
        }
        try {
          const jsonMatch = stdout.match(/(\[.*\]|\{.*\})/s);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);

            // Enregistrer les stats IA automatiquement
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && parsed.total_faces !== undefined) {
               const newLog = this.aiLogRepository.create({
                 totalFaces: parsed.total_faces || 0,
                 recognizedFaces: parsed.recognized_count || 0
               });
               this.aiLogRepository.save(newLog).catch(err => console.error('[detect-from-image] Erreur save AiLog:', err));
            }

            if (Array.isArray(parsed)) return resolve({ detected_ids: parsed });
            return resolve(parsed as { detected_ids: number[] });
          }
          console.warn('[detect-from-image] Aucun JSON trouvé dans stdout');
          resolve({ detected_ids: [] });
        } catch (e) {
          console.error('[detect-from-image] JSON parse error:', e, 'stdout:', stdout);
          resolve({ detected_ids: [] });
        }
      });

      python.on('error', (err) => {
        console.error('[detect-from-image] Spawn error:', err);
        resolve({ detected_ids: [] });
      });
    });
  }
}


import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { join } from 'path';

import * as fs from 'fs';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQData {
  faq: FAQItem[];
}

interface FastAPIResponse {
  answer: string;
}

@Injectable()
export class ChatbotService {
  private faqData: FAQData | null = null;

  constructor() {
    this.loadFAQ();
  }

  private loadFAQ() {
    try {
      const faqPath = join(__dirname, '..', '..', '..', 'chatbot', 'faq.json');
      const data = fs.readFileSync(faqPath, 'utf-8');
      this.faqData = JSON.parse(data);
      console.log('FAQ chargée avec succès:', this.faqData.faq.length, 'questions');
    } catch (error) {
      console.error('Erreur lors du chargement de la FAQ:', error);
      this.faqData = { faq: [] };
    }
  }

  // Mode FAQ simple sans Python - recherche par mots-clés
  private findAnswerSimple(question: string): string | null {
    if (!this.faqData || this.faqData.faq.length === 0) {
      return null;
    }

    const questionLower = question.toLowerCase();
    const keywords = questionLower.split(/\s+/).filter(w => w.length > 2);

    let bestMatch: FAQItem | null = null;
    let bestScore = 0;

    for (const item of this.faqData.faq) {
      const itemQuestionLower = item.question.toLowerCase();
      const itemAnswerLower = item.answer.toLowerCase();
      
      let score = 0;
      
      // Vérifier les mots-clés
      for (const keyword of keywords) {
        if (itemQuestionLower.includes(keyword)) {
          score += 2;
        }
        if (itemAnswerLower.includes(keyword)) {
          score += 1;
        }
      }

      // Bonus pour correspondance exacte partielle
      if (itemQuestionLower.includes(questionLower)) {
        score += 5;
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    }

    // Retourner la réponse si le score est suffisant
    if (bestMatch && bestScore >= 2) {
      return bestMatch.answer;
    }

    return null;
  }

  async askAI(question: string): Promise<string> {
    // Essayer d'abord le mode simple (100% fonctionnel, pas besoin de Python)
    const simpleAnswer = this.findAnswerSimple(question);
    if (simpleAnswer) {
      console.log('Réponse trouvée en mode FAQ simple');
      return simpleAnswer;
    }

    // Si pas de réponse simple, essayer avec Python (mode IA)
    return new Promise((resolve) => {
      const scriptPath = join(__dirname, '..', '..', '..', 'chatbot', 'run_chat.py');
      
      // Détecter la commande Python (python ou python3)
      const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
      const pythonProcess = spawn(pythonCmd, [scriptPath, question]);
      
      let output = '';
      let errorOutput = '';
      
      // Timeout de 15 secondes (plus court pour fallback rapide)
      const timeout = setTimeout(() => {
        pythonProcess.kill();
        console.log('Timeout Python, utilisation du mode FAQ');
        resolve(this.getDefaultResponse(question));
      }, 15000);
      
      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
      });
      
      pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });
      
      pythonProcess.on('close', (code) => {
        clearTimeout(timeout);
        
        if (code !== 0) {
          console.error('Erreur Python:', errorOutput);
          // Fallback: réponse par défaut
          resolve(this.getDefaultResponse(question));
        } else {
          // Extraire la réponse de la sortie
          const lines = output.split('\n');
          const responseIndex = lines.findIndex(line => line.includes('Réponse :'));
          
          if (responseIndex !== -1 && responseIndex + 1 < lines.length) {
            const answer = lines.slice(responseIndex + 1).join('\n').trim();
            resolve(answer);
          } else {
            resolve(output.trim() || this.getDefaultResponse(question));
          }
        }
      });
      
      pythonProcess.on('error', (error) => {
        clearTimeout(timeout);
        console.error('Erreur process Python:', error);
        resolve(this.getDefaultResponse(question));
      });
    });
  }

  private getDefaultResponse(question: string): string {
    // Dernière chance: chercher une réponse approximative
    const simpleAnswer = this.findAnswerSimple(question);
    if (simpleAnswer) {
      return simpleAnswer;
    }

    // Réponse par défaut si rien n'est trouvé
    return "Désolé, je n'ai pas trouvé de réponse précise à votre question. Voici ce que je peux vous aider à faire:\n\n• Inscription et documents\n• Consulter votre emploi du temps\n• Voir vos notes et absences\n• Questions sur les examens\n\nVeuillez reformuler votre question ou contacter l'administration pour plus d'aide.";
  }

  async askAIProfesseur(question: string): Promise<string> {
    try {
      const axios = (await import('axios')).default;
      const response = await axios.post('http://localhost:8000/ask', {
        question: question
      }, {
        timeout: 30000
      });
      
      const data = response.data as FastAPIResponse;
      return data?.answer || "Désolé, je n'ai pas pu générer de réponse.";
    } catch (error) {
      console.error('Erreur FastAPI chatbot professeur:', error);
      return "Désolé, une erreur s'est produite lors du traitement de votre question. Veuillez réessayer.";
    }
  }
}

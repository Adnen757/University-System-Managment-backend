import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { Matiere } from 'src/matiere/entities/matiere.entity';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
    @InjectRepository(Matiere)
    private readonly matiereRepository: Repository<Matiere>,
  ) { }
  async create(createEvaluationDto: CreateEvaluationDto): Promise<Evaluation> {
    const matiere = await this.matiereRepository.findOne({ where: { id: createEvaluationDto.matiereId } })
    if (!matiere) {
      throw new NotFoundException('matiere not found')
    }
    const newEvaluation = this.evaluationRepository.create({ ...createEvaluationDto, matiere: matiere })
    return this.evaluationRepository.save(newEvaluation)
  }


  async findAll(): Promise<Evaluation[]> {
    const evaluations = await this.evaluationRepository.find()
    if (evaluations.length === 0) {
      throw new NotFoundException("data not found")
    }
    return evaluations

  }

  async findOne(id: number): Promise<Evaluation> {
    const evaluation = await this.evaluationRepository.findOneBy({ id })
    if (!evaluation) {
      throw new NotFoundException("evaluation not found")
    }
    return evaluation
  }




  async update(id: number, UpdateEvaluationDto: UpdateEvaluationDto): Promise<Evaluation> {
    const evaluation = await this.evaluationRepository.findOneBy({ id })
    if (!evaluation) {
      throw new NotFoundException("evaluation not found")
    }
    const updatedEvaluation = await this.evaluationRepository.preload({ ...UpdateEvaluationDto as DeepPartial<Evaluation>, id })
    if (!updatedEvaluation) {
      throw new NotFoundException(`can not update a #${id} evaluation`)

    }
    return this.evaluationRepository.save(updatedEvaluation)
  }


  async remove(id: number) {
    const evaluation = await this.evaluationRepository.findOneBy({ id })
    if (!evaluation) {
      throw new NotFoundException("evaluation not found")

    }
    await this.evaluationRepository.delete(id)
    return id
  }
}

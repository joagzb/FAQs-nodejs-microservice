import {Request, Response} from 'express';
import {Question} from './question.repository';
import {IBasicController} from '../shared/controllers/IBasicController.interface';
import {QuestionService} from './question.service';

export class QuestionController implements IBasicController {
  // PROPERTIES
  private questionService: QuestionService;
  routeName = 'questions';

  // CTOR
  public constructor() {
    this.questionService = new QuestionService();
  }

  // METHODS
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const questions = await this.questionService.getAll();
      return res.status(200).json(questions);
    } catch (error) {
      return res.status(400).json(error instanceof Error ? error.message : '');
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const {questionId} = req.params;
    try {
      const question = await this.questionService.getById(questionId);
      return res.status(200).json(question);
    } catch (error) {
      return res.status(400).json(error instanceof Error ? error.message : '');
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const question = await this.questionService.addQuestion(req.body);
      return res.status(201).json(question);
    } catch (error) {
      return res.status(500).json(error instanceof Error ? error.message : 'question could not be created');
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {questionId} = req.params;
    try {
      const question = this.questionService.updateQuestion(questionId, req.body);
      return res.status(204).json(question);
    } catch (error) {
      return res.status(500).json(error instanceof Error ? error.message : '');
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const {questionId} = req.params;

    const result = await this.questionService.deleteQuestion(questionId);
    return res.status(204).json(result);
  }

  // OVERRIDE
  public name(): string {
    return QuestionController.name;
  }
}

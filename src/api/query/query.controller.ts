import {Request, Response} from 'express';
import {QuestionDTO} from '../question/questionDTO.model';
import {IBasicController} from '../shared/controllers/IBasicController.interface';
import {QueryService} from './query.service';

export class QueryController implements IBasicController {
  // PROPERTIES
  readonly routeName: string = 'query';
  private queryService: QueryService;

  // CTOR
  public constructor() {
    this.queryService = new QueryService();
  }

  // METHODS
  public async findAnswers(req: Request, res: Response): Promise<Response> {
    const {question} = req.body;

    try {
      const result: QuestionDTO[] = await this.queryService.matchQuestion(question);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error instanceof Error ? error.message : '');
    }
  }

  // OVERRIDE
  public name(): string {
    return QueryController.name;
  }
}

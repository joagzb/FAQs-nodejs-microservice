import {FactoryRouteController} from '../shared/controllers/FactoryRouteController.class';
import {QuestionController} from './question.controller';
import {createQuestionValidation, questionIdValidation, updateQuestionValidation} from './question.validation';

class QuestionRoutes extends FactoryRouteController<QuestionController> {
  // CTOR
  public constructor() {
    super(new QuestionController());
  }

  // OVERRIDE
  protected initRoutes(): void {
    this.router.get(``, (req, res) => this.controller.getAll(req, res));
    this.router.get(`/:questionId`, (req, res) => this.controller.getById(req, res));
    this.router.post(``, (req, res) => this.controller.create(req, res));
    this.router.patch(`/:questionId`, (req, res) => this.controller.update(req, res));
    this.router.delete(`/:questionId`, (req, res) => this.controller.delete(req, res));
  }

  protected initMiddlewares(): void {
    this.router.use('/:questionId', questionIdValidation);
    this.router.post('', createQuestionValidation);
    this.router.patch('/:questionId', updateQuestionValidation);
  }
}

export default new QuestionRoutes();

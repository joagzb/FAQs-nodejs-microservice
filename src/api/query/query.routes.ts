import {FactoryRouteController} from '../shared/controllers/FactoryRouteController.class';
import {QueryController} from './query.controller';
import {queryValidation} from './query.validation';

class QueryRoutes extends FactoryRouteController<QueryController> {
  // CTOR
  public constructor() {
    super(new QueryController());
  }

  // OVERRIDE
  protected initRoutes(): void {
    this.router.post(``, (req, res) => this.controller.findAnswers(req, res));
  }

  protected initMiddlewares(): void {
    this.router.post('', queryValidation);
  }
}

export default new QueryRoutes();

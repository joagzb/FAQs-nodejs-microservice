import {FactoryRouteController} from '../shared/controllers/FactoryRouteController.class';
import {HealthController} from './health.controller';

class HealthRoutes extends FactoryRouteController<HealthController> {
  // CTOR
  public constructor() {
    super(new HealthController());
  }

  // OVERRIDE
  protected initRoutes(): void {
    this.router.get('/ping', (req, res) => this.controller.ping(req, res));
  }

  protected initMiddlewares(): void {
    // no middleware for health check
  }
}

export default new HealthRoutes();

import {Request, Response} from 'express';
import {IBasicController} from '../shared/controllers/IBasicController.interface';

export class HealthController implements IBasicController {
  // PROPERTIES
  readonly routeName: string = 'health';

  // METHODS
  public ping(_req: Request, res: Response): Response {
    return res.status(200).json({status: 'ok'});
  }

  // OVERRIDE
  public name(): string {
    return HealthController.name;
  }
}

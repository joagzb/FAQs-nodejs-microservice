import express from 'express';
import cors from 'cors';
import * as expressWinston from 'express-winston';
import {Logger} from './services/Logger/Logger.service';
import {errorHandler} from './middlewares/ErrorHandler.middleware';
import ConfigService from './config/config';
import PostgresDatasource from './datasources/postgres';
import questionRoutes from './api/question/question.routes';
import queryRoutes from './api/query/query.routes';
import {getPackageInfo, getRunningHostAndPort, listObjectProperties} from './helpers/ServerMessages.util';

class App {
  // PROPERTIES
  private server: express.Application;
  private loggerInstance = Logger.getInstance();
  private configService: ConfigService;

  // CTOR
  constructor() {
    // Create a new express app
    this.server = express();

    // get global configuration
    this.configService = ConfigService.getInstance();

    // initializations
    this.initConfiguration();
    this.initMiddlewares();
    this.initRoutes();
    this.initDB();
  }

  // METHODS
  /**
   * configures and mount the routes for the express app
   */
  private initRoutes(): void {
    this.server.use(questionRoutes.routeName, questionRoutes.router);
    this.server.use(queryRoutes.routeName, queryRoutes.router);
  }

  /**
   * sets up the middlewares for the express app
   */
  private initMiddlewares() {
    this.server.use(express.urlencoded({extended: false}));
    this.server.use(cors());
    this.server.use(express.json());

    // create a middleware to log your HTTP requests using winston logger
    this.server.use(expressWinston.logger(this.loggerInstance.expressWinstonConfig));

    this.server.use(errorHandler);
  }

  /**
   * sets the express server configurations
   */
  private initConfiguration() {
    this.server.set('host', this.configService.getConfig().server.HOST);
    this.server.set('port', this.configService.getConfig().server.PORT);
    this.server.disable('x-powered-by');
  }

  private showServerUpMessages() {
    this.loggerInstance.logger.debug(`Server .env variables: \n${listObjectProperties(this.configService.getConfig())}`);
    this.loggerInstance.logger.info(`${getPackageInfo()} ${getRunningHostAndPort(this.server.get('host'), this.server.get('port'))}`);
  }

  private initDB() {
    PostgresDatasource.initialize();
  }

  /**
   * starts the express server
   */
  public startServer() {
    const port = this.server.get('port');
    this.server.listen(port, () => {
      this.showServerUpMessages();
    });
  }
}

export default new App();

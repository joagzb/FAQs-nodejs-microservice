import {DataSource} from 'typeorm';
import {Question} from '../api/question/question.repository';
import ConfigService from '../config/config';
import {PostgresConnectionProperties} from 'config/config.types';
import {generateSearchIndex, installExtensions} from './postgresHelpers';
import QuestionSeeder from './seeders/QuestionSeeder';

/** ========================================================
 *
 * setup and handles postgres DB connections
 *
 ======================================================== */
class PostgresDatasource {
  // PROPERTIES
  private AppDataSource: DataSource;

  // CTOR
  public constructor() {
    this.AppDataSource = this.initConfig();
  }

  // METHODS
  public async initialize() {
    try {
      const ds = await this.AppDataSource.initialize();

      await installExtensions(ds);
      await generateSearchIndex(ds, 'questions');

      if (ConfigService.getInstance().getConfig().server.SEED) {
        QuestionSeeder.seedData();
      }
    } catch (error) {
      console.error('Error during database initialization:', error);
      throw error;
    }
  }

  private initConfig(): DataSource {
    const databaseConfig = ConfigService.getInstance().getConfig().database.postgres as PostgresConnectionProperties;

    return new DataSource({
      type: 'postgres',
      host: databaseConfig.HOST,
      port: databaseConfig.PORT,
      database: databaseConfig.DATABASE,
      username: databaseConfig.USERNAME,
      password: databaseConfig.PASSWORD && databaseConfig.PASSWORD.length > 0 ? databaseConfig.PASSWORD : ' ',
      synchronize: true,
      migrationsRun: true,
      dropSchema: true,
      logging: false,
      entities: [Question],
    });
  }
}

export default new PostgresDatasource();

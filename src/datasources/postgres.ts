import {DataSource} from 'typeorm';
import {Question} from '../api/question/question.repository';
import {generateSearchIndex, installExtensions, preloadDB} from './seeder';
import Configuration from '../config/config';

/** ========================================================
 *
 * setup and handles postgres DB connections
 *
 ======================================================== */
class PostgresDatasource {
  // PROPERTIES
  private DatabaseConfig = Configuration.getConfig().database.postgres;
  private AppDataSource: DataSource;

  // CTOR
  public constructor() {
    this.AppDataSource = this.initConfig();
  }

  // METHODS
  public async initialize(mustPreload?: boolean) {
    const ds = await this.AppDataSource.initialize();
    await installExtensions(ds);
    await generateSearchIndex(ds, 'questions');
    if (mustPreload) {
      await preloadDB();
    }
  }

  private initConfig(): DataSource {
    return new DataSource({
      type: 'postgres',
      host: this.DatabaseConfig?.HOST,
      port: this.DatabaseConfig?.PORT,
      database: this.DatabaseConfig?.DATABASE,
      username: this.DatabaseConfig?.USERNAME,
      password: this.DatabaseConfig?.PASSWORD,
      synchronize: true,
      migrationsRun: true,
      dropSchema: true,
      logging: false,
      entities: [Question],
    });
  }
}

export default new PostgresDatasource();

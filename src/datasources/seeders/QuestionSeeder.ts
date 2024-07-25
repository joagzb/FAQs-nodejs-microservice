import axios from 'axios';
import fs from 'fs';
import path from 'path';
import {QuestionDTO} from '../../api/question/questionDTO.model';
import ConfigService from '../../config/config';
import {IDataSeeder} from './IDataSeeder';

/** ========================================================
 *
 * Question and aswers Seeder
 *
 ======================================================== */
class QuestionSeeder implements IDataSeeder {
  private endpoint: string;

  // CTOR
  constructor () {
    const serverConfig = ConfigService.getInstance().getConfig().server;
    this.endpoint = `http://${serverConfig.HOST}:${serverConfig.PORT}${serverConfig.GLOBAL_URL_PREFIX}/questions`;
  }

  // METHODS
  public async seedData(): Promise<void> {
    // Read and parse the JSON file
    const questions: QuestionDTO[] = this.readQuestionsFromFile();
    if (questions.length === 0) {
      console.log('No questions found to seed.');
      return;
    }

    try {
      const requests = questions.map(question => axios.post(this.endpoint, question));
      await Promise.all(requests);
      console.log('Database seeded with questions about cars');
    } catch (error) {
      console.error('Error inserting data into the database:', error);
      throw new Error(`Error inserting fake data. ${error instanceof Error ? error.message : ''}`);
    }
  }

  /**
 * Reads questions from a JSON file.
 * @returns An array of QuestionDTO objects, or an empty array if the file does not exist.
 */
  private readQuestionsFromFile(): QuestionDTO[] {
    const filePath = path.resolve(__dirname, '../../../src/datasources/seeders/questions.json');

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return [];
    }

    try {
      // Read and parse the JSON file
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContent) as QuestionDTO[];
    } catch (error) {
      console.error('Error reading or parsing the questions file:', error);
      return [];
    }
  }
}

export default new QuestionSeeder();

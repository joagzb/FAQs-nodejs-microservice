import {BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn} from 'typeorm';
import {cleanUpQuestion} from './question.util';

@Entity('questions')
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'question', length: 100})
  text: string;

  @Column({name: 'question_without_symbols', length: 100})
  textWithoutSymbols: string;

  @Column({length: 200})
  answer: string;

  @Column({nullable: true})
  tags?: string;

  @Column({
    default: true,
  })
  active: boolean;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  // METHODS
  /**
   @description compares an input question to those stored on DB using full-text search strategies to find coincidences.
   @param input question string.
   @param schema DB schema if used.
   @return a list of questions that best matches input question.
   */
  static async fuzzySearch(input: string, schema?: string): Promise<any> {
    // bring input string to a searchable format
    let cleanInputQuestion: string = cleanUpQuestion(input);
    cleanInputQuestion = cleanInputQuestion
      .trim()
      .split(' ')
      .reduce((result, current) => `${result} | ${current}`);

    // build query
    const query = `
    SELECT question, answer
    FROM
      ${schema ? `${schema}.` : ''}"questions",
      to_tsquery('${cleanInputQuestion}') fuzzy_query,
      ts_rank_cd(to_tsvector(question_without_symbols),fuzzy_query) AS match_rank,
      ${schema ? `${schema}.` : ''}similarity('${cleanInputQuestion}'::text, question_without_symbols) similarity
    WHERE tags @@ fuzzy_query OR similarity > 0
    ORDER BY match_rank, similarity DESC NULLS LAST
    LIMIT 4
    `;

    // run query
    const queryResult = await Question.query(query);

    // post-process query result
    return queryResult;
  }

  /**
   @description generate several special tags using a given question description to be used for fuzzy searching further.
   @param question the question text.
   @returns string tags.
   */
  static async generateTags(question: string): Promise<any> {
    const query = `
    SELECT tags
    FROM to_tsvector('spanish','${question}') AS tags
    LIMIT 1;
    `;

    // run query and validate
    const queryResult = await Question.query(query);
    if (!queryResult) {
      throw new Error('query result is empty');
    }

    // post-process query result
    return queryResult[0].tags;
  }
}

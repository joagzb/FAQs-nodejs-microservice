import {Question} from './question.repository';
import {IBasicService} from '../shared/services/IBasicService.interface';
import {QuestionDTO} from './questionDTO.model';
import {cleanUpQuestion, replaceHTMLTags} from './question.util';

export class QuestionService implements IBasicService {
  // CTOR
  public constructor() {}

  // METHODS
  /**
   @description get all Questions.
   @returns A list of Questions stored into DB.
   */
  public async getAll(): Promise<Question[]> {
    return await Question.find();
  }

  /**
   @description search a Question object by its ID.
   @param questionId entity ID.
   @returns found Question by its ID or a error msg.
   */
  public async getById(questionId: string) {
    return await Question.findOneOrFail({
      where: {id: Number.parseInt(questionId)},
    });
  }

  /**
   @description stores a new Question into DB.
   @param body QuestionDTO object.
   @returns Question just created.
   */
  public async addQuestion(body: QuestionDTO): Promise<Question> {
    // clean question
    body.text = replaceHTMLTags(body.text);

    // create question
    const question = new Question();
    question.text = body.text;
    question.answer = body.answer;
    question.textWithoutSymbols = cleanUpQuestion(body.text);
    question.tags = await Question.generateTags(question.textWithoutSymbols);
    await question.save();

    return question;
  }

  /**
   @description updates an existing Question entity.
   @param questionId entity ID.
   @param body QuestionDTO object which can contain all or some properties.
   */
  public async updateQuestion(questionId: string, body: Partial<Omit<Question, 'id'>>): Promise<Question> {
    // find question by id
    const question = await Question.findOneByOrFail({
      id: Number.parseInt(questionId),
    });

    // update question
    question.active = body.active || question.active;
    question.text = body.text || question.text;
    question.answer = body.answer || question.answer;
    question.textWithoutSymbols = body.text ? cleanUpQuestion(body.text) : question.textWithoutSymbols;
    question.tags = body.text ? await Question.generateTags(question.textWithoutSymbols) : question.tags;
    question.updatedAt = new Date();
    await question.save();

    return question;
  }

  /**
   @description deletes an existing Question entity.
  @param questionId entity ID.
   */
  public async deleteQuestion(questionId: string) {
    return await Question.delete({id: parseInt(questionId)});
  }

  // OVERRIDE
  public name(): string {
    return QuestionService.name;
  }
}

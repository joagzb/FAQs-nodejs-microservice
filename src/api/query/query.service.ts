import {Question} from '../question/question.repository';
import {QuestionDTO} from '../question/questionDTO.model';
import {IBasicService} from '../shared/services/IBasicService.interface';

export class QueryService implements IBasicService {
  // CTOR
  public constructor() {}

  /**
   @description takes any question as input and look for best answers.
   @param inputQuestion questions asked.
   @returns A list of top 4 best QuestionsDTO that might answer an inputQuestion.
   */
  public async matchQuestion(inputQuestion: string): Promise<QuestionDTO[]> {
    // search
    const result = await Question.fuzzySearch(inputQuestion);

    // build response
    return result.map(q => {
      return {
        text: q.question,
        answer: q.answer,
      };
    });
  }

  // OVERRIDE
  public name(): string {
    return QueryService.name;
  }
}

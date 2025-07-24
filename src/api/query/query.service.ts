import {Question} from '../question/question.repository';
import {QuestionDTO} from '../question/questionDTO.model';
import {IBasicService} from '../shared/services/IBasicService.interface';

export class QueryService implements IBasicService {
  // PROPERTIES
  private cache = new Map<string, QuestionDTO[]>();
  private readonly maxCacheSize = 50;

  // CTOR
  public constructor() {}

  /**
   @description takes any question as input and look for best answers.
   @param inputQuestion questions asked.
   @returns A list of top 4 best QuestionsDTO that might answer an inputQuestion.
   */
  public async matchQuestion(inputQuestion: string): Promise<QuestionDTO[]> {
    const key = inputQuestion.toLowerCase().trim();
    const cached = this.cache.get(key);
    if (cached) {
      return cached;
    }

    // search
    const result = await Question.fuzzySearch(inputQuestion);
    const response = result.map(q => ({text: q.question, answer: q.answer}));

    this.cache.set(key, response);
    if (this.cache.size > this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    return response;
  }

  // OVERRIDE
  public name(): string {
    return QueryService.name;
  }
}

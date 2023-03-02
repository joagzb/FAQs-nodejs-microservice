import {Request, Response} from 'express';
import {QuestionDTO} from './questionDTO.model';

/**
  @description extracts the questionId parameter from the request parameters within URL and checks that it exists and is a string.
  @param req Express request object.
  @param res Express response object.
  @param next callback function. it is the next function to execute after middleware has correcly finished.
 */
export const questionIdValidation = function (req: Request, res: Response, next) {
  const {questionId} = req.params;

  if (questionId && typeof questionId === 'string') {
    next();
  } else {
    res.status(406).json('URL must contain question ID.');
  }
};

/**
  @description extracts the QuestionDTO object properties from the request body, and checks that both the text and answer meet some criteria
  @param req Express request object.
  @param res Express response object.
  @param next callback function. it is the next function to execute after middleware has correcly finished.
 */
export const createQuestionValidation = function (req: Request, res: Response, next) {
  const questionDTO: QuestionDTO = {...req.body};

  const isQuestionValid: boolean = questionDTO.text.length > 4 && questionDTO.text.length <= 100;
  const isAnswerValid: boolean = questionDTO.answer.length > 4 && questionDTO.answer.length <= 200;

  if (isQuestionValid && isAnswerValid) {
    next();
  } else {
    res.status(400).json('Incorrect request body.');
  }
};

/**
  @description extracts the QuestionDTO object properties from the request body, and checks that both the text and answer meet some criteria.
  @param req Express request object.
  @param res Express response object.
  @param next callback function. it is the next function to execute after middleware has correcly finished.
 */
export const updateQuestionValidation = function (req: Request, res: Response, next) {
  const questionDTO: Partial<QuestionDTO> = {...req.body};

  const isQuestionValid = questionDTO.text !== undefined ? questionDTO.text.length > 6 && questionDTO.text.length <= 100 : true;
  const isAnswerValid = questionDTO.answer !== undefined ? questionDTO.answer.length > 6 && questionDTO.answer.length <= 200 : true;

  if (isQuestionValid && isAnswerValid) {
    next();
  } else {
    res.status(400).json('Incorrect request body.');
  }
};

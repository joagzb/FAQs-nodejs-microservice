/**
 @description extracts the question text from the request body and check if it meet some criteria.
 @param req Express request object.
 @param res Express response object.
 @param next callback function. it is the next function to execute after middleware has correcly finished.
 */
export const queryValidation = function (req, res, next) {
  const {question} = req.body;

  if (question && typeof question === 'string' && question.length >= 4) {
    next();
  } else {
    res.status(400).json('Incorrect request body.');
  }
};

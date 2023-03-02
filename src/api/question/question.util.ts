/**
 @description any input string that contains characters with diacritics like 'señuelo' or 'índice' is changed in order to have only plain characters -> 'senuelo', 'indice'
 @param text sentence with diacritics.
 @return same input string without diacritics.
 */
export const supressSpecialCharSymbols = (text: string): string => {
  const from = 'áàäéèëíìïóòöúùuñÑÁÀÄÉÈËÍÌÏÓÒÖÚÙÜÑçÇ';
  const to = 'aaaeeeiiiooouuunNAAAEEEIIIOOOUUUNcC';

  if (from.length !== to.length) throw new Error('comparative strings set have different lenght');

  let replacedText: string = text.toLowerCase();

  for (let i = 0; i < from.length; i++) {
    replacedText = replacedText.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  return replacedText;
};

/**
 @description removes any HTML tag included on a string
 @param text input string which might contain HTML tags.
 @return same input text string without HTML tags.
 */
export const replaceHTMLTags = (text: string): string => {
  // load equivalences for replacing
  const equivalences = [{
      custom: '<NEG>',
      codeRegex: /#1#/g,
      code: '#1#',
      html: /<(\/?)strong\b((?:[^>"']|"[^"]*"|'[^']*')*)>/gm,
    }, {
      custom: '<NEG>',
      codeRegex: /#2#/g,
      code: '#2#',
      html: /<(\/?)b\b((?:[^>"']|"[^"]*"|'[^']*')*)>/gm,
    }, {
      custom: '<CUR>',
      codeRegex: /#3#/g,
      code: '#3#',
      html: /<(\/?)em\b((?:[^>"']|"[^"]*"|'[^']*')*)>/gm,
    },];

  // 1. replace several html tags to a code
  let result = text;
  equivalences.forEach(regex => (result = result.replace(regex.html, regex.code)));

  // 2. take off the rest of html tags
  result = takeOffHTMLTags(result);

  // 3. insert custom tags
  equivalences.forEach(regex => (result = result.replace(regex.codeRegex, regex.custom)));
  return result;
};

/**
  @description removes any Special characters and HTML tags from question
  @param question string.
  @return a question string which has symbols and tags taken off
 */
export const cleanUpQuestion = (question: string): string => {
  let cleanQuestion = takeOffHTMLTags(question);
  cleanQuestion = supressSpecialCharSymbols(cleanQuestion);
  cleanQuestion = takeOffSpecialCharacters(cleanQuestion);
  return cleanQuestion;
};

/**
 * @description Remove any HTML tag included on input string
 * @param text string input.
 * @return a string without HTML tags
 */
export const takeOffHTMLTags = (text: string): string => {
  const htmlRegexp = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
  return text.replace(htmlRegexp, '');
};

/**
  @description Remove any Special character included on input string
  @param text string input.
  @return a string without ASCII symbols
 */
export const takeOffSpecialCharacters = (text: string): string => {
  const lettersOnlyRegexp = /[`~!@#$%^&*()_|+\-=?¿;:'"<>\{\}\[\]\\\/]/gi;
  return text.replace(lettersOnlyRegexp, '');
};

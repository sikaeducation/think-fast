import { context } from './contexts';

const fileRegex = /.+(?=\.vue$)/;
const variableRegex = /(?<=import\s).+(?=\sfrom)/;
const componentRegex = /(?<=^<).+(?=\s\/>$)/;

function getWordFromStem(stem: string): string {
  let word = '';
  [componentRegex, variableRegex, fileRegex].forEach((regex) => {
    word = regex.exec(stem)?.[0] ?? word;
  });

  return word;
}

function getContextFromStem(stem: string): context {
  if (fileRegex.test(stem)) return 'file';
  if (variableRegex.test(stem)) return 'variable';
  if (componentRegex.test(stem)) return 'component';
  return 'component'; // default
}

export {
  getWordFromStem,
  getContextFromStem,
};

import {
  kebabCase, flow, split, last, lowerCase, map, includes, any,
} from 'lodash/fp';

const reasonMessages: Record<string, string> = {
  dashes: 'it uses dashes',
  thePrefix: "it uses the 'the' prefix",
  kebabCase: 'it uses kebab-case',
};

function splitStem(stem: string) {
  return flow([
    kebabCase,
    split('-'),
    map(lowerCase),
  ])(stem);
}

const modifiers = [
  'active',
];

const abbreviations = [
  'msg',
  'btn',
  'ctrl',
  'bg',
  'addr',
  'dec',
  'inc',
  'fmt',
];

const reasons = [{
  multipleWords: {
    always: true,
    check: (stem: string) => splitStem(stem).length > 1,
  },
  prefixBase: {
    rightIfPresent: true,
    check: (stem: string) => splitStem(stem)[0] === 'base',
  },
  prefixThe: {
    rightIfPresent: true,
    check: (stem: string) => splitStem(stem)[0] === 'the',
  },
  prefixApp: {
    rightIfPresent: true,
    check: (stem: string) => splitStem(stem)[0] === 'app',
  },
  endsWithModifer: {
    rightIfPresent: true,
    check: (stem: string) => {
      const lastWord = flow([
        splitStem,
        last,
      ])(stem);

      return includes(lastWord)(modifiers);
    },
  },
  abbreviations: {
    never: true,
    check: (stem: string) => flow([
      splitStem,
      any(includes(abbreviations)),
    ])(stem),
  },
  snakeCase: {
    never: true,
    check: (stem: string) => {

    },
  },
}];

const never = [
  'abbreviations',
  'snakeCase',
  'startsWithModifier',
  'singleWord',
];

const contextCorrectness = {
  file: ['fileKebabCase', 'filePascalCase'],
  component: ['componentNamePascal', 'componentNameKebab'],
  variable: ['variableNamePascal'],
};

export {
  reasonMessages,
};

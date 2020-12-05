import {
  kebabCase, flow, split, last, lowerCase, map, includes, first,
} from 'lodash/fp';
import { context } from './contexts';

function splitStem(stem: string) {
  return flow([
    kebabCase,
    split('-'),
    map(lowerCase),
  ])(stem);
}

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

const modifiers = [
  'active',
];

type reason = {
  always?: boolean,
  rightIfPresent?: boolean,
  rejectIfPresent?: boolean,
  never?: boolean,
  requiresContext?: context,
  check: (stem: string) => boolean,
  message: string,
}

const reasons: { [key: string]: reason } = {
  multipleWords: {
    always: true,
    check: (stem: string) => splitStem(stem).length > 1,
    message: 'it uses multiple words',
  },
  prefixBase: {
    rightIfPresent: true,
    check: (stem: string) => splitStem(stem)[0] === 'base',
    message: 'it uses the "base" prefix',
  },
  prefixThe: {
    rightIfPresent: true,
    check: (stem: string) => splitStem(stem)[0] === 'the',
    message: 'it uses the "the" prefix',
  },
  prefixApp: {
    rightIfPresent: true,
    check: (stem: string) => splitStem(stem)[0] === 'app',
    message: 'it uses the "app" prefix',
  },
  endsWithModifer: {
    rightIfPresent: true,
    check: (stem: string): boolean => {
      const lastWord = flow([
        splitStem,
        last,
      ])(stem);

      return includes(lastWord)(modifiers);
    },
    message: 'it ends with a modifier',
  },
  abbreviations: {
    never: true,
    check: (stem: string): boolean => {
      const normalizedStem = splitStem(stem);
      return normalizedStem.some((word: string) => abbreviations.includes(word));
    },
    message: 'it uses an abbreviation',
  },
  camelCase: {
    never: true,
    message: 'it uses camelCase',
    check: (stem: string) => /^[a-z]+[A-Z]+\w+$/.test(stem),
  },
  snakeCase: {
    never: true,
    check: (stem: string) => /\w+_\w[\w_]*/.test(stem),
    message: 'it uses snake_case',
  },
  startsWithModifer: {
    never: true,
    check: (stem: string): boolean => {
      const firstWord = flow([
        splitStem,
        first,
      ])(stem);

      return includes(firstWord)(modifiers);
    },
    message: 'it starts with a modifier',
  },
  singleWord: {
    never: true,
    check: (stem: string) => splitStem(stem).length === 1,
    message: 'it uses a single word',
  },
  fileKebabCase: {
    requiresContext: 'file',
    check: (stem: string) => /\w+-\w[\w-]*/.test(stem),
    message: 'it\'s a file name that uses kebab-case',
  },
  filePascalCase: {
    requiresContext: 'file',
    check: (stem: string) => /^([A-Z][a-z]+)+$/.test(stem),
    message: 'it\'s a file name that uses PascalCase',
  },
  componentPascalCase: {
    requiresContext: 'component',
    check: (stem: string) => /^([A-Z][a-z]+)+$/.test(stem),
    message: 'it\'s a component that uses PascalCase',
  },
  componentKebabCase: {
    requiresContext: 'component',
    check: (stem: string) => /\w+-\w[\w-]*/.test(stem),
    message: 'it\'s a component that uses kebab-case',
  },
  variablePascalCase: {
    requiresContext: 'variable',
    check: (stem: string) => /^([A-Z][a-z]+)+$/.test(stem),
    message: 'it\'s a variable that uses PascalCase',
  },
  variableNoKebabCase: {
    rejectIfPresent: true,
    requiresContext: 'variable',
    check: (stem: string) => /\w+-\w[\w-]*/.test(stem),
    message: 'it\'s a variable that uses kebab-case',
  },
};

export {
  reasons,
  reason,
};

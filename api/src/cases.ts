import {
  flow, camelCase, upperFirst, snakeCase, kebabCase
} from 'lodash/fp';

const pascalCase = flow(camelCase, upperFirst);
type stringCase = "kebab" | "pascal" | "camel" | "snake";
const stringCases: stringCase[] = ["kebab", "pascal", "camel", "snake"];

type stringTransform = (string: string) => string
const caseTransforms: Record<string, stringTransform> = {
  kebab: kebabCase,
  pascal: pascalCase,
  camel: camelCase,
  snake: snakeCase,
};

export {
  stringCases,
  caseTransforms,
  stringCase,
}

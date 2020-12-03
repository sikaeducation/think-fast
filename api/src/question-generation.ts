import {
  flow, camelCase, upperFirst, snakeCase, kebabCase, join, map,
} from 'lodash/fp';

const pascalCase = flow(camelCase, upperFirst);

const messageContexts: Record<string, string> = {
  file: 'file name',
  component: 'component name',
  variable: 'variable name',
};

function generateFeedback(context: string) {
  const reasonMessages: Record<string, string> = {
    dashes: 'it uses dashes',
    thePrefix: "it uses the 'the' prefix",
    kebabCase: 'it uses kebab-case',
  };
  const contextMessage = messageContexts[context];
  const reasons = ['dashes', 'thePrefix', 'kebabCase'];
  const feedback = reasons.reduce((message, reason, index) => (index !== reasons.length - 1
    ? `${message} ${reasonMessages[reason]},`
    : `${message} and ${reasonMessages[reason]}.`), `That's a valid ${contextMessage} because`);

  return {
    isCorrect: true,
    feedback,
  };
}

type questionElements = {
  words: string[]
  context: string
  stringCase: string
}

function getStemText({ words, context, stringCase }: questionElements) {
  type stringTransform = (string: string) => string
  const cases: Record<string, stringTransform> = {
    kebab: kebabCase,
    pascal: pascalCase,
    camel: camelCase,
    snake: snakeCase,
  };
  const stemContexts: Record<string, stringTransform> = {
    file: (string) => `${string}.vue`,
    component: (string) => `<${string} />`,
    variable: (string) => `import ${string} from './${string}.vue';`,
  };

  return flow([
    map(upperFirst),
    join(''),
    cases[stringCase],
    stemContexts[context],
  ])(words);
}

function getPromptText(contextMessage: string) {
  return `<p>According to the official <a href='https://v3.vuejs.org/style-guide'>Vue style guide</a>, is this a good <strong>${contextMessage}</strong> for Vue component?</p>`;
}

function generateQuestion({ words, context, stringCase }: questionElements) {
  const stemText = getStemText({ words, context, stringCase });
  const promptText = getPromptText(messageContexts[context]);

  return {
    promptText,
    stemText,
  };
}

module.exports = {
  generateQuestion,
  generateFeedback,
};

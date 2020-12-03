import { flow, sample } from 'lodash/fp';
import { messageContexts, stemContexts, contexts, context } from "./contexts"
import { words } from "./words"
import { stringCases, caseTransforms, stringCase } from "./cases"

type questionElements = {
  words: string
  context: context
  stringCase: stringCase
}

function getStemText({ words, context, stringCase }: questionElements) {
  return flow([
    caseTransforms[stringCase],
    stemContexts[context],
  ])(words);
}

function getPromptText(contextMessage: string) {
  return `<p>According to the official <a href='https://v3.vuejs.org/style-guide'>Vue style guide</a>, is this a good <strong>${contextMessage}</strong> for Vue component?</p>`;
}

function _generateQuestion({ words, context, stringCase }: questionElements) {
  const stemText = getStemText({ words, context, stringCase });
  const promptText = getPromptText(messageContexts[context]);

  return {
    promptText,
    stemText,
  };
}

function safeSample<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateQuestion() {
  return _generateQuestion({
    words: safeSample(words),
    context: safeSample(contexts),
    stringCase: safeSample(stringCases),
  })
}

export {
  generateQuestion,
  _generateQuestion,
}

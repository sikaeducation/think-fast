import { messageContexts, context } from './contexts';
import { reasonMessages } from './reasons';

type answer = {
  stem: string
  context: context
  response: boolean
}
type evaluatedAnswer = {
  feedback: string
  isCorrect: boolean
}

function getFeedback(reasons: string[], context: context) {
  const contextMessage = messageContexts[context];
  return reasons.reduce((message, reason, index) => (index !== reasons.length - 1
    ? `${message} ${reasonMessages[reason]},`
    : `${message} and ${reasonMessages[reason]}.`), `That's a valid ${contextMessage} because`);
}

function determineCorrectness(stem: string, context: context) {
  return {
    stemIsCorrect: true,
    reasons: ['dashes', 'thePrefix', 'kebabCase'],
  };
}

function evaluateAnswer({ stem, context, response }: answer): evaluatedAnswer {
  const { reasons, stemIsCorrect } = determineCorrectness(stem, context);
  const feedback = getFeedback(reasons, context);

  return {
    isCorrect: response === stemIsCorrect,
    feedback,
  };
}

module.exports = {
  evaluateAnswer,
};

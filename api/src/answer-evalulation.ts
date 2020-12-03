import { messageContexts, context } from './contexts';

function generateFeedback(context: context) {
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

module.exports = {
  generateFeedback,
};

import { reduce } from 'lodash';
import { map, filter } from 'lodash/fp';
import { messageContexts, context } from './contexts';
import { reason, reasons } from './reasons';
import { getWordFromStem, getContextFromStem } from './stem-transform';

type answer = {
  stem: string
  response: boolean
}
type evaluatedAnswer = {
  feedback: string
  isCorrect: boolean
}

const getMessages: (reasons: reason[]) => string[] = map('message');

function getReasonMessages(isCorrect: boolean, word: string, context: context) {
  const onlyPassingReasons = filter((reason) => reason.check(word), reasons);

  const neverReasons = filter('never', onlyPassingReasons);
  const alwaysReasons = filter('always', onlyPassingReasons);

  const theseContextualReasons = filter((reason) => reason.requiresContext === context
      && !reason.rejectIfPresent, onlyPassingReasons);

  const rightIfPresentReasons = filter('rightIfPresent', onlyPassingReasons);

  const wrongIfPresentReasons = filter((reason) => (reason.requiresContext === context
      && !!reason.rejectIfPresent), onlyPassingReasons);

  const messages = [
    ...getMessages(theseContextualReasons),
  ];

  return isCorrect
    ? [
      ...messages,
      ...getMessages(alwaysReasons),
      ...getMessages(rightIfPresentReasons),
    ]
    : [
      ...messages,
      ...getMessages(wrongIfPresentReasons),
      ...getMessages(neverReasons),
    ];
}

function getFeedback(isCorrect: boolean, word: string, context: context) {
  const contextMessage = messageContexts[context];
  const reasons = getReasonMessages(isCorrect, word, context);
  return reasons.reduce((message, reason, index) => (index !== reasons.length - 1
    ? `${message} ${reason},`
    : `${message} and ${reason}.`), `That's a valid ${contextMessage} because`);
}

function passesAlwaysCheck(reason: reason, word: string) {
  return !(reason.always && !reason.check(word));
}
function passesNeverCheck(reason: reason, word: string) {
  return !(reason.never && reason.check(word));
}
function passesContextChecks(reasons: reason[]) {
  return (reason: reason, word: string) => reasons
    .some((reason) => !reason.rejectIfPresent && reason.check(word));
}

function determineCorrectness(stem: string) {
  const word = getWordFromStem(stem);
  const context = getContextFromStem(stem);

  const reasonsForThisContext = filter((reason) => reason.requiresContext === context, reasons);
  const passesTheseContextChecks = passesContextChecks(reasonsForThisContext);

  // const passesTheseContextChecks = flow([
  //   filter()
  // ])(reasonsForThisContext)

  return reduce(reasons, (isPassing, reason) => isPassing
      && passesTheseContextChecks(reason, word)
      && passesNeverCheck(reason, word)
      && passesAlwaysCheck(reason, word), true);
}

function evaluateAnswer({ stem, response }: answer): evaluatedAnswer {
  const word = getWordFromStem(stem);
  const context = getContextFromStem(stem);
  const stemIsCorrect = determineCorrectness(stem);
  const feedback = getFeedback(stemIsCorrect, word, context);

  return {
    isCorrect: response === stemIsCorrect,
    feedback,
  };
}

module.exports = {
  evaluateAnswer,
  determineCorrectness,
  getReasonMessages,
};

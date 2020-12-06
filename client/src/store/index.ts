import { createStore } from 'vuex';
import axios from 'axios';

type questionResponse = {
  data: {
    question: {
      promptText: string,
      stemText: string,
    }
  }
}
type answerResponse = {
  data: {
    answer: {
      isCorrect: boolean,
      feedback: string,
    }
  }
}

const emptyQuestion = {
  feedback: '',
  promptText: '',
  stemText: '',
  isCorrect: false,
  responseSubmitted: false,
};

export default createStore({
  state: {
    currentQuestion: emptyQuestion,
    feedback: '',
    streak: 0,
  },
  mutations: {
    setFeedback(state, feedback) {
      state.currentQuestion.feedback = feedback;
    },
    setCurrentQuestion(state, question) {
      state.currentQuestion = question;
    },
    updateStreak(state, wasCorrect) {
      state.streak = wasCorrect
        ? state.streak + 1
        : 0;
    },
    markCurrentQuestionAsSubmitted(state) {
      state.currentQuestion.responseSubmitted = true;
    },
    markCurrentQuestionAsCorrect(state, isCorrect) {
      state.currentQuestion.isCorrect = isCorrect;
    },
  },
  actions: {
    getNextQuestion({ commit }) {
      axios.post(`${process.env.VUE_APP_API_BASE_URL}/get-question`)
        .then((response: questionResponse) => {
          commit('setCurrentQuestion', { ...emptyQuestion, ...response.data.question });
        }).catch((error) => {
          console.error(error.message);
        });
    },
    evaluateResponse({ commit, state }, userResponse) {
      const stem = state.currentQuestion.stemText;
      axios.post(`${process.env.VUE_APP_API_BASE_URL}/evaluate-answer`, {
        stem, userResponse,
      }).then((response: answerResponse) => {
        const { isCorrect, feedback } = response.data.answer;
        commit('markCurrentQuestionAsSubmitted');
        commit('markCurrentQuestionAsCorrect', isCorrect);
        commit('updateStreak', isCorrect);
        commit('setFeedback', feedback);
      }).catch((error) => {
        console.error(error.message);
      });
    },
  },
  modules: {
  },
});

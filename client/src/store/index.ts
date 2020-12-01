import { createStore } from 'vuex';
import axios from 'axios';

type questionResponse = {
  data: {
    question: {
      correctFeedback: string,
      incorrectFeedback: string,
      promptText: string,
      stemText: string,
      isCorrect: boolean,
    }
  }
}

export default createStore({
  state: {
    currentQuestion: {
      correctFeedback: '',
      incorrectFeedback: '',
      promptText: '',
      stemText: '',
      isCorrect: false,
      responseSubmitted: false,
    },
    streak: 0,
  },
  mutations: {
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
      axios.get(`${process.env.VUE_APP_API_BASE_URL}/questions`)
        .then((response: questionResponse) => {
          commit('setCurrentQuestion', response.data.question);
        }).catch((error) => {
          console.error(error.message);
        });
    },
    updateStreak({ commit }, wasCorrect) {
      commit('updateStreak', wasCorrect);
    },
    evaluateResponse({ commit, dispatch }, response) {
      commit('markCurrentQuestionAsSubmitted');
      commit('markCurrentQuestionAsCorrect', response);
      dispatch('updateStreak', response);
    },
  },
  modules: {
  },
});

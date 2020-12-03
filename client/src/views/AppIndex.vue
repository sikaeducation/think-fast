<template>
  <div id="app-index">
    <QuizQuestion
      v-if="currentQuestion.promptText"
      :question="currentQuestion"
      @response="handleResponse"

    />
    <LoadingSpinner
      v-else
      data-test-loading-indicator
    />
  </div>
</template>

<script>
import QuizQuestion from '@/components/QuizQuestion.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AppIndex',
  components: {
    QuizQuestion,
    LoadingSpinner,
  },
  created() {
    this.getNextQuestion();
  },
  computed: {
    ...mapState(['currentQuestion']),
  },
  methods: {
    ...mapActions(['getNextQuestion', 'updateStreak', 'evaluateResponse']),
    handleResponse(response) {
      const responses = {
        yes: () => this.evaluateResponse(true),
        no: () => this.evaluateResponse(false),
        next: () => this.getNextQuestion(),
      };
      responses[response]();
    },
  },
};
</script>

<style lang="scss">
#app-index {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

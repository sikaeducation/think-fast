<template>
  <div id="app-index">
    <QuizQuestion
      :question="currentQuestion"
      @response="handleResponse"
    />
  </div>
</template>

<script>
import QuizQuestion from '@/components/QuizQuestion.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AppIndex',
  components: {
    QuizQuestion,
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
}
</style>

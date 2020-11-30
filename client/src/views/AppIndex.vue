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

export default {
  name: 'AppIndex',
  components: {
    QuizQuestion,
  },
  data() {
    return {
      currentQuestion: {},
    };
  },
  created() {
    this.currentQuestion = this.getNewQuestion();
  },
  methods: {
    getNewQuestion() {
      return {
        correctFeedback: "That's PascalCase, two words, and uses the App prefix.",
        incorrectFeedback: "That's PascalCase, two words, and uses the App prefix.",
        promptText: '<p>According to the official <a href="https://v3.vuejs.org/style-guide">Vue style guide</a>, is this a good name for Vue component?</p>',
        stemText: 'AppIndex.vue',
        isCorrect: false,
      };
    },
    evaluateResponse(response) {
      this.currentQuestion.isCorrect = response;
      this.currentQuestion.responseSubmitted = true;
      this.$emit('update-streak', this.currentQuestion.isCorrect);
    },
    next() {
      this.currentQuestion = this.getNewQuestion();
    },
    handleResponse(response) {
      const responses = {
        yes: () => this.evaluateResponse(true),
        no: () => this.evaluateResponse(false),
        next: () => this.next(),
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

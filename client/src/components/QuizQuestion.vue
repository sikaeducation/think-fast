<template>
  <div class="quiz-question">
    <QuestionContent
      :promptText="promptText"
      :stemText="stemText"
      :responseSubmitted="responseSubmitted"
      :isCorrect="isCorrect"
      :feedback="feedback"
    />
    <ResponseOptions
      :showChoices="!responseSubmitted"
      @response="evaluateResponse"
    />
  </div>
</template>

<script>
import ResponseOptions from '@/components/ResponseOptions.vue';
import QuestionContent from '@/components/QuestionContent.vue';

export default {
  name: 'QuizQuestion',
  components: {
    ResponseOptions,
    QuestionContent,
  },
  props: {
    question: Object,
  },
  computed: {
    feedback() {
      return this.question.feedback;
    },
    promptText() {
      return this.question.promptText;
    },
    stemText() {
      return this.question.stemText;
    },
    isCorrect() {
      return this.question.isCorrect;
    },
    responseSubmitted() {
      return this.question.responseSubmitted;
    },
  },
  methods: {
    evaluateResponse(response) {
      this.$emit('response', response);
    },
  },
};
</script>

<style lang="scss">
.quiz-question {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
}
</style>

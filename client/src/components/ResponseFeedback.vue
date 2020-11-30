<template>
  <div class="response-feedback">
    <p>
      <span
        :class="[ isCorrect ? 'correct' : 'incorrect' ]"
        data-test-is-correct-message
        >{{ feedbackMessage }}</span>
      {{ feedback }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ResponseFeedback',
  props: {
    isCorrect: Boolean,
    feedback: String,
  },
  computed: {
    feedbackMessage() {
      return this.isCorrect ? 'Correct!' : 'Incorrect.';
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/_colors.scss";
@import "@/styles/_sizes.scss";
@import "@/styles/_typography.scss";

.response-feedback {
  @include special-message-font;
  margin-bottom: $xl;
  .correct {
    color: $success-color-5;
  }
  .incorrect {
    color: $failure-color-5;
  }
}
</style>

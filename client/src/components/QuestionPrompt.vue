<template>
  <div class="question-prompt" data-test-prompt>
    <div v-html="promptText"></div>
    <pre>{{ stemText }}</pre>
  </div>
</template>

<script>
export default {
  name: 'QuestionPrompt',
  props: {
    promptText: String,
    stemText: String,
  },
};
</script>

<style lang="scss">
@import "@/styles/_sizes.scss";
@import "@/styles/_typography.scss";

.question-prompt {
  @include special-message-font;
  margin-bottom: $xl;
}
</style>

<template>
  <div class="question-content">
    <QuestionPrompt
      :promptText="promptText"
      :stemText="stemText"
    />
    <ResponseFeedback
      v-if="responseSubmitted"
      :isCorrect="isCorrect"
      :feedback="feedback"
    />
  </div>
</template>

<script>
import ResponseFeedback from '@/components/ResponseFeedback.vue';
import QuestionPrompt from '@/components/QuestionPrompt.vue';

export default {
  name: 'QuestionContent',
  components: {
    ResponseFeedback,
    QuestionPrompt,
  },
  props: {
    promptText: String,
    stemText: String,
    responseSubmitted: Boolean,
    isCorrect: Boolean,
    feedback: String,
  },
};
</script>

<style lang="scss">
@import "@/styles/_sizes.scss";

.question-content {
  margin-top: $xxxxxl;
}
</style>

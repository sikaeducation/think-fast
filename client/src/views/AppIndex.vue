<template>
  <div id="app-index">
    <AppHeader :streak="streak" />
    <main>
      <div class="question">
        <div class="prompt" data-test-prompt>
          <p>According to the official <a href="https://v3.vuejs.org/style-guide">Vue style guide</a>, is this a good name for Vue component?</p>
          <pre>AppIndex.vue</pre>
        </div>
        <div v-if="responseSubmitted" class="feedback">
          <p v-if="responseCorrect">
            <span class="correct" data-test-correct-message>Correct!</span>
            That's PascalCase, two words, and uses the App prefix.
          </p>
          <p v-else>
            <span class="incorrect" data-test-incorrect-message>Incorrect.</span>
            That's PascalCase, two words, and uses the App prefix.
          </p>
        </div>
      </div>
      <div v-if="!responseSubmitted" class="response-options">
        <ButtonNo @click="evaluateResponse(false)" />
        <button @click="evaluateResponse(true)" class="yes" data-test-yes-button>Yes</button>
      </div>
      <div v-else class="response-options">
        <button @click="next" class="next" data-test-next-button>Next</button>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import ButtonNo from '@/components/ButtonNo.vue';

export default {
  name: 'AppIndex',
  components: {
    AppHeader,
    AppFooter,
    ButtonNo,
  },
  data() {
    return {
      responseSubmitted: false,
      responseCorrect: false,
      streak: 0,
    };
  },
  methods: {
    evaluateResponse(response) {
      this.responseSubmitted = true;
      this.responseCorrect = response;
      this.streak = this.responseCorrect
        ? this.streak + 1
        : 0;
    },
    next() {
      this.responseSubmitted = false;
      this.responseCorrect = false;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/_reset.scss";
@import "@/styles/_typography.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_sizes.scss";

pre {
  @include code-font;
  background-color: $grey-9;
  padding: $baseline;
}

#app-index {
  @include body-font;
  padding: $xxl;
  @media (max-width: $small-breakpoint){
    padding: $baseline;
  }
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
  justify-content: center;
  > header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-flow: row nowrap;
    h1 {
      @include heading-font-1;
    }
    .streak {
      margin-bottom: 6px; // Visual alignment
    }
  }
  > main {
    max-width: 600px;
    display: grid;
    grid-template-rows: 1fr auto;
    .question {
      margin-top: $xxxxxl;
      .prompt, .feedback {
        @include special-message-font;
        margin-bottom: $xl;
      }
      .feedback {
        .correct {
          color: $success-color-5;
        }
        .incorrect {
          color: $failure-color-5;
        }
      }
    }
    .response-options {
      display: flex;
      justify-content: center;
      flex-flow: row wrap;
      width: 100%;
      margin-bottom: $xl;
      .button-no, .yes, .next {
        width: 200px;
        margin: $baseline;
        @media (max-width: $small-breakpoint){
          margin: 0;
          margin-bottom: $baseline;
          width: 100%;
        }
      }
      .yes {
        background-color: $success-color-5;
      }
      .next {
        background-color: $primary-color-5;
      }
    }
  }
}
</style>

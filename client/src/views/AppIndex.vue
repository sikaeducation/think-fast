<template>
  <div id="app-index">
    <header>
      <h1>Think Fast!</h1>
      <div v-if="streak > 1" class="streak">
        Streak: {{ streak }}
      </div>
    </header>
    <main>
      <div class="question">
        <div class="prompt">
          <p>According to the official <a href="https://v3.vuejs.org/style-guide">Vue style guide</a>, is this a good name for Vue component?</p>
          <pre>AppIndex.vue</pre>
        </div>
        <div v-if="responseSubmitted" class="feedback">
          <p v-if="responseCorrect">
            <span class="correct">Correct!</span>
            That's PascalCase, two words, and uses the App prefix.
          </p>
          <p v-else>
            <span class="incorrect">Incorrect.</span>
            That's PascalCase, two words, and uses the App prefix.
          </p>
        </div>
      </div>
      <div v-if="!responseSubmitted" class="response-options">
        <button @click="evaluateResponse(false)" class="no">No</button>
        <button @click="evaluateResponse(true)" class="yes">Yes</button>
      </div>
      <div v-else class="response-options">
        <button @click="next" class="next">Next</button>
      </div>
    </main>
    <footer>
      <small>©2020, <a href="https://sikaeducation.com">Sika Education</a></small>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AppIndex',
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

button {
  @include button-font;
  cursor: pointer;
  border: none;
  padding: $small $xxl;
  box-shadow: 2px 2px 2px $grey-7;
  transition: filter $transition-fast;
  &:hover {
    filter: brightness(1.1)
  }
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
        margin-bottom: $xxl;
      }
      .feedback {
        margin-top: $xl;
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
      .no, .yes, .next {
        width: 100%;
        @media (max-width: $small-breakpoint){
          margin-bottom: $baseline;
        }
      }
      .no {
        background-color: $failure-color-5;
      }
      .yes {
        background-color: $success-color-5;
      }
      .next {
        background-color: $primary-color-5;
      }
    }
  }
  > footer {
    display: flex;
    justify-content: flex-end;
    color: $grey-7;
  }
}
</style>

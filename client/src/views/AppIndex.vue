<template>
  <div id="app-index">
    <header>
      <h1>Think Fast!</h1>
    </header>
    <main>
      <div class="prompt">
        <p>According to the official <a href="https://v3.vuejs.org/style-guide">Vue style guide</a>, is this a good name for Vue component?</p>
        <pre>AppIndex.vue</pre>
      </div>
      <div v-if="!responseSubmitted" class="response-options">
        <button @click="evaluateResponse(false)" class="no">No</button>
        <button @click="evaluateResponse(true)" class="yes">Yes</button>
      </div>
      <div v-else class="feedback">
        <p v-if="responseCorrect">
          <span class="correct">Correct!</span>
          That's PascalCase, two words, and uses the App prefix.
        </p>
        <p v-else>
          <span class="incorrect">Incorrect.</span>
          That's PascalCase, two words, and uses the App prefix.
        </p>
        <footer>
          <button @click="next" class="next">Next</button>
        </footer>
      </div>
      <div v-if="streak > 1" class="streak">
        <p>Streak: {{ streak }}</p>
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
  margin: 0 $baseline;
  transition: filter $transition-fast;
  &:hover {
    filter: brightness(1.1)
  }
}

#app-index {
  @include body-font;
  padding: $xxl;
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
  > header {
    h1 {
      @include heading-font-1;
    }
  }
  > main {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    .prompt, .feedback {
      max-width: 600px;
      @include special-message-font;
    }
    .response-options {
      display: flex;
      justify-content: center;
      padding: $xxl;
      .no {
        background-color: $failure-color-5;
      }
      .yes {
        background-color: $success-color-5;
      }
    }
    .feedback {
      margin-top: $xl;
      .correct {
        color: $success-color-5;
      }
      .incorrect {
        color: $failure-color-5;
      }
      footer {
        display: flex;
        justify-content: center;
        .next {
          background-color: $primary-color-5;
        }
      }
    }
    .streak {
      margin-top: $xxl;
    }
  }
  > footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

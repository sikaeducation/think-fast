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
      <div class="response-options">
        <button class="no">No</button>
        <button class="yes">Yes</button>
      </div>
    </main>
    <footer>
      <small>©2020, <a href="https://sikaeducation.com">Sika Education</a></small>
    </footer>
  </div>
</template>

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
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
  header {
    h1 {
      @include heading-font-1;
    }
  }
  main {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    .prompt {
      max-width: 600px;
      @include special-message-font;
    }
    .response-options {
      display: flex;
      justify-content: center;
      padding: $xxl;
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
      .no {
        background-color: $failure-color-5;
      }
      .yes {
        background-color: $success-color-5;
      }
    }
  }
  footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

<template>
  <header class="app-header">
    <h1>Think Fast!</h1>
    <div v-if="streak > 1" class="streak" data-test-streak>
      Streak: {{ streak }}
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    streak: Number,
  },
};
</script>

<style lang="scss">
@import "@/styles/_typography.scss";

.app-header {
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
</style>

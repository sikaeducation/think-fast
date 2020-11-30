<template>
  <div id="the-app">
    <AppHeader :streak="streak" />
    <main>
      <router-view @update-streak="updateStreak" />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      streak: 0,
    };
  },
  methods: {
    updateStreak(wasCorrect) {
      this.streak = wasCorrect
        ? this.streak + 1
        : 0;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/_reset.scss";
@import "@/styles/_sizes.scss";

#the-app {
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-content: center;
  min-height: 100vh;
  padding: $xxl;
  @media (max-width: $small-breakpoint){
    padding: $baseline;
  }
  > main {
    max-width: 600px;
  }
}
</style>

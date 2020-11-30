<template>
  <div id="the-app">
    <AppHeader :streak="streak" />
    <main>
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  computed: {
    ...mapState(['streak']),
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

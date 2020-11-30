<template>
  <BaseButton
    class="button-yes"
    data-test-yes-button
  >Yes</BaseButton>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'ButtonYes',
  components: {
    BaseButton,
  },
};
</script>

<style lang="scss">
@import "@/styles/_colors.scss";

.button-yes {
  background-color: $success-color-5;
}
</style>

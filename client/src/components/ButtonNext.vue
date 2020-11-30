<template>
  <BaseButton
    class="button-next"
    data-test-next-button
  >Next</BaseButton>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'ButtonNext',
  components: {
    BaseButton,
  },
};
</script>

<style lang="scss">
@import "@/styles/_colors.scss";

.button-next {
  background-color: $primary-color-5;
}
</style>

<template>
  <BaseButton
    class="button-no"
    data-test-no-button
    @click="$emit('click', $event)"
  >No</BaseButton>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'ButtonNo',
  components: {
    BaseButton,
  },
};
</script>

<style lang="scss">
@import "@/styles/_colors.scss";

.button-no {
  background-color: $failure-color-5;
}
</style>

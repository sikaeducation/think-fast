<template>
  <div class="response-options">
    <div v-if="showChoices">
      <ButtonNo @click="$emit('response', 'no')" />
      <ButtonYes @click="$emit('response', 'yes')" />
    </div>
    <div v-else>
      <ButtonNext @click="$emit('response', 'next')" />
    </div>
  </div>
</template>

<script>
import ButtonNo from '@/components/ButtonNo.vue';
import ButtonYes from '@/components/ButtonYes.vue';
import ButtonNext from '@/components/ButtonNext.vue';

export default {
  name: 'ResponseOptions',
  components: {
    ButtonNo,
    ButtonYes,
    ButtonNext,
  },
  props: {
    showChoices: Boolean,
  },
};
</script>

<style lang="scss">
@import "@/styles/_sizes.scss";

.response-options {
  width: 100%;
  > div {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    margin-bottom: $xl;
  }
}
</style>

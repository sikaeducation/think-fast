<template>
  <button><slot /></button>
</template>

<script>
export default {
  name: 'BaseButton',
};
</script>

<style lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_sizes.scss";

button {
  @include button-font;
  cursor: pointer;
  border: none;
  padding: $small $xxl;
  box-shadow: 2px 2px 2px $grey-7;
  transition: filter $transition-fast;
  width: 200px;
  margin: $baseline;
  @media (max-width: $small-breakpoint){
    margin: 0;
    margin-bottom: $baseline;
    width: 100%;
  }
  &:hover {
    filter: brightness(1.1)
  }
}
</style>

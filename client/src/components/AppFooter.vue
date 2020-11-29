<template>
  <footer class="app-footer">
    <small>©2020, <a href="https://sikaeducation.com">Sika Education</a></small>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style lang="scss">
@import "@/styles/_colors.scss";

.app-footer {
  display: flex;
  justify-content: flex-end;
  color: $grey-7;
}
</style>

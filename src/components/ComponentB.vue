<script setup lang="ts">
import { ref } from "vue";
const count = ref(0);
</script>

<template>
  <div class="flex align-content-center flex-wrap counter">
    <label class="flex align-items-center justify-content-center"
      >Counter:</label
    >
  </div>
</template>

<style lang="scss" scoped>
.counter {
  label {
    padding-right: 10px;
    font-weight: bold;
  }
  .count {
    padding: 0 10px;
  }
}
</style>

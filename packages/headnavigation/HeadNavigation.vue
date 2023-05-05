<script setup lang="ts">
import { CSSProperties } from "vue";
interface Props {
  onChange?: (state: boolean, staff: any) => void;
  overlayStyle?: CSSProperties;
}
const props = withDefaults(defineProps<Props>(), {
  showSwitch: true,
  onChange: () => {},
});
</script>
<template>
  <div class="head-navigation">HeadNavigation头部导航</div>
</template>
<style lang="scss" scoped>
.head-navigation {
  color: yellow;
}
</style>

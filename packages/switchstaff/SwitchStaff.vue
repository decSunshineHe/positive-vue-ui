<script setup lang="ts">
import { CSSProperties } from "vue";
interface Props {
  showSwitch?: boolean;
  onChange?: (state: boolean, staff: any) => void;
  overlayStyle?: CSSProperties;
}
const props = withDefaults(defineProps<Props>(), {
  showSwitch: true,
  onChange: () => {},
});
</script>
<template>
  <div class="switch-staff">SwitchStaff切换组件</div>
</template>
<style lang="scss" scoped>
.switch-staff {
  color: red;
}
</style>

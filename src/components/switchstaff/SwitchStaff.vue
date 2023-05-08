<script setup lang="ts">
import { computed, CSSProperties, ref } from "vue";
import StaffSvg from "./CustomSvg.vue";
import { ElPopover, ElScrollbar } from "element-plus";
import { useCurrent, useStaffList } from "../../utils/hooks";
import { StaffProps } from "../../common/entity";
import { UserInfo } from "../../api/user";

interface Props {
  showSwitch?: boolean;
  onChange?: (state: boolean, staff: any) => void;
  overlayStyle?: CSSProperties;
}
const props = withDefaults(defineProps<Props>(), {
  showSwitch: true,
  onChange: () => {},
});

let current = ref<UserInfo>();
useCurrent((val) => (current.value = val));

let staffList = ref<StaffProps[]>([]);
useStaffList((list) => (staffList.value = list));

const staffId = computed(() => current.value?.currentStaffId);

const staffName = computed(() => {
  const found = staffList.value.find(
    (item: any) => item.id === current.value?.currentStaffId
  );
  return found ? found.tenantName : "请选择";
});

const switchStaff = (_staffId: any) => {
  if (_staffId === staffId.value) return;
  console.log("切换");
};
</script>

<template>
  <div v-if="staffList.length > 1" class="staff-switch">
    <div class="icon">
      <StaffSvg />
    </div>
    <div class="staff-name">
      {{ staffName }}
    </div>
    <ElPopover
      placement="bottom-end"
      trigger="hover"
      :offset="22"
      popper-class="staff-switch-popover"
    >
      <ElScrollbar max-height="320px">
        <div class="staff-select-list">
          <div
            v-for="item in staffList"
            :key="item.id"
            class="staff-select-item"
            :class="{ 'is-current': staffId === item.id }"
            @click="switchStaff(item.id)"
          >
            {{ item.staffCode }} {{ item.customerName }} |
            {{ item.tenantName }}
          </div>
        </div>
      </ElScrollbar>
      <template #reference>
        <a class="link-btn">切换</a>
      </template>
    </ElPopover>
  </div>
</template>

<style lang="scss">
.staff-switch {
  display: flex;
  align-items: center;
  padding-right: 8px;
  .icon {
    height: 16px;
  }
  .staff-name,
  .link-btn {
    margin-left: 5px;
  }
  .staff-name {
    max-width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.75);
  }
  .link-btn {
    display: block;
    cursor: pointer;
    color: #4a90e2;
    text-decoration: none !important;
  }
}

.staff-switch-popover {
  width: auto !important;
  padding: 8px 4px 8px 0 !important;
  &.el-popper.is-light {
    background-color: #1f1f1f;
  }
  .el-scrollbar {
    background-color: #1f1f1f;
  }
  .el-popper__arrow::before {
    background-color: #1f1f1f !important;
  }
  .el-scrollbar__view {
    padding: 0 8px;
  }
  .staff-select-item {
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    border-radius: 4px;
    white-space: nowrap !important;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    & > * {
      pointer-events: none;
    }
    &.is-current {
      background-color: rgba(74, 144, 226, 0.16);
      color: #4a90e2;
    }
    &:hover:not(.is-current) {
      background: #4a90e2;
      color: #fff;
    }
  }
}
</style>

<script setup lang="ts">
import { computed, CSSProperties, markRaw, ref } from 'vue';
import StaffSvg from './CustomSvg.vue';
import { ElMessageBox, ElPopover, ElScrollbar } from 'element-plus';
import { refreshCurrrent, useCurrent, useStaffList } from '../../utils/hooks';
import { StaffProps } from '../../common/entity';
import { UserInfo } from '../../api/user';
import { Warning } from '@element-plus/icons-vue';
import { switchStaff } from '../../api/staff';

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
useCurrent(val => (current.value = val));

let staffList = ref<StaffProps[]>([]);
useStaffList(list => (staffList.value = list));

const staffId = computed(() => current.value?.currentStaffId);

const staffName = computed(() => {
  const found = staffList.value.find((item: any) => item.id === current.value?.currentStaffId);
  return found ? found.tenantName : '请选择';
});

const switchStaffAfterReload = () => {
  const pathname = window.location.pathname;
  const length = (pathname ?? '/').split('/').length;
  return length > 4
    ? window.location.assign(window.origin + '/' + pathname.split('/').slice(1, 4).join('/'))
    : window.location.reload();
};

const hasDiffrentTenant = computed(() => {
  const size = new Set((staffList.value ?? []).map(i => i.tenantMcid)).size;
  return size > 1;
});

const onClickItem = (staff: any) => {
  if (staff.currentStaffId === staffId.value) return;

  const message = `<div class="message-wrapper"><div class="message-title">切换账号</div><div class="message-content">即将切换到${
    hasDiffrentTenant ? staff.tenantName + '下' : ''
  }${staff.customerName}的账号${staff.staffCode},确定吗？未保存的数据将全部丢失</div></div>`;

  ElMessageBox.confirm(message, {
    dangerouslyUseHTMLString: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    customClass: 'staff-switch-message',
    type: 'warning',
    showClose: false,
    appendTo: document.body,
    icon: markRaw(Warning),
  }).then(() => {
    switchStaff(staff.id)
      .then(() => {
        refreshCurrrent();
        switchStaffAfterReload();
      })
      .catch((e: { status: number }) => {
        if (e.status === 412 || e.status === 403) {
          console.log('切换失败');
        }
      });
  });
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
    <ElPopover placement="bottom-end" trigger="hover" :offset="22" popper-class="staff-switch-popover">
      <ElScrollbar max-height="320px">
        <div class="staff-select-list">
          <div
            v-for="item in staffList"
            :key="item.id"
            class="staff-select-item"
            :class="{ 'is-current': staffId === item.id }"
            @click="onClickItem(item)"
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
    &:hover {
      background-color: unset;
    }
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

.staff-switch-message {
  background-color: #232324;
  border: 0;
  border-radius: 2px;
  width: 416px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.65);
  border-top: 4px solid #4a90e2;
  padding: 32px 32px 24px;
  .el-message-box__status {
    top: 14%;
  }
  .el-message-box__header {
    display: none;
  }
  .el-message-box__content {
    padding: 0;
  }
  .el-message-box__btns {
    padding: 24px 0 0;
  }
  .el-button {
    border-radius: 2px;
    border-color: rgba(0, 173, 255, 0.5);
    background: transparent;
    color: rgba(255, 255, 255, 0.65);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  }
  .el-button:hover {
    color: #3c6aa0;
    border-color: #3c6aa0;
  }

  .el-button--primary {
    background-color: #4a90e2;
    border-color: #4a90e2;
    color: #fff;
  }
  .el-button--primary:hover {
    color: #fff;
    border-color: #3570bd;
    background: #3570bd;
  }
  .message-wrapper {
    .message-title {
      font-size: 16px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.85);
      margin-bottom: 8px;
    }
    .message-content {
      color: rgba(255, 255, 255, 0.65);
    }
  }
}

.staff-switch-popover {
  width: auto !important;
  padding: 8px 4px 8px 0 !important;
  border: none !important;
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

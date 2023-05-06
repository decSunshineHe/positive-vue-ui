import { ref, watch, watchEffect } from "vue";
import { getStaffList } from "../api/staff";
import { getTenantMenuList } from "../api/tenant";
import { getCurrent } from "../api/user";
import { MenuItemProps } from "../common/entity";
import { lazyHolderSingletonGetter, SubjectHolder } from "../common/subject";

export type UpdateType = [number, () => void];

const getTenantCurrent = /*#__PURE__*/ lazyHolderSingletonGetter(
  () => new SubjectHolder(getCurrent)
);

function resetCurrent() {
  getTenantCurrent().resetData();
}

function refreshCurrrent(callback?: () => void) {
  getTenantCurrent().refreshData(callback);
}

export async function useCurrent() {
  const current = await getCurrent();
  if (current && !current?.currentStaffId) {
    window.location.assign(
      "https://cc.test.maxtropy.com/select-staff?redirect=" +
        encodeURIComponent(window.location.href)
    );
  }
  return current;
}

export async function useStaffList() {
  const current = await useCurrent();
  let staffList = await getStaffList();
  // TODO 缺少个轮训刷新
  return staffList;
}

function useTenantMenuNavigation() {
  const current = useCurrent();
  let menuList: MenuItemProps[] = [];

  return menuList;
}

export default {
  useCurrent,
  useStaffList,
  useTenantMenuNavigation,
};

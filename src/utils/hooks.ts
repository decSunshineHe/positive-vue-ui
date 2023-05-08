import { ref, watch, watchEffect } from "vue";
import { getStaffList } from "../api/staff";
import { getTenantMenuList } from "../api/tenant";
import { getCurrent, UserInfo } from "../api/user";
import { MenuItemProps } from "../common/entity";
import { lazyHolderSingletonGetter, SubjectHolder } from "../common/subject";

export type UpdateType = [number, () => void];

export const getTenantCurrent = /*#__PURE__*/ lazyHolderSingletonGetter(
  () => new SubjectHolder(getCurrent)
);

function resetCurrent() {
  getTenantCurrent().resetData();
}

function refreshCurrrent(callback?: () => void) {
  getTenantCurrent().refreshData(callback);
}

export function useCurrent(callback?: (current?: UserInfo) => void) {
  const currentInstance = getTenantCurrent();

  currentInstance.subscribe((current) => {
    if (current && !current?.currentStaffId) {
      window.location.assign(
        "https://cc.test.maxtropy.com/select-staff?redirect=" +
          encodeURIComponent(window.location.href)
      );
    }
    callback?.(current);
  });
}

export function useStaffList(callback?: (staffList?: any) => void) {
  const currentInstance = getTenantCurrent();

  currentInstance.subscribe((current) => {
    if (current?.currentStaffId) {
      getStaffList().then((res) => {
        callback?.(res);
      });
    }
  });
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

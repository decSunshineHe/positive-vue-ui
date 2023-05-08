import { StaffProps } from "../common/entity";
import { fetch } from "../common/request";

export function getStaffList(): Promise<StaffProps[]> {
  return fetch(`/api/getStaffList`);
}

export function switchStaff(id: number | string): Promise<void> {
  return fetch(`/api/staffSwitch?staffId=${id}`);
}

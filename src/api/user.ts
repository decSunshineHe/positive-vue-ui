import { fetch } from "../common/request";

export interface UserInfo {
  name?: string;
  headPic?: string;
  currentStaffId?: number;
  username?: string;
  sessionId?: string;
  tenantUuid?: string;
  userId?: string;
}

export function getCurrent(): Promise<UserInfo> {
  return fetch("/api/getUserInfo");
}

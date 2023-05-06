import { Key } from "react";
import { UserStatus, Gender } from "./const";

export enum NavigationPreference {
  AUTO = 1,
  OPEN = 2,
  HIDE = 3,
}

export interface Customer {
  mcid: string;
  name: string;
  fullName: string;
  uscc?: string;
  address?: string;
  phone?: string;
  contactName?: string;
  adCode: string;
  logoUrl?: string;
  disabled?: boolean;
  username?: string;
  contactPhone: string;
  createTime: string;
  updateTime: string;
}

export interface Staff {
  id: number;
  mcid: string;
  muid: string;
  admin: boolean;
  createTime: string;
  updateTime: string;
  status: UserStatus;
  staffCode: string;
  iconUrl?: string;
  platformTitleType?: PlatformTitleType;
  platformName?: string;
  homePageLogoUrl?: string;
}

export interface StaffProps {
  customerName: string;
  customerFullName: string;
  id: number;
  muid: string;
  mcid: string;
  staffCode?: string;
  tenantMcid: string;
  tenantName: string;
  customerMcid: string;
}

export interface CustomerUser {
  muid: string;
  username: string;
  name: string;
  cellphone: string;
  expired: boolean;
  disabled: boolean;
  status: UserStatus;
  gender: Gender;
  birthday?: string;
  email?: string;
  wechat?: string;
  qq?: string;
  headPic?: string;
  humanCode: string;
  createTime: string;
  updateTime: string;
  passwordUpdateTime: string;
  navigationPreference?: NavigationPreference;
}

export interface Tenant {
  mcid: string;
  name: string;
  uscc?: string;
  tenantCode: string;
}

export enum PlaceType {
  TOP = "top",
  NAVBAR = "navbar",
}

export interface IMenu {
  id: number;
  name: string;
  code: string;
  type: string;
  place: PlaceType;
  path: string;
  origin: string;
}

export interface MenuEntry {
  name: string;
  url: string;
  key: Key;
  children?: MenuEntry[];
  always?: boolean;
  origin?: string;
}

export enum PlatformTitleType {
  PLATFORMNAME = 1,
  NAVIGATIONNAME = 2,
  PLATFORMANDNAVIGATIONNAME = 3,
}

export interface MenuItemProps {
  currentId: string;
  level: number;
  name: string;
  openType: number;
  parentId: string;
  rootId: string;
  transitPagePath: string | null;
  weighting: number;
}

export interface MenuItem extends MenuItemProps {
  children?: MenuItem[];
}

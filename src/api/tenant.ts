import { fetch } from '../common/request';
import { MenuItemProps } from '../common/entity';

export function combineURL(origin: string, relativeURL?: string): string {
  return relativeURL ? (origin ?? '').replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : origin;
}

export function getTenantMenuList() {
  return fetch<MenuItemProps[]>('/api/getStaffNavigation');
}

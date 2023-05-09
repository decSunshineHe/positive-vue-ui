export enum UserStatus {
  ENABLE = 0,
  DISABLE = 1,
  FREEZE = 2,
}

export enum Gender {
  MALE = 0,
  FEMALE = 1,
}

export enum PermissionType {
  MENU = 'p',
  BUTTON = 'b',
}

export enum MenuLevel {
  ONE = 1,
  TWO = 2,
  THREE = 3,
}

export enum MenuOpenType {
  CurrentPage = 0,
  NewPage = 1,
  CurrentPageForce = 2,
}

export enum TenantMenuJumpType {
  WITHINSYSTEM = 1,
  CUSTOMIZATIONWITHINSYSTEM = 2,
  OUTSIDESYSTEM = 3,
}

export enum TenantMenuPermissionType {
  PLATFORM = 1,
  INTEGRATEDAPP = 2,
  NOPERMISSION = 3,
}

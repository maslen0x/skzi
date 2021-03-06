export enum Roles {
  System = 'Система',
  Admin = 'Администратор',
  Operator = 'Оператор',
  User = 'Пользователь'
}

export interface Role {
  id: number
  role: Roles
}
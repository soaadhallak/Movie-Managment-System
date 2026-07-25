export enum UserRole {
  MANAGER = 'MANAGER',
  CUSTOMER = 'CUSTOMER',
}

export class User {
  constructor(
    public readonly id: number,

    public username: string,

    public password: string,

    public age: number,

    public role: UserRole,

    public readonly createdAt?: Date
  ) { }


  changePassword(password: string) {
    this.password = password;
  }

  isManager() {
    return this.role === UserRole.MANAGER;
  }

  canWatchMovie(movieAge: number) {
    return this.age >= movieAge;
  }
}

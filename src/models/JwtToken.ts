export enum UserRole {
    Admin = 1,
    HR = 2,
    User = 3
}

export type JwtToken = {
    Role: UserRole
}
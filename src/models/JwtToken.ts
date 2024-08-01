export enum UserRole {
    Admin = 1,
    User = 2
}

export type JwtToken = {
    Role: UserRole
}
export enum UserRole {
    Admin = 1,
    User = 3
}

export type JwtToken = {
    Role: UserRole
}
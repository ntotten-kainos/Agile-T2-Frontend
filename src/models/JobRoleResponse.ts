export type JobRoleResponse = {
    jobRoleId: number,
    roleName: string,
    location: string, //enum as string? String or string?
    band: string,
    capability: String,
    formattedClosingDate: Date;
}
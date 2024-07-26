export type JobRoleResponse = {
    jobRoleId: number,
    roleName: string,
    location: string, //enum as string? String or string?
    bandValue: string,
    capabilityName: string,
    formattedClosingDate: Date;
}
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { getJobRoles } from '../../../src/services/JobRoleService';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";

const jobRoleResponse: JobRoleResponse = {
    jobRoleId: 1,
    roleName: "Test Engineer",
    location: "Belfast",
    band: "1",
    capability: "healthcare",
    closingDate: new Date('2024-12-31T23:59:59.000Z') 
}

const mock = new MockAdapter(axios);

describe('JobRoleService', function () {
    describe('getJobRoles', function () {
        it('should return Job Roles from response', async () => {
            const data = [jobRoleResponse];

            mock.onGet("http://localhost:8080/api/job-roles").reply(200, data);

            const results = await getJobRoles();

            expect(results[0].jobRoleId).to.equal(jobRoleResponse.jobRoleId);
            expect(results[0].roleName).to.equal(jobRoleResponse.roleName);
            expect(results[0].location).to.equal(jobRoleResponse.location);
            expect(results[0].band).to.equal(jobRoleResponse.band);
            expect(results[0].capability).to.equal(jobRoleResponse.capability);
            expect(new Date(results[0].closingDate).getTime()).to.equal(jobRoleResponse.closingDate.getTime());
        });

        
        it('should throw an error when the request fails', async () => {
            mock.onGet("http://localhost:8080/api/job-roles").reply(500);

            try {
                await getJobRoles();
                throw new Error('Test failed - error was not thrown');
            } catch (e) {
                expect(e.message).to.equal('Failed to get Job Roles');
            }
        });





    });
});

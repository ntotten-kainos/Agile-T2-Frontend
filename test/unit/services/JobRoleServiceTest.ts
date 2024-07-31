import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { getJobRoles, URL } from '../../../src/services/JobRoleService';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";

const jobRoleResponse: JobRoleResponse = {
    jobRoleId: 1,
    roleName: "Test Engineer",
    location: "Belfast",
    bandValue: "BAND1",
    capabilityName: "healthcare",
    formattedClosingDate: new Date('2024-12-31T23:59:59.000Z')
}

const mock = new MockAdapter(axios);

describe('JobRoleService', function () {
    describe('getJobRoles', function () {
        it('should return Job Roles from response', async () => {
            const data = [jobRoleResponse];

            mock.onGet(URL).reply(200, data);

            const results = await getJobRoles();

            expect(results[0].jobRoleId).to.equal(jobRoleResponse.jobRoleId);
            expect(results[0].roleName).to.equal(jobRoleResponse.roleName);
            expect(results[0].location).to.equal(jobRoleResponse.location);
            expect(results[0].bandValue).to.equal(jobRoleResponse.bandValue);
            expect(results[0].capabilityName).to.equal(jobRoleResponse.capabilityName);
            expect(new Date(results[0].formattedClosingDate).getTime()).to.equal(jobRoleResponse.formattedClosingDate.getTime());
        });


        it('should throw an error when the request fails', async () => {
            mock.onGet(URL).reply(500);

            try {
                await getJobRoles();
                throw new Error('Test failed - error was not thrown');
            } catch (e) {
                expect(e.message).to.equal('Failed to get Job Roles');
            }
        });

    });

    // describe('getJobRoleByID', function () {
    //     it('should return single Job Role detail page from response', async () => {
    //         const data = [jobRoleResponse];

    //         mock.onGet(URL).reply(200, data);

    //         const results = await getJobRoles();

    //         expect(results[0].jobRoleId).to.equal(jobRoleResponse.jobRoleId);
    //         expect(results[0].roleName).to.equal(jobRoleResponse.roleName);
    //         expect(results[0].location).to.equal(jobRoleResponse.location);
    //         expect(results[0].bandValue).to.equal(jobRoleResponse.bandValue);
    //         expect(results[0].capabilityName).to.equal(jobRoleResponse.capabilityName);
    //         expect(new Date(results[0].formattedClosingDate).getTime()).to.equal(jobRoleResponse.formattedClosingDate.getTime());
    //     });


    //     it('should throw an error when the request fails', async () => {
    //         mock.onGet(URL).reply(500);

    //         try {
    //             await getJobRoles();
    //             throw new Error('Test failed - error was not thrown');
    //         } catch (e) {
    //             expect(e.message).to.equal('Failed to get Job Roles');
    //         }
    //     });

    // });



});

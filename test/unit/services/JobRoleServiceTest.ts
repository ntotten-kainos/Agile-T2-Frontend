import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { getJobRoleByID, getJobRoles, URL } from '../../../src/services/JobRoleService';
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { JobRoleDetailResponse } from "../../../src/models/JobRoleDetailResponse";

const jobRoleResponse: JobRoleResponse = {
    jobRoleId: 1,
    roleName: "Test Engineer",
    location: "Belfast",
    bandValue: "BAND1",
    capabilityName: "healthcare",
    formattedClosingDate: new Date('2024-12-31T23:59:59.000Z')
}

const jobRoleDetailResponse: JobRoleDetailResponse = {
    roleName: "Test Engineer",
    description: "Test description",
    responsibilities: "Test responsibilities",
    specification: "Test specificationLink",
    location: "Test location",
    capabilityName: "Test capabilityName",
    bandValue: "Test bandValue",
    formattedClosingDate: new Date('2024-12-31T23:59:59.000Z')
}

const mock = new MockAdapter(axios);

describe('JobRoleService', function () {
    const token = 'test-token';
    describe('getJobRoles', function () {
        it('should return Job Roles from response', async () => {
            const data = [jobRoleResponse];

            mock.onGet(URL).reply(200, data);

            const results = await getJobRoles(token);

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
                await getJobRoles(token);
                throw new Error('Test failed - error was not thrown');
            } catch (e) {
                expect(e.message).to.equal('Failed to get Job Roles');
            }
        });
    });

    describe('getJobRoleByID', function () {
        it('should return Job Role Detail from response', async () => {
            const data = jobRoleDetailResponse;

            const jobRoleId = "1";

            mock.onGet(URL + jobRoleId).reply(200, data);
            const role = await getJobRoleByID(jobRoleId, token);

            const expectedData = {
                ...jobRoleDetailResponse,
                formattedClosingDate: new Date(jobRoleDetailResponse.formattedClosingDate).toISOString()
            };

            expect(role).to.deep.equal(expectedData);
        })
        
        it('should throw exception when 500 error returned from axios', async () => {
            
            const jobRoleId = "1";
            mock.onGet(URL + jobRoleId).reply(500);
        
            try {
             await getJobRoleByID(jobRoleId, token);
            } catch (e) {
              expect(e.message).to.equal('Failed to get Job Role Details');
              return;
            }
        });

        it('should throw exception when 404 error returned from axios', async () => {

            const data = jobRoleDetailResponse;
            const jobRoleId = "999";
            mock.onGet(URL + jobRoleId).reply(404, data);
      
            try {
              await getJobRoleByID(jobRoleId, token);
            } catch (e) {
              expect(e.message).to.equal('Role does not exist');
              return;
            }
        })

    });

});
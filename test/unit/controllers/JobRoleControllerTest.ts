import * as JobRoleController from "../../../src/controllers/JobRoleController";
import * as JobRoleService from "../../../src/services/JobRoleService";
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { expect } from 'chai';
import sinon from 'sinon';

const jobRoleResponse: JobRoleResponse = {
    jobRoleId: 1,
    roleName: "Test Engineer",
    location: "Belfast",
    bandValue: "BAND1",
    capabilityName: "healthcare",
    formattedClosingDate: new Date('2024-12-31T23:59:59')
};

describe('JobRoleController', function () {
    afterEach(() => {
        sinon.restore();
    });

    describe('getAllJobRoles', function () {
        it('should render view with Job Roles when Job Roles returned', async () => {
            const jobRoleList = [jobRoleResponse];

            sinon.stub(JobRoleService, 'getJobRoles').resolves(jobRoleList);

            const req = { session: { token: 'test-token' } };
            const res = { render: sinon.spy(), locals: {} };

            await JobRoleController.getAllJobRoles(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('jobRoles', { jobRoles: jobRoleList })).to.be.true;
        });

        it('should render view with error message when error thrown', async () => {
            const errorMessage: string = 'Error message';
            sinon.stub(JobRoleService, 'getJobRoles').rejects(new Error(errorMessage));

            const req = { session: { token: 'test-token' } };
            const res = { render: sinon.spy(), locals: { errormessage: '' } };

            await JobRoleController.getAllJobRoles(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('jobRoles')).to.be.true;
            expect(res.locals.errormessage).to.equal(errorMessage);
        });

        it('should view Job Roles when Job Roles returned, and user is logged in', async () => {
            const expected = jobRoleResponse;
            const jobRole = [expected];

            const req = {
                session: { token: 'test-token' }
            };

            const res = {
                render: sinon.spy(),
                redirect: sinon.spy(),
            };

            sinon.stub(JobRoleService, 'getJobRoles').resolves(jobRole);

            await JobRoleController.getAllJobRoles(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('jobRoles', { jobRoles: jobRole })).to.be.true;
        });
        
    });
});

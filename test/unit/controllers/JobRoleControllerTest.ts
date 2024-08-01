import * as JobRoleController from "../../../src/controllers/JobRoleController";
import * as JobRoleService from "../../../src/services/JobRoleService";
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { expect } from 'chai';
import sinon from 'sinon';
import { JobRoleDetailResponse } from "../../../src/models/JobRoleDetailResponse";

const jobRoleResponse: JobRoleResponse = {
    jobRoleId: 1,
    roleName: "Test Engineer",
    location: "Belfast",
    bandValue: "BAND1",
    capabilityName: "healthcare",
    formattedClosingDate: new Date('2024-12-31T23:59:59')
}

const jobRoleDetailResponse: JobRoleDetailResponse = {
    roleName: "Test Engineer",
    description: "Test description",
    responsibilities: "Test responsibilities",
    specification: "Test specification",
    location: "Test location", 
    capabilityName: "Test capabilityName",
    bandValue: "Test bandValue",
    formattedClosingDate: new Date('2024-12-31T23:59:59.000Z')
}



describe('JobRoleController', function () {
    afterEach(() => {
        sinon.restore();
    });


    describe('getAllJobRoles', function () {
        it('should render view with Job Roles when Job Roles returned', async () => {
            const jobRoleList = [jobRoleResponse];

            sinon.stub(JobRoleService, 'getJobRoles').resolves(jobRoleList);

            const req = {};
            const res = { render: sinon.spy() };

            await JobRoleController.getAllJobRoles(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('jobRoles', { jobRoles: jobRoleList })).to.be.true;
        });

    it('should render view with error message when error thrown', async () => {
        const errorMessage: string = 'Error message';
        sinon.stub(JobRoleService, 'getJobRoles').rejects(new Error(errorMessage));

        const req = { };
        const res = { render: sinon.spy(), locals: { errormessage: '' } };

        await JobRoleController.getAllJobRoles(req as any, res as any);

        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('jobRoles')).to.be.true;
        expect(res.locals.errormessage).to.equal(errorMessage);
      });
    });


    describe('getSingleJobRole', function () {
        it('should render view with single Job Role Detail page when Job Role Details returned', async () => {
            const singleJobRoleDetails = jobRoleDetailResponse;

            sinon.stub(JobRoleService, 'getJobRoleByID').resolves(singleJobRoleDetails);

            const req = { params: { id: '1' } };
            const res = { render: sinon.spy() };

            await JobRoleController.getSingleJobRole(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('jobRoleDetail.html', { jobRole: singleJobRoleDetails })).to.be.true;
        });

    });

    it('should render view with error message when error thrown', async () => {
        const errorMessage: string = 'Error message';
        sinon.stub(JobRoleService, 'getJobRoleByID').rejects(new Error(errorMessage));

        const req = { params: { id: '1' } };
        const res = { render: sinon.spy(), locals: { errormessage: '' } };

        await JobRoleController.getSingleJobRole(req as any, res as any);

        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('jobRoleDetail.html')).to.be.true;
        expect(res.locals.errormessage).to.equal(errorMessage);
      });


});
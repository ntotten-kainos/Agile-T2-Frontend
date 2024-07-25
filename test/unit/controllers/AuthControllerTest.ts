import { getLoginForm } from './../../../src/controllers/AuthController';
import * as AuthController from '../../../src/controllers/AuthController'
import * as AuthService from '../../../src/services/AuthService';
import { expect } from 'chai';
import sinon from 'sinon';
import { getAuthToken } from '../../../src/services/AuthService';

describe ('AuthController', function() {
    afterEach(() => {
        sinon.restore();
    });

    describe('getLoginForm', function() {
        it('should render loginForm', async () => {
            const req = {  };  
            const res = { render: sinon.spy(), locals: { errormessage: '' } };

            await AuthController.getLoginForm(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('loginForm')).to.be.true;
        })
    })

    describe('postLoginForm', function() {
        it('should redirect when successfully retrieves JWT Token', async () => {
            const token: string = "valid.response.token";
            sinon.stub(AuthService, 'getAuthToken').resolves(token);

            const req = { };
            const res = { redirect: sinon.spy() };

            await AuthController.postLoginForm(req as any, res as any);

            expect(res.redirect.calledOnce).to.be.true;
        })

        it('should redirect to loginForm with errormessage and form data in body when error is caught', async () => {
            
        })
    })
})
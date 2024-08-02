import * as AuthController from '../../../src/controllers/AuthController'
import * as AuthService from '../../../src/services/AuthService';
import { expect } from 'chai';
import sinon from 'sinon';

describe('AuthController', function () {

    afterEach(() => {
        sinon.restore();
    });

    const VALID_EMAIL = process.env.VALID_TEST_EMAIL;
    const VALID_PASSWORD = process.env.VALID_TEST_PASSWORD;

    describe('logout', function () {
        it('should set token to undefined and redirect to login page', async () => {
            const req = { session: {token: '' } };
            const res = { redirect: sinon.spy(), locals: { } };

            await AuthController.logout(req as any, res as any);

            expect(res.redirect.calledWith('/loginForm')).to.be.true;
            expect(req.session.token).to.be.undefined;
        })
    })

    describe('getLoginForm', function () {

        it('should render loginForm', async () => {
            const req = {};
            const res = { render: sinon.spy(), locals: { loggedin: false } };

            await AuthController.getLoginForm(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('loginForm')).to.be.true;
        })
    })

    describe('postLoginForm', function () {

        // Succeeds on POST loginForm.
        it('should redirect when successfully retrieves JWT Token', async () => {
            sinon.stub(AuthService, 'getAuthToken').resolves("token");

            // Need to ensure request body is populated with required content.
            const req = {
                body: {
                    "email": VALID_EMAIL,
                    "password": VALID_PASSWORD
                }, session: {
                    "token": ""
                }
            };

            const res = { redirect: sinon.spy(), render: sinon.spy(), locals: { errormessage: '' }};

            await AuthController.postLoginForm(req as any, res as any);

            expect("token").to.equal(req.session.token);
            expect(res.redirect.calledWith('/')).to.be.true;
        })

        // Fails if email is invalid
        it('should redirect to loginForm with errormessage and form data in body when email is invalid', async () => {
            const error: string = "Error";
            sinon.stub(AuthService, 'getAuthToken').rejects(new Error(error));

            const req = {
                body: {
                    "email": 'invalid',
                    "password": VALID_PASSWORD
                }
            };

            const res = { render: sinon.spy(), locals: { errormessage: '' } };

            await AuthController.postLoginForm(req as any, res as any);

            expect(res.render.calledWith('loginForm')).to.be.true;
            expect(res.locals.errormessage).to.equal(error);
            expect(req.body.email).to.equal('invalid');
            expect(req.body.password).to.equal(VALID_PASSWORD);
        })

        // Fails if password is invalid
        it('should redirect to loginForm with errormessage and form data in body when password is invalid', async () => {
            const error: string = "Error";
            sinon.stub(AuthService, 'getAuthToken').rejects(new Error(error));

            const req = {
                body: {
                    "email": VALID_EMAIL,
                    "password": 'invalid'
                }
            };

            const res = { render: sinon.spy(), locals: { errormessage: '' } };

            await AuthController.postLoginForm(req as any, res as any);

            expect(res.render.calledWith('loginForm')).to.be.true;
            expect(res.locals.errormessage).to.equal(error);
            expect(req.body.password).to.equal('invalid');
            expect(req.body.email).to.equal(VALID_EMAIL);
        })
    })
})
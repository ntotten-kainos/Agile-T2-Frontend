import { LoginRequest } from './../../../src/models/LoginRequest';
import { getAuthToken } from './../../../src/services/AuthService';
import * as AuthService from '../../../src/services/AuthService'
import { expect } from 'chai';
import sinon from 'sinon';

describe('AuthService Tests', function () {

    afterEach(() => {
        sinon.restore();
    });

    const VALID_EMAIL = process.env.VALID_TEST_EMAIL;
    const VALID_PASSWORD = process.env.VALID_TEST_PASSWORD;
    const VALID_LOGIN_REQUEST: LoginRequest = {email: String(VALID_EMAIL), password: String(VALID_PASSWORD)};

    describe('getAuthToken', function () {

        it('should return JWT token in response data for a valid LoginRequest', async () => {
            const req = {};
            const res = { render: sinon.spy() };

            await AuthService.getAuthToken();
        })
    })
})
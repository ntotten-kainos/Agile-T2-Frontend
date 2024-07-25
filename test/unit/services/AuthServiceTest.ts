import { LoginRequest } from './../../../src/models/LoginRequest';
import { getAuthToken, URL } from './../../../src/services/AuthService';
import * as AuthService from '../../../src/services/AuthService';
import axios from 'axios';
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import sinon from 'sinon';

describe('AuthService', function () {

    afterEach(() => {
        sinon.restore();
    });

    const VALID_EMAIL = process.env.VALID_TEST_EMAIL;
    const VALID_PASSWORD = process.env.VALID_TEST_PASSWORD;
    const VALID_LOGIN_REQUEST: LoginRequest = {email: String(VALID_EMAIL), password: String(VALID_PASSWORD)};
    const INVALID_LOGIN_REQUEST: LoginRequest = {email: 'invalid', password: 'invalid'}
    const RESPONSE_TOKEN: string = "mock.token.response";

    const mock = new MockAdapter(axios);

    describe('getAuthToken', function () {

        it('should return JWT token in response data for a valid LoginRequest', async () => {
            const req = {};
            const res = { render: sinon.spy() };

            mock.onPost(URL, VALID_LOGIN_REQUEST).reply(200, RESPONSE_TOKEN);

            const response = await getAuthToken(VALID_LOGIN_REQUEST);
            expect(response).to.deep.equal(RESPONSE_TOKEN);
        })

        it('should return 400 in response data for an invalid LoginRequest', async () => {
            const req = {};
            const res = { render: sinon.spy() };

            mock.onPost(URL, INVALID_LOGIN_REQUEST).reply(400, "Error Message");

            try {
                await getAuthToken(INVALID_LOGIN_REQUEST);
            } catch (error) {
                expect(error.message).to.equal("Error Message");
                return;
            }
        })
    })
})
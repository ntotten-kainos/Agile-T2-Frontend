import { LoginRequest } from './../../../src/models/LoginRequest';
import { getAuthToken, URL } from './../../../src/services/AuthService';
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
            mock.onPost(URL, VALID_LOGIN_REQUEST).reply(200, RESPONSE_TOKEN);

            const response = await getAuthToken(VALID_LOGIN_REQUEST);
            console.log(response);
            expect(response).to.deep.equal(RESPONSE_TOKEN);
        })

        it('should throw error for an invalid LoginRequest without sending POST request', async () => {
            try {
                await getAuthToken(INVALID_LOGIN_REQUEST);
            } catch (error) {
                expect(error.message).to.equal("Invalid Email Format!");
                return;
            }
        })
    })
})
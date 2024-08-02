import { validateLoginRequest } from './../../../src/validators/LoginRequestValidator';
import { assert, expect } from 'chai';
import { LoginRequest } from '../../../src/models/LoginRequest';

describe('LoginRequestValidator', function () {
    describe('validateLoginRequest', function () {

        it('should return error when email format is invalid', () => {
            const loginReq: LoginRequest = {
                email: "invalid.emailatgmail.com",
                password: "Pa$$word!123"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal("Invalid email or password - hover over input field for more info!");
                return;
            }

            assert.fail("Expected error message");
        })

        it('should return error when password is too short', () => {
            const loginReq: LoginRequest = {
                email: "valid@gmail.com",
                password: "Pa$$!12"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal("Invalid email or password - hover over input field for more info!");
                return;
            }

            assert.fail("Expected error message");
        })

        it('should return error when password has no lowercase', () => {
            const loginReq: LoginRequest = {
                email: "valid@gmail.com",
                password: "PA$$WORD!123"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal("Invalid email or password - hover over input field for more info!");
                return;
            }

            assert.fail("Expected error message");
        })

        it('should return error when password has no uppercase', () => {
            const loginReq: LoginRequest = {
                email: "valid@gmail.com",
                password: "pa$$word!123"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal("Invalid email or password - hover over input field for more info!");
                return;
            }

            assert.fail("Expected error message");
        })

        it('should return error when password has no digit(s)', () => {
            const loginReq: LoginRequest = {
                email: "valid@gmail.com",
                password: "Pa$$word!"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal("Invalid email or password - hover over input field for more info!");
                return;
            }

            assert.fail("Expected error message");
        })

        it('should return error when password has no special characters', () => {
            const loginReq: LoginRequest = {
                email: "valid@gmail.com",
                password: "Password1234"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal("Invalid email or password - hover over input field for more info!");
                return;
            }

            assert.fail("Expected error message");
        })

        it('should return error when password has multiple formatting issues', () => {
            const errorString: string = "Invalid email or password - hover over input field for more info!";

            const loginReq: LoginRequest = {
                email: "valid@gmail.com",
                password: "Password"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                console.log(e.message);
                expect(e.message).to.equal(errorString);
                return;
            }

            assert.fail("Expected error message");
        })

        it('should not throw exception when email and password formats are valid', () => {
            const loginReq: LoginRequest = {
                email: "valid.email@gmail.com",
                password: "Pa$$word!123"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                assert.fail("Expected no error message");
            }
        })

        it('should return error when password field is empty', () => {
            const errorString: string = "Please enter password";

            const loginReq: LoginRequest = {
                email: "valid@gmail.com",
                password: ""
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal(errorString);
                return;
            }

            assert.fail("Expected error message");
        })

        it('should return error when email field is empty', () => {
            const errorString: string = "Please enter email";

            const loginReq: LoginRequest = {
                email: "",
                password: "Pa$$word!123"
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal(errorString);
                return;
            }

            assert.fail("Expected error message");
        })

        it('should return error when both fields are empty', () => {
            const errorString: string = "Please enter email and password";

            const loginReq: LoginRequest = {
                email: "",
                password: ""
            }

            try {
                validateLoginRequest(loginReq);
            } catch (e) {
                expect(e.message).to.equal(errorString);
                return;
            }

            assert.fail("Expected error message");
        })
    })
})
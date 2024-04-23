import { assert, expect } from 'chai';
import { validateEmployeeRequest } from '../../../src/validators/EmployeeValidator';
import { EmployeeRequest } from '../../../src/models/EmployeeRequest'

describe('EmployeeValidator', function () {
    describe('validateEmployeeRequest', function () {
      it('should not throw exception when errors', () => {
        const employeeRequest: EmployeeRequest = {
            salary: 30000,
            fname: "Mocha",
            lname: "Chai",
            email: "test@email.com",
            address: "address",
            address2: "address2",
            city: "city",
            county: "county",
            postalCode: "postalCode",
            country: "country",
            phoneNo: "01234567890",
            bankNo: "12345678",
            nin: "12345678"
        }

        try {
          validateEmployeeRequest(employeeRequest);
        } catch (e) {
          assert.fail("Expected no error message");
        } 
      })

      it('should return error when salary too low', () => {
        const employeeRequest: EmployeeRequest = {
            salary: 10000,
            fname: "Mocha",
            lname: "Chai",
            email: "test@email.com",
            address: "address",
            address2: "address2",
            city: "city",
            county: "county",
            postalCode: "postalCode",
            country: "country",
            phoneNo: "01234567890",
            bankNo: "12345678",
            nin: "12345678"
        }

        try {
          validateEmployeeRequest(employeeRequest);
        } catch (e) {
          expect(e.message).to.equal("Salary must be at least £20,000");
          return;
        }

        assert.fail("Expected error message");
      })

    /*
    Unit Test Exercise 1

    Write a unit test for the validateEmployee method

    When the bank number is less than 8 characters

    Expect error to be returned

    This should pass without code changes
     */

    /*
    Unit Test Exercise 2

    Write a unit test for the validateEmployee method

    When the bank number is more than 8 characters

    Expect error to be returned

    This should pass without code changes
     */

    /*
    Unit Test Exercise 3

    Write a unit test for the validateEmployee method

    When the first name is more than 50 characters

    Expect error to be returned

    This should fail, make code changes to make this test pass
     */

    /*
    Unit Test Exercise 4

    Write a unit test for the validateEmployee method

    When the last name is more than 50 characters

    Expect error to be returned

    This should fail, make code changes to make this test pass
     */

    /*
    Unit Test Exercise 5

    Write a unit test for the validateEmployee method

    When the nin is more than 8 characters

    Expect error to be returned

    This should fail, make code changes to make this test pass
     */

    /*
    Unit Test Exercise 6

    Write a unit test for the validateEmployee method

    When the nin is less than 8 characters

    Expect error to be returned

    This should fail, make code changes to make this test pass
     */
    })
  })
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { getAllEmployees, URL } from '../../../src/services/EmployeeService';
import { EmployeeRequest } from "../../../src/models/EmployeeRequest";

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
    nin: "nin"
}

const mock = new MockAdapter(axios);

describe('EmployeeService', function () {
    describe('getAllEmployees', function () {
      it('should return employees from response', async () => {
        const data = [employeeRequest];

        mock.onGet(URL).reply(200, data);

        const results = await getAllEmployees();

        expect(results[0]).to.deep.equal(employeeRequest)
      })

      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet(URL).reply(500);

        try {
          await getAllEmployees();
        } catch (e) {
          expect(e.message).to.equal('Could not get employees');
          return;
        }
        
      })

    /*
    Mocking Exercise 1

    Write a unit test for the getEmployee method

    When axios returns with a 500 error

    Expect a "Failed to get employee" error to be returned

    This should fail, make code changes to make this test pass
     */

    /*
    Mocking Exercise 2

    Write a unit test for the getEmployee method

    When axios returns an employee

    Expect the employee to be returned

    This should pass without code changes
     */

    /*
    Mocking Exercise 3

    Write a unit test for the getEmployee method

    When the id parameter is null

    Expect a "Invalid ID" error should be returned and axios not invoked

    This should fail, make code changes to make this test pass
     */

    /*
    Mocking Exercise 4

    Write a unit test for the getEmployee method

    When axios returns with a 400 error

    Expect a "Employee does not exist" error to be returned

    This should fail, make code changes to make this test pass
     */

    /*
    Mocking Exercise 5

    Write a unit test for the createEmployee method

    When the axios returns an id

    Expect the id to be returned

    This should pass without code changes
     */

    /*
    Mocking Exercise 6

    Write a unit test for the createEmployee method

    When axios returns with a 400 error

    Expect a "Invalid data" error to be returned

    This should fail, make code changes to make this test pass
     */

     /*
    Mocking Exercise 7

    Write a unit test for the createEmployee method

    When axios returns with a 500 error

    Expect a "Could not create employee" error to be returned

    This should fail, make code changes to make this test pass
     */
    })
  })
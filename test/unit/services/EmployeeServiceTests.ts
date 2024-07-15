import { EmployeeRequest } from './../../../src/models/EmployeeRequest';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { createEmployee, getAllEmployees, getSingleEmployee, URL } from '../../../src/services/EmployeeService';
import { EmployeeResponse } from "../../../src/models/EmployeeResponse";

const employeeResponse: EmployeeResponse = {
    employeeId: 1,
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
        const data = [employeeResponse];

        mock.onGet(URL).reply(200, data);

        const results = await getAllEmployees();

        expect(results[0]).to.deep.equal(employeeResponse);
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
    })

      /*
      Mocking Exercise 1

      Write a unit test for the getSingleEmployee method

      When axios returns with a 500 error

      Expect a "Failed to get employee" error to be returned

      This should fail, make code changes to make this test pass
      */
    describe('getSingleEmployee', function () {
      
      it('should throw exception when 500 error returned from axios', async () => {
        mock.onGet(URL + '1').reply(500);
        try {
          await getSingleEmployee('1');
        } catch (e) {
          expect(e.message).to.equal('Failed to get employee');
          return;
        }
      })
    
      /*
      Mocking Exercise 2

      Write a unit test for the getSingleEmployee method

      When axios returns an employee

      Expect the employee to be returned

      This should pass without code changes
      */
      it('should return employee from response', async () => {
        mock.onGet(URL + '1').reply(200, employeeResponse);
        const returnData = await getSingleEmployee('1');
        expect(returnData).to.deep.equals(employeeResponse);
      })

      /*
      Mocking Exercise 3

      Write a unit test for the getSingleEmployee method

      When the id parameter is null

      Expect an "Invalid ID" error to be returned and axios not invoked

      This should fail, make code changes to make this test pass
      */
      it('should return "Invalid ID" from response', async () => {
          try {
            await getSingleEmployee('');
          } catch (e) {
            expect(e.message).to.equal('Invalid ID');
            return;
          }
      })

      /*
      Mocking Exercise 4

      Write a unit test for the getSingleEmployee method

      When axios returns with a 400 error

      Expect a "Employee does not exist" error to be returned

      This should fail, make code changes to make this test pass
      */
      it('should return "Employee does not exist" from response', async () => {
        mock.onGet(URL + '5').reply(400);
        try {
          await getSingleEmployee('5');
        } catch(e) {
          expect(e.message).to.equal('Employee does not exist');
        }
      })
    })

    describe('createEmployee', function () {
      /*
      Mocking Exercise 5

      Write a unit test for the createEmployee method

      When the axios returns an id

      Expect the id to be returned

      This should pass without code changes
      */
      it('should return id from response', async () => {
        const employeeReq: EmployeeRequest = {
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
          nin: "AB123456C"
        }
        const id: number = 1;
        mock.onPost(URL, employeeReq).reply(200, id);
        const returnData = await createEmployee(employeeReq);
        expect(returnData).equals(id);
      })
      /*
      Mocking Exercise 6

      Write a unit test for the createEmployee method

      When axios returns with a 400 error

      Expect a "Invalid data" error to be returned

      This should fail, make code changes to make this test pass
      */
      it('should return "Invalid Data" when axios returns 400', async () => {
        const employeeReq: EmployeeRequest = {
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
          nin: "AB123456C"
        }
        const id: number = 1;
        mock.onPost(URL, employeeReq).reply(400, id);
        try {
          const returnData = await createEmployee(employeeReq);  
        } catch(e) {
          expect(e.message).to.equal("Invalid Data");
        }  
      })
      /*
      Mocking Exercise 7

      Write a unit test for the createEmployee method

      When axios returns with a 500 error

      Expect a "Could not create employee" error to be returned

      This should fail, make code changes to make this test pass
      */
      it('should return "Could not create employee" when axios returns 500', async () => {
        const employeeReq: EmployeeRequest = {
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
          nin: "AB123456C"
        }
        const id: number = 1;
        mock.onPost(URL, employeeReq).reply(500, id);
        try {
          const returnData = await createEmployee(employeeReq);  
        } catch(e) {
          expect(e.message).to.equal("Could not create employee");
        }  
      })
    })
  })
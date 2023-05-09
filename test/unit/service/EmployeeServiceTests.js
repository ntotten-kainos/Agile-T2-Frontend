var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;
const EmployeeService = require('../../../app/service/EmployeeService');
const employee = {
    salary: "30000",
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

describe('EmployeeService', function () {
    describe('getEmployees', function () {
      it('should return employees from response', async () => {
        var mock = new MockAdapter(axios);

        const data = [employee];

        mock.onGet(EmployeeService.URL).reply(200, data);

        var results = await EmployeeService.getEmployees();

        expect(results[0]).to.deep.equal(employee)
      })

      it('should throw exception when 500 error returned from axios', async () => {
        var mock = new MockAdapter(axios);

        mock.onGet(EmployeeService.URL).reply(500);

        var error = await EmployeeService.getEmployees()
        
        expect(error.message).to.equal('Could not get employees')
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

    Expect the dao not to be called

    This should fail, make code changes to make this test pass
     */

    /*
    Mocking Exercise 4

    Write a unit test for the getEmployee method

    When axios returns with a 400 error

    Expect a "User does not exist" error to be returned

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
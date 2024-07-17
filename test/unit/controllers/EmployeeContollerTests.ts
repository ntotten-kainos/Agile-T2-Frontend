import { postEmployeeForm } from './../../../src/controllers/EmployeeController';
import * as EmployeeController from "../../../src/controllers/EmployeeController";
import * as EmployeeService from "../../../src/services/EmployeeService";
import { expect } from 'chai';
import { EmployeeResponse } from "../../../src/models/EmployeeResponse";
import sinon from 'sinon';

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

describe('EmployeeContoller', function () {
    afterEach(() => {
        sinon.restore();
    });

    describe('getEmployees', function () {
      it('should render view with employees when employees returned', async () => {
        const employeeList = [employeeResponse];

        sinon.stub(EmployeeService, 'getAllEmployees').resolves(employeeList);

        const req = { };
        const res = { render: sinon.spy() };

        await EmployeeController.getEmployees(req as any, res as any);

        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('list-employees', { employees: employeeList })).to.be.true;
      });

      it('should render view with error message when error thrown', async () => {
        const errorMessage: string = 'Error message';
        sinon.stub(EmployeeService, 'getAllEmployees').rejects(new Error(errorMessage));

        const req = { };
        const res = { render: sinon.spy(), locals: { errormessage: '' } };

        await EmployeeController.getEmployees(req as any, res as any);

        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('list-employees')).to.be.true;
        expect(res.locals.errormessage).to.equal(errorMessage);
      });
    });

    describe('getEmployee', function () {

      /*
      Additional Exercise 1

      Write a unit test for the getEmployee method

      When service returns employee

      Expect a employee view to be rendered with employee object

      This should pass without code changes
      */
      it('should render view with the employee object returned', async () => {
        sinon.stub(EmployeeService, 'getSingleEmployee').resolves(employeeResponse);
        const req = { params:{id:'1'} };  // As this is used in getEmployee method for req.params.id, we need to assign this to something or it falls over!
        const res = { render: sinon.spy() };

        await EmployeeController.getEmployee(req as any, res as any);

        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('list-employee', { employee: employeeResponse })).to.be.true;
      });

      /*
      Additional Exercise 2

      Write a unit test for the getEmployee method

      When service returns error

      Expect a employee view to be rendered with error message

      This should pass without code changes
      */
      it('should render view with the employee object returned', async () => {
        // Create our error message
        const errorMessage: string = "Error Message";
        // Have the service reject the request and throw our error
        sinon.stub(EmployeeService, 'getSingleEmployee').rejects(new Error(errorMessage));

        const req = { params: { id: '1' } };
        // Ensure 'locals' object here has an errormessage object in its JSON that is NOT NULL or Undefined.
        const res = { render: sinon.spy(), locals: { errormessage: '' } };

        await EmployeeController.getEmployee(req as any, res as any);

        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('list-employee')).to.be.true;
        console.log(res.locals.errormessage);
        expect(res.locals.errormessage).to.equal(errorMessage);
      });
    });

    describe('getEmployeeForm', function () {
      /*
      Additional Exercise 6

      Write a unit test for the getEmployeeForm method

      Expect a employee form view to be rendered

      This should pass without code changes
      */
      it('should render employee form when requested', async () => {

        const req = {  };  
        const res = { render: sinon.spy(), locals: { errormessage: '' } };

        await EmployeeController.getEmployeeForm(req as any, res as any);

        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('employee-form')).to.be.true;
      });
    });

    describe('postEmployee', function () {

      /*
      Additional Exercise 3

      Write a unit test for the postEmployeeForm method

      When service returns id

      Expect a redirect to employee/:id url

      This should pass without code changes
      */
      it('Should redirect to employee/:id for successfully created employee', async () => {
        const empID: number = employeeResponse.employeeId;
        // When service returns employee ID
        sinon.stub(EmployeeService, 'createEmployee').resolves(empID);

        const req = {  };
        // Need to mock/spy anything that might be called such as redirect in this case!
        const res = { redirect: sinon.spy(), render: sinon.spy(), locals: { errormessage: '' } };

        // Call postEmployeeForm
        await EmployeeController.postEmployeeForm(req as any, res as any);

        // Then expect to be redirected to employee/:id
        expect(res.redirect.calledWith('/employees/' + empID)).to.be.true;  // Then we can check that our mocked redirect (in place of the real one) is called with the path we want to test!
      });

      /*
      Additional Exercise 4

      Write a unit test for the postEmployeeForm method

      When service returns error

      Expect a employee form view to be rendered with error message

      This should pass without code changes
      */
      it('Should render employee form with appropriate error', async () => {
        const errorMessage: string = "Error Message"
        // When service returns error
        sinon.stub(EmployeeService, 'createEmployee').rejects(new Error(errorMessage));


        const req = {  };
        const res = { render: sinon.spy(), locals: { errormessage: '' } };

        // Call postEmployeeForm
        await EmployeeController.postEmployeeForm(req as any, res as any);

        // Then expect to be redirected to employee/:id
        expect(res.render.calledWith('employee-form')).to.be.true;  
        expect(res.locals.errormessage).to.equal(errorMessage);
      });
    });
    
    describe('getIndex', function () {

      /*
      Additional Exercise 5

      Write a unit test for the getIndex method

      Expect a employee home view to be rendered

      This should pass without code changes
      */
      it('Should render employee-home', async () => {
        const req = {  };
        const res = { render: sinon.spy(), locals: { errormessage: '' } };
        await EmployeeController.getIndex(req as any, res as any);
        expect(res.render.calledWith('employee-home')).to.be.true;
      })
    });
});
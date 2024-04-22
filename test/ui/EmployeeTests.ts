/* eslint-env mocha */
/* global browser */
import webdriver from 'selenium-webdriver';

import { expect } from 'chai';

describe('Employee test', async () => {
    it('Should create new employee', async () => {
        const driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

        const url: string = process.env.UI_TEST_URL || 'http://localhost:8080/'
        await driver.get(url);

        await driver.findElement(webdriver.By.id('add-employee-button')).click();

        await driver.findElement(webdriver.By.id('fname')).sendKeys('UI');
        await driver.findElement(webdriver.By.id('lname')).sendKeys('Tests');
        await driver.findElement(webdriver.By.id('email')).sendKeys('testemail@email.com');
        await driver.findElement(webdriver.By.id('address')).sendKeys('1 Home Street');
        await driver.findElement(webdriver.By.id('address2')).sendKeys('Home Lane');
        await driver.findElement(webdriver.By.id('city')).sendKeys('Belfast');
        await driver.findElement(webdriver.By.id('county')).sendKeys('Antrim');
        await driver.findElement(webdriver.By.id('postalCode')).sendKeys('BT9');
        await driver.findElement(webdriver.By.id('country')).sendKeys('Norn Iron');
        await driver.findElement(webdriver.By.id('phoneNo')).sendKeys('01234567890');
        await driver.findElement(webdriver.By.id('bankNo')).sendKeys('12345678');
        await driver.findElement(webdriver.By.id('nin')).sendKeys('AA1A11AA');
        await driver.findElement(webdriver.By.id('salary')).sendKeys('30000');
        await driver.findElement(webdriver.By.id('submit')).click();
   
        const name = await driver.findElement(webdriver.By.id('name')).getText();

        await driver.quit();

        expect(name).to.equal('UI Tests');        
    });
    /*
    UI Test Exercise 1

    Write an UI test for the add employee flow

    Try to create an employee with a salary of £10,000

    Expect 'Salary must be at least £20,000' error to be displayed

    This should pass without code changes
    */

    /*
    UI Test Exercise 2

    Write an UI test for the add employee flow

    Try to create an employee with a salary of ABC

    Expect 'Salary must be a number' error to be displayed

    This should pass without code changes
    */

    /*
    UI Test Exercise 3

    Write an UI test for view employee workflow

    Navigate from the homepage to the employee list

    Select view on an employee

    Expect the name on the view employee page to match the name from the link you've clicked
    */

    /*
    UI Test Exercise 4

    Write an UI test for view employee workflow

    Navigate directly to the view employee page with an invalid ID

    Expect 'Employee does not exist' error to be displayed
    */

  })
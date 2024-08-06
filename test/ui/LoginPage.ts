import { By, WebDriver, WebElement } from 'selenium-webdriver';
import BasePage from './BasePage';


export class LoginPage extends BasePage{
  
private baseUrl: string = process.env.UI_TEST_URL || 'https://5chmbvngab.eu-west-1.awsapprunner.com';
private urlPath: string = '/loginForm';
private url: string = this.baseUrl+this.urlPath;
  
  constructor() {
   super();
   this.url;
  }

  async open() {
    await super.open(this.url);
  }
  async email() {
    return await this.findElementById('email');
  }

  async password() {
    return await this.findElementById('password');
  }

  async submit() {
    return await this.findElementById('submit');
  }

  async clickSubmit() {
    await this.clickById('submit');
  }

  async logout() {
    return await this.findElementById('logout-button');
  }

  async clickLogout() {
    await this.clickById('logout-button');
  }
}
 
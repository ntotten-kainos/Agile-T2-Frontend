import { By } from "selenium-webdriver";
import BasePage from "./BasePage";

interface JobRole {
  roleName: string;
  location: string;
  band: string;
  capability: string;
  closingDate: string;
}

export class JobRolesPage extends BasePage{

  //private url: string = 'https://5chmbvngab.eu-west-1.awsapprunner.com/job-roles';
  private url: string = "http://localhost:3000/job-roles";

  constructor() {
    super();
    this.url;
  }

  //makes a call to the basepage
  async open() {
    await super.open(this.url);
  }

  async waitForTable() {
    await this.waitForElementById("table", 10000)
  }

  async getHeaderRow() {
    return this.driver.findElement(By.css("table tr"));
  }

  async getJobRoles(): Promise<JobRole[]> {
    this.waitForTable;

    const rows = await this.driver.findElements(By.css("table tr"));
    const jobRoles: JobRole[] = [];

    for (let i = 1; i < rows.length; i++) {
      const cols = await rows[i].findElements(By.css("td"));
      const role: JobRole = {
        roleName: await cols[0].getText(),
        location: await cols[1].getText(),
        band: await cols[2].getText(),
        capability: await cols[3].getText(),
        closingDate: await cols[4].getText(),
      };
      jobRoles.push(role);
    }

    return jobRoles;
  }

  async getInstagramButton() {
    return await this.findElementById("instagramlinkbutton");
  }

  async clickInstagramButton() {
    await this.clickById('instagramlinkbutton');
  }

  async getFacebookButton() {
    return await this.findElementById("facebooklinkbutton");
  }

  async clickFacebookButton() {
    await this.clickById('facebooklinkbutton');
  }

}

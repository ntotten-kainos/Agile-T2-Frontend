import { By } from "selenium-webdriver";
import BasePage from "./BasePage";

interface JobRole {
  roleName: string;
  location: string;
  band: string;
  capability: string;
  closingDate: string;
}

export class JobRolesPage extends BasePage {
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
    await this.waitForElementById("table", 10000);
  }

  async getHeaderRow() {
    return this.findElementById("table-header");
  }

  async getJobRoles() {
    await this.waitForTable();

    // Find the table body element by ID
    const tableBody = await this.findElementById("table-body");

    const tableRows = await tableBody.findElements(By.id("table-rows"));

    const jobRoles: JobRole[] = [];

    for (const row of tableRows) {
      const roleName = await (await row.findElement(By.id("row-name"))).getText();
      const location = await (await row.findElement(By.id("row-location"))).getText();
      const band = await (await row.findElement(By.id("row-band"))).getText();
      const capability = await (await row.findElement(By.id("row-capability"))).getText();
      const closingDate = await (await row.findElement(By.id("row-closingdate"))).getText();

      const role: JobRole = {
        roleName,
        location,
        band,
        capability,
        closingDate,
      };
      jobRoles.push(role);
    }

    return jobRoles;
  }
  

}

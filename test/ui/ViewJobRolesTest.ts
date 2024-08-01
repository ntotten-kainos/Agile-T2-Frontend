import { expect } from "chai";
import { JobRolesPage } from "./ViewJobRolesPage";
import { urlContains } from "selenium-webdriver/lib/until";
import { By } from "selenium-webdriver";

describe("Job Roles Page Tests", () => {
  let jobRolesPage: JobRolesPage;

  // These are specifically related to the tests, so I think these are better
  // suited to remain in the test class, rather than going in the page class
  const validLocations = ["BELFAST", "DERRY", "TORONTO"];

  // This is the date regex (for checking format)
  const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

  // Before the test runs, only called at the start of the test
  before(async () => {
    jobRolesPage = new JobRolesPage();
    await jobRolesPage.open();
  });

  // Closing the driver, this is calling the method from the BasePage class,
  // close method not required in the jobRolesPage class
  after(async () => {
    await jobRolesPage.closeBrowser;
  });

  // Tests
  it("should display a table with the correct headings", async () => {
    await jobRolesPage.waitForTable();

    const headerRow = await jobRolesPage.getHeaderRow();
    const headers = await headerRow.findElements(By.css("th"));
    const headerTexts = await Promise.all(
      headers.map((header) => header.getText())
    );

    //This can be expanded/adapted to check the information returned from JobRoleInformationById
    const expectedHeaders = [
      "Job Role",
      "Location",
      "Band",
      "Capability",
      "Closing Date",
    ];

    expect(headerTexts).to.deep.equal(
      expectedHeaders,
      "Table headers do not match expected headers"
    );
  });

  it("should have non-empty data fields for each job role", async () => {
    await jobRolesPage.waitForTable();
    const actualJobRoles = await jobRolesPage.getJobRoles();

    actualJobRoles.forEach((role) => {
      expect(role.roleName).to.not.be.empty;
      expect(role.location).to.not.be.empty;
      expect(role.band).to.not.be.empty;
      expect(role.capability).to.not.be.empty;
      expect(role.closingDate).to.not.be.empty;
    });
  });

  it("should display the correct location and date format", async () => {
    await jobRolesPage.waitForTable();
    const actualJobRoles = await jobRolesPage.getJobRoles();

    actualJobRoles.forEach((role, index) => {
      expect(role.location).to.be.oneOf(
        validLocations,
        `Invalid location for role index ${index}`
      );
      expect(role.closingDate).to.match(
        dateRegex,
        `Invalid date format for role index ${index}`
      );
    });
  });

  // Tests to check the footer buttons on the job-roles page
  it("should bring the user to the Instagram page", async () => {
    await jobRolesPage.clickInstagramButton();

    await jobRolesPage.driver.wait(urlContains("instagram"), 10000);

    const currentUrl = await jobRolesPage.driver.getCurrentUrl();
    //console.log(currentUrl);
    expect(currentUrl).to.include("instagram");
    await jobRolesPage.driver.navigate().back();
  });

  it("should bring the user to the Facebook page", async () => {
    await jobRolesPage.clickFacebookButton();

    await jobRolesPage.driver.wait(urlContains("facebook"), 10000);

    const currentUrl = await jobRolesPage.driver.getCurrentUrl();
    //console.log(currentUrl);
    expect(currentUrl).to.include("facebook");
    await jobRolesPage.driver.navigate().back();
  });
});

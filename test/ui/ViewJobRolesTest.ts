import { expect } from "chai";
import { JobRolesPage } from "./ViewJobRolesPage";
import { urlContains } from "selenium-webdriver/lib/until";
import { By } from "selenium-webdriver";

describe("Job Roles Page Tests", () => {
  let jobRolesPage: JobRolesPage;

  //These are specifically for the tests, so I think these are better suited to remain in the test class, rather than going in the page class
  const validLocations = [
    "BELFAST", 
    "DERRY", 
    "LONDON"
  ]; // This can be adatped as reuired
  const validRoleNames = [
    "Software Engineer",
    "Data Scientist",
    "Cyber Security Analyst",
  ]; // This can be adapted as reuired

  const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/; //this should remain as is, this is the date regex

  //before the test runs
  //probably need to remove the driver from this and include it in a new base class
  before(async () => {
    jobRolesPage = new JobRolesPage();
    await jobRolesPage.open();
  });

  // Closing the driver, this is calling the method from the jobRolesPage class
  after(async () => {
    await jobRolesPage.closeBrowser;
  });

  it("should display a table with the correct headings", async () => {
    await jobRolesPage.waitForTable();

    const headerRow = await jobRolesPage.getHeaderRow();
    const headers = await headerRow.findElements(By.css("th"));
    const headerTexts = await Promise.all(
      headers.map((header) => header.getText())
    );
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

  it("should display the correct job roles information", async () => {
    await jobRolesPage.waitForTable();
    const actualJobRoles = await jobRolesPage.getJobRoles();

    actualJobRoles.forEach((role, index) => {
      expect(role.location).to.be.oneOf(
        validLocations,
        `Invalid location for role index ${index}`
      );
      expect(role.roleName).to.be.oneOf(
        validRoleNames,
        `Invalid role name for role index ${index}`
      );
      expect(role.closingDate).to.match(
        dateRegex,
        `Invalid date format for role index ${index}`
      );
    });
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

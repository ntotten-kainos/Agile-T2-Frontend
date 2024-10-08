import { expect } from "chai";
import { LoginPage } from "./LoginPage";

describe("LoginPage Tests", () => {
  let loginPage: LoginPage;

  before(async () => {
    loginPage = new LoginPage();
    await loginPage.open();
  });

  after(async () => {
    await loginPage.closeBrowser();
  });

  let adminValidEmail: string = "valid.admin@email.com";
  let adminValidPassword: string = "admin!Pa$$word123";
  let applicantValidEmail: string = "regular.user@email.com";
  let applicantValidPassword: string = "regularU$er123";
  let invalidEmail: string = "invalid@gmail.com";
  let invalidPassword: string = "123";

  it("should find the email input field", async () => {
    const emailField = await loginPage.email();
    expect(emailField).to.not.be.null;
    expect(await emailField.getAttribute("name")).to.equal("email");
  });

  it("should find the password input field", async () => {
    const passwordField = await loginPage.password();
    expect(passwordField).to.not.be.null;
    expect(await passwordField.getAttribute("id")).to.equal("password");
  });

  it("should find the submit button", async () => {
    const submitButton = await loginPage.submit();
    expect(submitButton).to.not.be.null;
    expect(await submitButton.getAttribute("class")).to.include("login-button");
  });

  it("should display error message when wrong email and password entered", async () => {
    await loginPage.enterTextById("email", invalidEmail);
    await loginPage.enterTextById("password", invalidPassword);
    await loginPage.clickSubmit();

    const errorMessage = await loginPage.findElementById("error-message");
    expect(await errorMessage.getText()).to.include(
      "Invalid email or password - hover over input field for more info!"
    );
  });

  it("should display error message when wrong email and valid password entered", async () => {
    await loginPage.enterTextById("email", invalidEmail);
    await loginPage.enterTextById("password", adminValidPassword);
    await loginPage.clickSubmit();

    const errorMessage = await loginPage.findElementById("error-message");
    expect(await errorMessage.getText()).to.include(
      "Login Request: Invalid Login Credentials!"
    );
  });

  it("should display error message when no email or password entered", async () => {
    await loginPage.enterTextById("email", "");
    await loginPage.enterTextById("password", "");
    await loginPage.clickSubmit();

    const errorMessage = await loginPage.findElementById("error-message");
    expect(await errorMessage.getText()).to.include(
      "Please enter email and password"
    );
  });

  it("should display error message if password invalid", async () => {
    await loginPage.enterTextById("email", adminValidEmail);
    await loginPage.enterTextById("password", invalidPassword);
    await loginPage.clickSubmit();

    const errorMessage = await loginPage.findElementById("error-message");
    expect(await errorMessage.getText()).to.include(
      "Invalid email or password - hover over input field for more info!"
    );
  });

  it("admin user should enter email and password, then click submit", async () => {
    await loginPage.enterTextById("email", adminValidEmail);
    await loginPage.enterTextById("password", adminValidPassword);
    await loginPage.clickSubmit();
    await loginPage.clickById("viewjobsbutton");
    const currentUrl = await loginPage.driver.getCurrentUrl();

    expect(currentUrl).to.include("job-roles");
    await loginPage.driver.navigate().back();
  });

  it("should click logout and log the user out", async () => {
    await loginPage.clickLogout();

    const loginButton = await loginPage.findElementById("loginbutton");
    const loginButtonText = await loginButton.getText();
    expect(loginButtonText).to.equal("Log In");
  });

  it("applicant user should enter email and password, then click submit", async () => {
    await loginPage.enterTextById("email", applicantValidEmail);
    await loginPage.enterTextById("password", applicantValidPassword);
    await loginPage.clickSubmit();
    await loginPage.clickById("viewjobsbutton");
    const currentUrl = await loginPage.driver.getCurrentUrl();

    expect(currentUrl).to.include("job-roles");
    await loginPage.driver.navigate().back();
  });
});

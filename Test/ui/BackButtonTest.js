const { Builder, By, until } = require("selenium-webdriver");
const chai = require("chai");

const webdriver = require("selenium-webdriver");

describe("BackButtonTest", () => {
  it("should click into employee and then back to the index", async () => {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
      await driver.get("http://localhost:3000/");
      await driver.findElement(By.linkText("Employee")).click();
      const backButton = await driver.findElement(By.className('btn-back'));
      await backButton.click();

      chai.assert.equal(await driver.getCurrentUrl(), "http://localhost:3000/");
    } finally {
      await driver.quit();
    }
  });

  it("should click into job role and then back to the job list", async () => {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
      await driver.get("http://localhost:3000/job-roles");
      await driver.findElement(By.linkText("Employee")).click();
      const backButton = await driver.findElement(By.className('btn-back'));
      await backButton.click();

      chai.assert.equal(await driver.getCurrentUrl(), "http://localhost:3000/");
    } finally {
      await driver.quit();
    }
  });
});

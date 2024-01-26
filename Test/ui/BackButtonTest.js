const { Builder, By, until } = require("selenium-webdriver");
const chai = require("chai");

const webdriver = require("selenium-webdriver");

describe("BreadCrumbTest", () => {
  it("should click into employee and then back to the index", async () => {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
      await driver.get("http://localhost:3000/");
      await driver.findElement(By.linkText("Employee")).click();
      await driver.findElement(By.id("breadcrumb-home")).click();

      chai.assert.equal(await driver.getCurrentUrl(), "http://localhost:3000/");
    } finally {
      await driver.quit();
    }
  });
});

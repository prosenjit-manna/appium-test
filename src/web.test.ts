import { remote } from "webdriverio";

// Set Jest timeout for this file (instead of using this.timeout)
jest.setTimeout(30000);

describe("Google Homepage", function () {
  let driver: WebdriverIO.Browser;

  beforeAll(async function () {
    driver = await remote({
      capabilities: {
        browserName: "chrome",
      },
      logLevel: "error",
    });
  });

  it("should display Google search elements", async function () {
    // Navigate to Google
    await driver.url("https://www.google.com");

    // Find and verify search input using standard web locator
    const searchInput = await driver.$('textarea[name="q"]');
    await searchInput.waitForExist();
    await searchInput.setValue("webdriverio");
    // wait for certain time
    await driver.pause(10000);
  });

  afterAll(async function () {
    if (driver) {
      await driver.deleteSession();
    }
  });
});

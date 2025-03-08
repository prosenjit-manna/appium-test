import { App } from './app';
import { closeIOSSimulators } from './utils/closeSimulators';
import { Capabilities } from '@wdio/types';

const iOSVersion = '17.4';

const capabilities: Capabilities.WebdriverIOConfig['capabilities'] = {
  platformName: 'iOS',
  'appium:platformVersion': iOSVersion,
  'appium:deviceName': 'iPhone 15 Pro Max',
  'appium:automationName': 'XCUITest',
  'appium:app': 'com.apple.Preferences',
  // 'appium:app': process.cwd() + '/app/neststartertemplateapp.app',
  'appium:locale': 'US',
  'appium:language': 'en',
  'appium:udid': 'auto',
  'appium:noReset': true,
};

// Set Jest timeout for all tests in this file to 60 seconds
jest.setTimeout(60000);

describe('Healthcheck iOS Appium connection', function () {
  let app: App;

  beforeAll(async () => {
    app = new App();
    await app.init(capabilities);
  });

  afterAll(async () => {
    await app.quit();
    // Close iOS simulators after tests complete
    await closeIOSSimulators();
  });

  it('checks iOS version number on Settings App', async () => {
    // Go the the "General" section
    const generalElement = await app.findElement('//XCUIElementTypeCell[@name="General"]');
    await generalElement.click();

    // Go the the "About" section
    const aboutElement = await app.findElement('//XCUIElementTypeCell[@name="About"]');
    await aboutElement.click();

    // Go the the "iOS Version" section
    const versionElement = await app.findElement('//XCUIElementTypeCell[@name="iOS Version"]');
    await versionElement.click();

    // Check the version is the on expected
    const iosVersionElement = await app.findElement(`//XCUIElementTypeButton[contains(@name, "iOS ${iOSVersion}")]`);
    const isDisplayed = await iosVersionElement.isDisplayed();

    if (!isDisplayed) {
      throw new Error(`Could not find iOS version label ${iOSVersion} on the device`);
    }
  })
});
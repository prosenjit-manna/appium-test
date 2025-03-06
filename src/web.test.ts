import { expect } from 'chai';
import { remote } from 'webdriverio';

describe('Google Homepage', function() {
    let driver: WebdriverIO.Browser;

    // Increase timeout for this suite since we're dealing with real browser interactions
    this.timeout(30000);

    const iOSVersion = '17.4';

    before(async function() {
        driver = await remote({
            protocol: 'http',
            hostname: '127.0.0.1',
            port: 4723,
            path: '/',
            capabilities: {
                platformName: 'iOS',
                'appium:automationName': 'XCUITest',
                'appium:browserName': 'Safari',
                'appium:deviceName': 'iPhone 15 Pro Max',
                'appium:platformVersion': iOSVersion
            },
            logLevel: 'error'
        });
    });

    it('should display Google search elements', async function() {
        // Navigate to Google
        await driver.url('https://www.google.com');

        

        // Find and verify search input
        const searchInput = await driver.findElement('xpath', '//XCUIElementTypeButton[@name="Google Search"]');


    });

    after(async function() {
        if (driver) {
            await driver.deleteSession();
        }
    });
});
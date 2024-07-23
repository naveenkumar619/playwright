import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    workers: 1,
    timeout: 30000, // Set the timeout to 30 seconds (30000 milliseconds)

};

export default config;


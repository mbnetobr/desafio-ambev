const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://front.serverest.dev",
    env: {
      apiUrl: "https://serverest.dev",
    },
    specPattern: "cypress/e2e/features/**/*.feature",
    async setupNodeEvents(on, config) {
      // 1. Registro correto da função do Cucumber
      await preprocessor.addCucumberPreprocessorPlugin(on, config);

      // 2. Bundler com a propriedade .default(config)
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );

      // 3. Tratamento para estabilizar o Firefox no ambiente Headless do CI
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'firefox' && browser.isHeadless) {
          launchOptions.args.push('--headless');
        }
        return launchOptions;
      });

      // 4. Relatório Mochawesome
      require("cypress-mochawesome-reporter/plugin")(on);

      return config;
    },
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      reporterEnabled: "cypress-mochawesome-reporter, mocha-junit-reporter",
      cypressMochawesomeReporterReporterOptions: {
        reportDir: "cypress/reports",
        overwrite: false,
        html: true,
        json: true,
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
        charts: true,
        reportPageTitle: 'ServeRest E2E Quality Report',
      },
      mochaJunitReporterReporterOptions: {
        mochaFile: "cypress/results/junit/results-[hash].xml",
        toConsole: false,
      },
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
  },
});
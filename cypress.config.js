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

      // 3. Relatório Mochawesome
      require("cypress-mochawesome-reporter/plugin")(on);

      return config;
    },
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
  },
});
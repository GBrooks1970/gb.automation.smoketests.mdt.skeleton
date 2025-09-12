import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { GlobalTestData } from "cypress/support/screenplay/core/scenario_context";
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
const { polyfillNode } = require('esbuild-plugin-polyfill-node')
const { verifyDownloadTasks } = require('cy-verify-downloads');

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [polyfillNode({ polyfills: { crypto: true } }), createEsbuildPlugin(config)],
    }),
  );
  on('task', verifyDownloadTasks);

  // Initialize the global test data
  config.env.globalTestData = {
    Scenario_context: {},
    Topaz_Scenario_context: {}
  } as GlobalTestData;

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/my-test-output-[hash].xml',
    toConsole: true,
  },
  e2e: {
    specPattern:
      [
        "**/*.feature"
      ],
    setupNodeEvents
  },
});

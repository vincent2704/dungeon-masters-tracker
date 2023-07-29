import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: [
      "cypress/e2e/userCreation.cy.ts",
      "cypress/e2e/campaignManagement.cy.ts",
      "cypress/e2e/characterManagement.cy.ts",
      "cypress/e2e/resting.cy.ts",
      "cypress/e2e/manualCleanupUser.cy.ts",
    ]
  },
});

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: [
      "cypress/e2e/registration.cy.ts",
      "cypress/e2e/campaignManagement.cy.ts"
    ]
  },
});

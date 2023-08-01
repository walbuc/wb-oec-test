import {defineConfig} from 'cypress'

export default defineConfig({
  viewportHeight: 900,
  viewportWidth: 900,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})

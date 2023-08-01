// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '@testing-library/cypress/add-commands'
import './commands'
import {userBuilder} from './generate'

// Alternatively you can use CommonJS syntax:
// require('./commands')

export type User = {email: string; password: string}

declare global {
  namespace Cypress {
    interface Chainable {
      assertHome(): Chainable<Element>
      assertLoggedInAs(user: {
        email: string
        password: string
      }): Chainable<Element>
      login(user: User): Chainable<User>
      createUser(overrides?: User): Chainable<User>
      loginAsNewUser(): Chainable<User>
      //login(email: string, password: string): Chainable<void>
      //drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

Cypress.Commands.add('createUser', (overrides?: User) => {
  const user: User = userBuilder(overrides)
  return cy
    .request({
      url: 'http://localhost:3000/api/register',
      method: 'POST',
      body: user,
    })
    .then(() => user)
})

Cypress.Commands.add('login', user => {
  return cy
    .request({
      url: 'http://localhost:3000/api/signin',
      method: 'POST',
      body: user,
    })
    .then(() => user)
})

Cypress.Commands.add('loginAsNewUser', () => {
  return cy.createUser().then(user => {
    return cy.login(user)
  })
})

//asserts

Cypress.Commands.add('assertHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/home`)
})

Cypress.Commands.add('assertLoggedInAs', user => {
  cy.findByTestId('username-display').should('have.text', user.email)
})

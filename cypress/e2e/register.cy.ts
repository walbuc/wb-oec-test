import {userBuilder} from '../support/generate'

describe('registration', () => {
  it('should register a new user', () => {
    const user = userBuilder()
    cy.visit('/register')
    cy.findByLabelText(/email/i).type(user.email)
    cy.findByLabelText(/password/i).type(user.password)
    cy.findByText(/create an account/i).click()
    cy.assertHome()
  })
})

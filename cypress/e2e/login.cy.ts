describe('login flow', () => {
  it('should login an existing user', () => {
    cy.createUser().then(user => {
      cy.visit('/signin')
      cy.findByLabelText(/email/i).type(user.email)
      cy.findByLabelText(/password/i).type(user.password)
      cy.findByText(/log in/i).click()
      cy.assertHome()
    })
  })
})

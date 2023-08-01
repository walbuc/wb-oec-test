import {faker} from '@faker-js/faker'
import type {User} from './e2e'
const userBuilder = (overrides?: User) => {
  return {
    email: overrides
      ? overrides.email
      : `${faker.internet.userName()}@example.com`,
    password: overrides ? overrides.password : faker.internet.password(),
  }
}

export {userBuilder}

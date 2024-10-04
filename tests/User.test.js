const User = require('../src/User')

let user

// User tests here
describe('User property tests', () => {
  beforeEach(() => {
    user = new User('Joe Bloggs', 'test123', 21)
  })
  // test username
  test('username should be a string', () => {
    expect(typeof user.username).toBe('string')
  })
  // test password. Not sure what to test for password
  // test age
  test('age should be an integer', () => {
    expect(typeof user.age).toBe('number')
  })
  test('age is correct', () => {
    expect(user.age).toBe(21)
  })
})

describe('User methods test', () => {
  beforeEach(() => {
    user = new User('Joe Bloggs', 'test123', 21)
  })
  // test login
  test('user loggedIn status is set to true', () => {
    user.login('test123')
    expect(user.loggedIn).toBe(true)
  })

  test('should throw an error with incorrect password', () => {
    expect(() => {
      user.login('password')
    }).toThrow('Incorrect password, please try again')
    expect(user.loggedIn).toBe(false)
  })

  // test logout
  test('should successfully log out', () => {
    user.login('test123')
    expect(user.loggedIn).toBe(true)
    // now log out user
    user.logout()
    expect(user.loggedIn).toBe(false)
  })
})

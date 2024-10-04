const ScooterApp = require('../src/ScooterApp')
const User = require('../src/User')
const Scooter = require('../src/Scooter')

describe('ScooterApp class test', () => {
  let app

  beforeEach(() => {
    // Initialize a new ScooterApp instance before each test
    app = new ScooterApp()
  })

  test('should register a new user', () => {
    app.registerUser('Joe Bloggs', 'password123', 25)
    expect(app.registeredUsers['Joe Bloggs']).toBeInstanceOf(User)
    expect(app.registeredUsers['Joe Bloggs'].username).toBe('Joe Bloggs')
  })

  test('should not allow duplicate user registration', () => {
    app.registerUser('Joe Bloggs', 'password123', 25)
    expect(() => {
      app.registerUser('Joe Bloggs', 'password123', 25)
    }).toThrow('User already registered')
  })

  test('should not register a user younger than 18', () => {
    expect(() => {
      app.registerUser('young_user', 'password123', 17)
    }).toThrow('You are too young to register')
  })

  test('should login a registered user with correct password', () => {
    app.registerUser('Joe Bloggs', 'password123', 25)
    app.loginUser('Joe Bloggs', 'password123')
    expect(app.registeredUsers['Joe Bloggs'].loggedIn).toBe(true)
  })

  test('should throw error when logging in with incorrect password', () => {
    app.registerUser('Joe Bloggs', 'password123', 25)
    expect(() => {
      app.loginUser('Joe Bloggs', 'wrongPassword')
    }).toThrow('Incorrect password, please try again')
  })

  test('should logout a logged-in user', () => {
    app.registerUser('Joe Bloggs', 'password123', 25)
    app.loginUser('Joe Bloggs', 'password123')
    app.logoutUser('Joe Bloggs')
    expect(app.registeredUsers['Joe Bloggs'].loggedIn).toBe(false)
  })

  test('should create a new scooter at a valid station', () => {
    app.createScooter('station1')
    expect(app.stations['station1'].length).toBe(1)
    expect(app.stations['station1'][0]).toBeInstanceOf(Scooter)
  })

  test('should throw error when trying to create a scooter at an invalid station', () => {
    expect(() => {
      app.createScooter('invalid_station')
    }).toThrow('No such station, please enter a valid station name')
  })

  test('should dock a scooter at a valid station', () => {
    const scooter = new Scooter('station1', null, 100)
    app.dockScooter(scooter, 'station1')
    expect(app.stations['station1']).toContain(scooter)
  })

  test('should throw error when docking a scooter at an invalid station', () => {
    const scooter = new Scooter('station1', null, 100)
    expect(() => {
      app.dockScooter(scooter, 'invalid_station')
    }).toThrow('No such station exist')
  })

  test('should rent a scooter to a user', () => {
    const scooter = new Scooter('station1', null, 100, false)
    app.stations['station1'].push(scooter)
    const user = new User('Joe Bloggs', 'password123', 25)
    app.rentScooter(scooter, user)
    expect(scooter.user).toBe(user)
    expect(app.stations['station1']).not.toContain(scooter)
  })

  test('should throw error when renting a scooter already rented', () => {
    const scooter = new Scooter('station1', 'someUser', 100, false)
    expect(() => {
      app.rentScooter(scooter, new User('Joe Bloggs', 'password123', 25))
    }).toThrow('This scooter is already rented')
  })

  test('should print the registered users and station scooters', () => {
    console.log = jest.fn() // Mock console.log

    app.registerUser('Joe Bloggs', 'password123', 25)
    app.createScooter('station1')
    app.print()

    expect(console.log).toHaveBeenCalledWith(app.registeredUsers)
    expect(console.log).toHaveBeenCalledWith(app.stations)
  })
})

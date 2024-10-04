const Scooter = require('./Scooter')
const User = require('./User')

class ScooterApp {
  constructor (stations = { station1: [], station2: [], station3: [] }, registeredUsers = {}) { // Hard coded stations based on instruction, not good
    this.stations = stations
    this.registeredUsers = registeredUsers
  }

  registerUser (username, password, age) {
    if (!(username in this.registeredUsers) && age >= 18) {
      const newUser = new User(username, password, age)
      this.registeredUsers[username] = newUser
    } else if (username in this.registeredUsers) {
      throw new Error('User already registered')
    } else if (age < 18) {
      throw new Error('You are too young to register')
    }
  }

  loginUser (username, password) {
    if (username in this.registeredUsers) {
      const user = this.registeredUsers[username]
      try {
        user.login(password)
        console.log(`${username} logged in successfully.`)
      } catch (error) {
        console.error(error.message)
      }
    } else {
      throw new Error('User not found')
    }
  }

  logoutUser (username) {
    if (username in this.registeredUsers) {
      const user = this.registeredUsers[username]
      try {
        user.logout()
        console.log(`${username} is logged out`)
      } catch (error) {
        console.error(error.message)
      }
    } else {
      throw new Error('No such user is logged in')
    }
  }

  createScooter (station) {
    const newScooter = new Scooter(station, null, 100)
    if (station in this.stations) {
      this.stations[station].push(newScooter)
    } else {
      throw new Error('No such station, please enter a valid station name')
    }
  }

  dockScooter (scooter, station) {
    if (!(station in this.stations)) {
      throw new Error('No such station exist')
    } else if (this.stations[station].includes(scooter)) {
      throw new Error('This scooter is already docked at station')
    } else {
      this.stations[station].push(scooter)
      scooter.dock(station)
      console.log('The scooter is docked')
    }
  }

  rentScooter (scooter, user) {
    if (!(scooter.station in this.stations)) {
      throw new Error('No such station exists')
    }
    const scooterArray = this.stations[scooter.station]
    const index = scooterArray.indexOf(scooter)
    if (index !== -1) {
      scooterArray.splice(index, 1)
    }

    if (scooter.user !== null) {
      throw new Error('This scooter is already rented')
    } else {
      scooter.rent(user)
      console.log('This scooter is rented successfully')
    }
  }

  print () {
    console.log(this.registeredUsers)
    console.log(this.stations)
  }
}

module.exports = ScooterApp

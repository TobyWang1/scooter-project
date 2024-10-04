class User {
  #password

  constructor (username, password, age, loggedIn = false) {
    this.username = username
    this.#password = password
    this.age = age
    this.loggedIn = loggedIn
  }

  login (password) {
    if (password === this.#password) {
      this.loggedIn = true
    } else {
      throw new Error('Incorrect password, please try again')
    }
  }

  logout () {
    this.loggedIn = false
  }
}

module.exports = User

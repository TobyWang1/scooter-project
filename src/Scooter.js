class Scooter {
  static nextSerial = 1

  constructor (station, user, charge, isBroken = false) {
    this.station = station
    this.user = user
    this.serial = Scooter.nextSerial
    Scooter.nextSerial++
    this.charge = charge
    this.isBroken = isBroken
  }

  rent (user) {
    if (this.charge >= 20 && this.isBroken === false) {
      this.station = null
      this.user = user
    } else if (this.charge >= 20 && this.isBroken === true) {
      throw new Error('This scooter needs repair, please use another one')
    } else {
      throw new Error('This scooter needs to charge, please use another one')
    }
  }

  dock (station) {
    this.station = station
    this.user = null
  }

  async recharge () {
    console.log('Starting charge')

    await new Promise(resolve => setTimeout(resolve, 2000))
    this.charge = 100

    console.log('Charge complete')
  }
}

module.exports = Scooter

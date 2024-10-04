const Scooter = require('../src/Scooter')

let scooter

// typeof scooter === object
describe('scooter object', () => {
  test('Scooter class should create Scooter instance', () => {
    const scooter = new Scooter()
    expect(scooter).toBeInstanceOf(Scooter)
  })
})

// Method tests
describe('scooter methods', () => {
  // tests here!
  beforeEach(() => {
    scooter = new Scooter('station1', null, 100, false)
  })
  // rent method
  test('should rent a scooter when charge is >= 20 and is not broken', () => {
    scooter.rent('Joe Bloggs')
    expect(scooter.user).toBe('Joe Bloggs')
    expect(scooter.station).toBe(null)
  })

  test('should throw error when trying to rent a broken scooter', () => {
    scooter.isBroken = true
    expect(() => {
      scooter.rent('Joe Bloggs')
    }).toThrow('This scooter needs repair, please use another one')
  })

  test('should throw error when trying to rent a scooter with charge < 20', () => {
    scooter.charge = 10
    expect(() => {
      scooter.rent('Joe Bloggs')
    }).toThrow('This scooter needs to charge, please use another one')
  })

  // dock method
  test('should dock a scooter to a station and reset user', () => {
    scooter.rent('Joe Bloggs') // Rent first
    scooter.dock('station2')
    expect(scooter.station).toBe('station2')
    expect(scooter.user).toBe(null)
  })

  // requestRepair method

  // charge method
  test('should recharge the scooter to 100%', async () => {
    scooter.charge = 10
    await scooter.recharge()
    expect(scooter.charge).toBe(100)
  })
})

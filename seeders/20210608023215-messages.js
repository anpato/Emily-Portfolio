'use strict'
const faker = require('faker')
const uuid = require('uuid').v4
const { User } = require('../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await User.findOne({ raw: true })
    const unreads = [...Array(10)].map(() => ({
      id: uuid(),
      sender_name: faker.name.findName(),
      sender_email: faker.internet.email(),
      message: faker.lorem.paragraph(),
      unread: true,
      user_id: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    const read = [...Array(20)].map(() => ({
      id: uuid(),
      sender_name: faker.name.findName(),
      sender_email: faker.internet.email(),
      message: faker.lorem.paragraph(),
      unread: false,
      user_id: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('messages', [...unreads, ...read])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('messages')
  }
}

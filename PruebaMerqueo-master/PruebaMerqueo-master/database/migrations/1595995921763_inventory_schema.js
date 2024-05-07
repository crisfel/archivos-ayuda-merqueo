'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InventorySchema extends Schema {
  up () {
    this.create('inventories', (table) => {
      table.increments()
      table.integer('product_id')
      table.integer('quantity')
      table.date('date')
      table.timestamps()
    })
  }

  down () {
    this.drop('inventories')
  }
}

module.exports = InventorySchema

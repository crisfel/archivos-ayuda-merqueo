'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersProductsSchema extends Schema {
  up () {
    this.create('orders_products', (table) => {
      table.increments()
      table.integer('order_id')
      table.integer('product_id')
      table.integer('quantity')
      table.timestamps()
    })
  }

  down () {
    this.drop('orders_products')
  }
}

module.exports = OrdersProductsSchema

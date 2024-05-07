'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    provider(){
        return this.belongsTo('App/Models/Provider')
      }
    order () {
        return this.belongsTo('App/Models/Order')
      }
}

module.exports = Product

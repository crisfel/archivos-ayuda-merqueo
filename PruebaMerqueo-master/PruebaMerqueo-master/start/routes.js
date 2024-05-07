'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.post('/populate_inv','PopulateController.inventory')
Route.post('/populate_ord','PopulateController.orders')
Route.post('/populate_prov','PopulateController.providers')

Route.get('/ProductsFromInventory','ProductsFromInventoryController.index')
Route.get('/ProductsFromProviders','ProductsFromProvidersController.index')
Route.get('/WorstsSellers','SaleController.worst')
Route.get('/Listings','ListingController.index')
Route.get('/NewInventory','NewInventoryController.index')
Route.get('/BestsSellers','SaleController.best')
'use strict'

const { test } = use('Test/Suite')('Products From Inventory')
const axios = require('axios');

const one={
  "status": 200,
  "message": "Consultar qué productos y qué cantidad puede ser alistada desde el inventario",
  "data": [
      {
          "product_id": 1,
          "name": "Leche",
          "require": 1,
          "in_stock": 3,
          "available": true
      },
      {
          "product_id": 2,
          "name": "Huevos",
          "require": 21,
          "in_stock": 3,
          "available": false,
          "missing": 18
      },
      {
          "product_id": 3,
          "name": "Manzana Verde",
          "require": 10,
          "in_stock": 7,
          "available": false,
          "missing": 3
      },
      {
          "product_id": 4,
          "name": "Pepino Cohombro",
          "require": 7,
          "in_stock": 8,
          "available": true
      },
      {
          "product_id": 5,
          "name": "Pimentón Rojo",
          "require": 102,
          "in_stock": 10,
          "available": false,
          "missing": 92
      },
      {
          "product_id": 6,
          "name": "Kiwi",
          "require": 60,
          "in_stock": 15,
          "available": false,
          "missing": 45
      },
      {
          "product_id": 12,
          "name": "Aguacate Maduro",
          "require": 4,
          "in_stock": 8,
          "available": true
      },
      {
          "product_id": 13,
          "name": "Kale o Col Rizada",
          "require": 2,
          "in_stock": 2,
          "available": true
      },
      {
          "product_id": 14,
          "name": "Cebolla Cabezona Roja Limpia",
          "require": 4,
          "in_stock": 1,
          "available": false,
          "missing": 3
      },
      {
          "product_id": 15,
          "name": "Tomate Chonto Maduro",
          "require": 5,
          "in_stock": 1,
          "available": false,
          "missing": 4
      },
      {
          "product_id": 16,
          "name": "Acelga",
          "require": 1503,
          "in_stock": 9,
          "available": false,
          "missing": 1494
      },
      {
          "product_id": 22,
          "name": "Cebolla Larga Junca x 500grs",
          "require": 7,
          "in_stock": 6,
          "available": false,
          "missing": 1
      },
      {
          "product_id": 7,
          "name": "Cebolla Cabezona Blanca Limpia",
          "require": 6,
          "in_stock": 26,
          "available": true
      },
      {
          "product_id": 17,
          "name": "Espinaca Bogotana x 500grs",
          "require": 3,
          "in_stock": 17,
          "available": true
      },
      {
          "product_id": 18,
          "name": "Ahuyama",
          "require": 3,
          "in_stock": 8,
          "available": true
      },
      {
          "product_id": 19,
          "name": "Cebolla Cabezona Blanca Sin Pelar",
          "require": 8,
          "in_stock": 9,
          "available": true
      },
      {
          "product_id": 20,
          "name": "Melón",
          "require": 3,
          "in_stock": 9,
          "available": true
      },
      {
          "product_id": 21,
          "name": "Cebolla Cabezona Roja Sin Pelar",
          "require": 3,
          "in_stock": 3,
          "available": true
      },
      {
          "product_id": 23,
          "name": "Hierbabuena x 500grs",
          "require": 2,
          "in_stock": 9,
          "available": true
      },
      {
          "product_id": 24,
          "name": "Lechuga Crespa Verde",
          "require": 15,
          "in_stock": 9,
          "available": false,
          "missing": 6
      },
      {
          "product_id": 25,
          "name": "Limón Tahití",
          "require": 5,
          "in_stock": 10,
          "available": true
      },
      {
          "product_id": 31,
          "name": "Papa R-12 Mediana",
          "require": 25,
          "in_stock": 9,
          "available": false,
          "missing": 16
      },
      {
          "product_id": 8,
          "name": "Habichuela",
          "require": 3,
          "in_stock": 11,
          "available": true
      },
      {
          "product_id": 9,
          "name": "Mango Tommy Maduro",
          "require": 4,
          "in_stock": 1,
          "available": false,
          "missing": 3
      },
      {
          "product_id": 10,
          "name": "Tomate Chonto Pintón",
          "require": 8,
          "in_stock": 8,
          "available": true
      },
      {
          "product_id": 11,
          "name": "Zanahoria Grande",
          "require": 5,
          "in_stock": 7,
          "available": true
      },
      {
          "product_id": 30,
          "name": "Fresa Jugo",
          "require": 2,
          "in_stock": 1,
          "available": false,
          "missing": 1
      },
      {
          "product_id": 32,
          "name": "Curuba ",
          "require": 1,
          "in_stock": 10,
          "available": true
      },
      {
          "product_id": 33,
          "name": "Brócoli",
          "require": 1,
          "in_stock": 2,
          "available": true
      },
      {
          "product_id": 28,
          "name": "Tomate Larga Vida Maduro",
          "require": 3,
          "in_stock": 3,
          "available": true
      },
      {
          "product_id": 26,
          "name": "Mora de Castilla",
          "require": 2,
          "in_stock": 40,
          "available": true
      },
      {
          "product_id": 27,
          "name": "Pimentón Verde",
          "require": 1,
          "in_stock": 2,
          "available": true
      },
      {
          "product_id": 34,
          "name": "Aguacate Hass Pintón",
          "require": 3,
          "in_stock": 3,
          "available": true
      },
      {
          "product_id": 35,
          "name": "Aguacate Hass Maduro ",
          "require": 3,
          "in_stock": 3,
          "available": true
      },
      {
          "product_id": 36,
          "name": "Aguacate Pintón",
          "require": 1,
          "in_stock": 6,
          "available": true
      },
      {
          "product_id": 29,
          "name": "Cilantro x 500grs",
          "require": 1,
          "in_stock": 2,
          "available": true
      }
  ]
}
test('1. Products From Inventory', async ({ assert }) => {
  await axios.get('http://127.0.0.1:4000/ProductsFromInventory')
        .then(response => {
          assert.equal(JSON.stringify(response.data), JSON.stringify(one))
        })
        .catch(error => {
            console.log("error: "+error);
            assert.fail();
        });
  
}).timeout(0)



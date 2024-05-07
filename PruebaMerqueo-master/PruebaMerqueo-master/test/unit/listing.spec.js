'use strict'

const { test } = use('Test/Suite')('Listing')
const axios = require('axios');

const fourth={
  "status": 200,
  "message": "Dado el Id de un pedido, saber qué productos y qué cantidad pueden ser alistados según sistema de inventario y cuáles deben ser abastecidos por los proveedores.",
  "data": {
      "inventory": [
          {
              "product_id": 1,
              "name": "Leche",
              "quantity": 1
          },
          {
              "product_id": 2,
              "name": "Huevos",
              "quantity": 3
          },
          {
              "product_id": 3,
              "name": "Manzana Verde",
              "quantity": 7
          },
          {
              "product_id": 4,
              "name": "Pepino Cohombro",
              "quantity": 5
          }
      ],
      "providers": [
          {
              "product_id": 2,
              "name": "Huevos",
              "quantity": 18
          },
          {
              "product_id": 37,
              "name": "Pan Bimbo",
              "quantity": 7
          },
          {
              "product_id": 3,
              "name": "Manzana Verde",
              "quantity": 3
          }
      ]
  }
}

test('4. Listing Products', async ({ assert }) => {
  await axios.get('http://127.0.0.1:4000/Listings',{params:{Id:1}})
        .then(response => {
          assert.equal(JSON.stringify(response.data), JSON.stringify(fourth))
        })
        .catch(error => {
            console.log("error: "+error);
            assert.fail();
        });
  
}).timeout(0)

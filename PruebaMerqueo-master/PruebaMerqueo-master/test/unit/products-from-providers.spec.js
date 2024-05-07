'use strict'

const { test } = use('Test/Suite')('Products From Providers')
const axios = require('axios');

const two={
  "status": 200,
  "message": "Consultar los productos que deben ser alistados por proveedores y a qué proveedor le corresponde cada pedido.",
  "order_list": [
      {
          "id": 1,
          "data": [
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 2,
                  "product_name": "Huevos",
                  "quantity": 18
              },
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 3,
                  "product_name": "Manzana Verde",
                  "quantity": 3
              }
          ]
      },
      {
          "id": 2,
          "data": [
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 5,
                  "product_name": "Pimentón Rojo",
                  "quantity": 92
              },
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 6,
                  "product_name": "Kiwi",
                  "quantity": 45
              }
          ]
      },
      {
          "id": 4,
          "data": [
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 14,
                  "product_name": "Cebolla Cabezona Roja Limpia",
                  "quantity": 3
              },
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 15,
                  "product_name": "Tomate Chonto Maduro",
                  "quantity": 4
              }
          ]
      },
      {
          "id": 5,
          "data": [
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 16,
                  "product_name": "Acelga",
                  "quantity": 1494
              }
          ]
      },
      {
          "id": 9,
          "data": [
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 22,
                  "product_name": "Cebolla Larga Junca x 500grs",
                  "quantity": 1
              }
          ]
      },
      {
          "id": 6,
          "data": [
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 15,
                  "product_name": "Tomate Chonto Maduro",
                  "quantity": 4
              }
          ]
      },
      {
          "id": 7,
          "data": [
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 22,
                  "product_name": "Cebolla Larga Junca x 500grs",
                  "quantity": 1
              },
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 24,
                  "product_name": "Lechuga Crespa Verde",
                  "quantity": 6
              }
          ]
      },
      {
          "id": 12,
          "data": [
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 5,
                  "product_name": "Pimentón Rojo",
                  "quantity": 92
              },
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 31,
                  "product_name": "Papa R-12 Mediana",
                  "quantity": 16
              }
          ]
      },
      {
          "id": 3,
          "data": [
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 9,
                  "product_name": "Mango Tommy Maduro",
                  "quantity": 3
              }
          ]
      },
      {
          "id": 13,
          "data": [
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 30,
                  "product_name": "Fresa Jugo",
                  "quantity": 1
              }
          ]
      },
      {
          "id": 8,
          "data": [
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 22,
                  "product_name": "Cebolla Larga Junca x 500grs",
                  "quantity": 1
              },
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 5,
                  "product_name": "Pimentón Rojo",
                  "quantity": 92
              }
          ]
      },
      {
          "id": 14,
          "data": [
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 16,
                  "product_name": "Acelga",
                  "quantity": 1494
              }
          ]
      },
      {
          "id": 11,
          "data": [
              {
                  "provider_id": 1,
                  "provider_name": "Ruby",
                  "product_id": 30,
                  "product_name": "Fresa Jugo",
                  "quantity": 1
              }
          ]
      }
  ]
}

test('2. Products From Providers', async ({ assert }) => {
  await axios.get('http://127.0.0.1:4000/ProductsFromProviders')
        .then(response => {
          assert.equal(JSON.stringify(response.data), JSON.stringify(two))
        })
        .catch(error => {
            console.log("error: "+error);
            assert.fail();
        });
  
}).timeout(0)
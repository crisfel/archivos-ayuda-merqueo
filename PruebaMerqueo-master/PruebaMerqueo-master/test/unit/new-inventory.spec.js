'use strict'

const { test } = use('Test/Suite')('New Inventory')
const axios = require('axios');


const five={
  "status": 200,
  "message": "Calcular el inventario del día 2 de marzo, teniendo en cuenta los pedidos despachados el 1 de marzo.",
  "data": {
      "inventory": [
          {
              "quantity": 2,
              "date": "2019-03-02",
              "id": 1
          },
          {
              "quantity": 1,
              "date": "2019-03-02",
              "id": 4
          },
          {
              "quantity": 20,
              "date": "2019-03-02",
              "id": 7
          },
          {
              "quantity": 8,
              "date": "2019-03-02",
              "id": 8
          },
          {
              "quantity": 2,
              "date": "2019-03-02",
              "id": 11
          },
          {
              "quantity": 4,
              "date": "2019-03-02",
              "id": 12
          },
          {
              "quantity": 14,
              "date": "2019-03-02",
              "id": 17
          },
          {
              "quantity": 5,
              "date": "2019-03-02",
              "id": 18
          },
          {
              "quantity": 1,
              "date": "2019-03-02",
              "id": 19
          },
          {
              "quantity": 6,
              "date": "2019-03-02",
              "id": 20
          },
          {
              "quantity": 7,
              "date": "2019-03-02",
              "id": 23
          },
          {
              "quantity": 5,
              "date": "2019-03-02",
              "id": 25
          },
          {
              "quantity": 38,
              "date": "2019-03-02",
              "id": 26
          },
          {
              "quantity": 1,
              "date": "2019-03-02",
              "id": 27
          },
          {
              "quantity": 1,
              "date": "2019-03-02",
              "id": 29
          },
          {
              "quantity": 9,
              "date": "2019-03-02",
              "id": 32
          },
          {
              "quantity": 1,
              "date": "2019-03-02",
              "id": 33
          },
          {
              "quantity": 5,
              "date": "2019-03-02",
              "id": 36
          }
      ]
  }
}

test('5. New Inventory', async ({ assert }) => {
  await axios.get('http://127.0.0.1:4000/NewInventory')
        .then(response => {
          assert.equal(JSON.stringify(response.data), JSON.stringify(five))
        })
        .catch(error => {
            console.log("error: "+error);
            assert.fail();
        });
  
}).timeout(0)
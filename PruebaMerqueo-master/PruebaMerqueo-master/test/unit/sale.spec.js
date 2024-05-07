'use strict'

const { test } = use('Test/Suite')('Sale')
const axios = require('axios');

const three={
  "status": 200,
  "message": "Productos menos vendidos el día 1 de marzo.",
  "data": [
      {
          "product_id": 1,
          "name": "Leche",
          "quantity": 1
      },
      {
          "product_id": 43,
          "name": "Banano",
          "quantity": 1
      },
      {
          "product_id": 32,
          "name": "Curuba ",
          "quantity": 1
      }
  ]
}

test('3. Worsts Sellers', async ({ assert }) => {
  await axios.get('http://127.0.0.1:4000/WorstsSellers',{params:{deliveryDate: '2019-03-01'}})
        .then(response => {
          assert.equal(JSON.stringify(response.data), JSON.stringify(three))
        })
        .catch(error => {
            console.log("error: "+error);
            assert.fail();
        });
  
}).timeout(0)



const six={
  "status": 200,
  "message": "Productos más vendidos el día 1 de marzo.",
  "data": [
      {
          "product_id": 16,
          "name": "Acelga",
          "quantity": 1500
      },
      {
          "product_id": 5,
          "name": "Pimentón Rojo",
          "quantity": 102
      },
      {
          "product_id": 6,
          "name": "Kiwi",
          "quantity": 60
      }
  ]
}

test('6. Bests Sellers', async ({ assert }) => {
  await axios.get('http://127.0.0.1:4000/BestsSellers',{params:{deliveryDate: '2019-03-01'}})
        .then(response => {
          assert.equal(JSON.stringify(response.data), JSON.stringify(six))
        })
        .catch(error => {
            console.log("error: "+error);
            assert.fail();
        });
  
}).timeout(0)
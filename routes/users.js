var express = require('express');
var router = express.Router();

/* connection with the NoSQL database */
const CyclicDB = require('@cyclic.sh/dynamodb')
const db = CyclicDB(process.env.CYCLIC_DB)
let users = db.collection('users')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* implement CRUD */
router.get('/', async function(req, res, next) {
  let list = await users.list();
  res.send(list);
});

router.get('/:key', async function(req, res, next) {
  let item = await users.get(req.params.key);
  res.send(item);
});

router.post('/', async function(req, res, next) {
  const {email, firstName, lastName, age} = req.body;
  await users.set(email, {
    firstName: firstName,
    secondName: lastName,
    age: age
  })
  res.end();
});

router.put('/', async function(req, res, next) {
  const {email, firstName, lastName, age} = req.body;
  await users.set(email, {
    firstName: firstName,
    secondName: lastName,
    age: age
  })
  res.end();
});

router.delete('/:key', async function(req, res, next) {
  await users.delete(req.params.key);
  res.end();
});


module.exports = router;

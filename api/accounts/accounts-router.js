const router = require('express').Router()
const Accounts = require('./accounts-model')

router.get('/', async (req, res, next) => {
  try {
    const data = await Accounts.getAll()
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  try {
    res.json('get by id')
  } catch (err) {
    next(err)
  }

})

router.post('/', (req, res, next) => {
  try {
    res.json('post')
  } catch (err) {
    next(err)
  }
})

router.put('/:id', (req, res, next) => {
  try {
    res.json('put request')
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    res.json('delete')
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;

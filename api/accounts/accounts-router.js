const router = require('express').Router()
const Accounts = require('./accounts-model')
const md = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try {
    const data = await Accounts.getAll()
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id',md.checkAccountId, (req, res, next) => {
  res.json(req.account)
})

router.post('/',md.checkAccountPayload,md.checkAccountPayload, async (req, res, next) => {
  try {
    const newAccount = await Accounts.create(req.body)

    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})

router.put('/:id',md.checkAccountId,md.checkAccountPayload,md.checkAccountPayload, async(req, res, next) => {
  try {
    const updated = await Accounts.updateById(req.params.id, req.body)
    res.json(updated)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id',md.checkAccountId, async (req, res, next) => {
  try {
    await Accounts.deleteById(req.params.id)
    res.status(200).json(req.account)
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

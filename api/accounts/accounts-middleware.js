const Accounts = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  const err = { status: 400}
  const {name, budget} = req.body

  if(name === undefined || budget === undefined){
    err.message = 'name and budget are required'
    next(err)
  }else if(typeof name !== 'string'){
    err.message = 'name of account must be a string'
    next(err)
  }else if(name.trim().length < 3 || name.trim().length > 100){
    err.message = 'name of account must be between 3 and 100'
    next(err)
  }else if(typeof budget !== 'number' || isNaN(budget)){
    err.message = 'budget of account must be a number'
    next(err)
  }else if (budget < 0 || budget > 1000000){
    err.message = 'budget of account is too large or too small'
    next(err)
  }

  if(err.message){
    next(err)
  }else{
    next()
  }

}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const data = await db('accounts').where('name',req.body.name.trim()).first()

    if(data){
      next({status:400, message: 'that name is taken'})
    }else{
      next()
    }

  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Accounts.getById(req.params.id)

    if(account){
      req.account = account
      next()
    }else{
      next({status: 404, message: 'account not found'})
    }

  } catch (err) {
    next(err)
  }

}

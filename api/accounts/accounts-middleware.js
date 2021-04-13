const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC

  if(!req.body.name || !req.body.budget){
    res.status(400).json({ message: "name and budget are required" })
  }else if(typeof(req.params.name) !== 'string'){
    res.status(400).json({ message: "name of account must be a string" })
  }else if(!req.body.name.trim().length < 3 || !req.params.body.trim().length > 100 ){
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  }else if(typeof(req.params.budget) !== 'number'){
    res.status(400).json({ message: "budget of account must be a number" })
  }else if(req.params.budget < 0 || req.params.budget > 1000000){
    res.status(400).json({ message: "budget of account is too large or too small" })
  }

  next()

}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = Accounts.getById(req.params.id)

    if(account){
      req.account = account
      next()
    }else{
      res.status(404).json({message: 'sorry the account doesnt exist'})
    }

  } catch (err) {
    next(err)
  }

}

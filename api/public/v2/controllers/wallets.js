const db = requireFrom('core/dbinterface').getInstance()
const helpers = require('../helpers')

class WalletsController {
  index (req, res, next) {
    db.accounts.paginate(helpers.initPager()).then(wallets => {
      helpers.respondWithPagination(wallets, 'wallet')
    })
  }

  show (req, res, next) {
    db.accounts.findById(req.params.id).then(wallet => {
      helpers.respondWithResource(wallet, 'wallet')
    })
  }

  transactions (req, res, next) {
    db.accounts.findById(req.params.id).then(wallet => {
      db.transactions.paginateAllByWallet(wallet, helpers.initPager()).then(transactions => {
        helpers.respondWithPagination(transactions, 'transaction')
      })
    })
  }

  transactionsSend (req, res, next) {
    db.accounts.findById(req.params.id).then(wallet => {
      db.transactions.paginateAllBySender(wallet.publicKey, helpers.initPager()).then(transactions => {
        helpers.respondWithPagination(transactions, 'transaction')
      })
    })
  }

  transactionsReceived (req, res, next) {
    db.accounts.findById(req.params.id).then(wallet => {
      db.transactions.paginateAllByRecipient(wallet.address, helpers.initPager()).then(transactions => {
        helpers.respondWithPagination(transactions, 'transaction')
      })
    })
  }

  votes (req, res, next) {
    db.accounts.findById(req.params.id).then(wallet => {
      db.transactions.paginateVotesBySender(wallet.publicKey, helpers.initPager()).then(transactions => {
        helpers.respondWithPagination(transactions, 'transaction')
      })
    })
  }
}

module.exports = new WalletsController()

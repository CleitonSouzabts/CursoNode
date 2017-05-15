const _ = require('lodash')
const BillingCycle = require('./billingCycle')
const BillingSummaryService = require('../billingSummary/BillingSummaryService')
//const mongooseMid = require('../middleware/forMongoose')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({new: true, runValidators: true})

BillingCycle.after('post', saveSummary).after('put', saveSummary)

function saveSummary(req, res, next) {
  const bundle = res.locals.bundle

  if(bundle.errors) {
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  } else {
    const summary = {
      billingCycle: bundle._id,
      credit: _.sumBy(bundle.credits, 'value'),
      debt: _.sumBy(bundle.debts, 'value')
    }
    BillingSummaryService.saveSummary(summary)
    //mongooseMid.sendErrorsOrNext(req, res, next)
    //next()
  }

}

module.exports = BillingCycle

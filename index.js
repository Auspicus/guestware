require('dotenv').config();
var GuestwareSoapClient = require('./lib/GuestwareSoapClient');

var instance = new GuestwareSoapClient(
  process.env.WDSL,
  process.env.APPLICATION_NAME,
  process.env.VERSION_NUMBER,
  process.env.APPLICATION_ID,
  process.env.USERNAME,
  process.env.PASSWORD
);

instance
.request('ReadGuestRewardTransactionAndDetailsByGuestID', {
  parintGuestID: 123456789
})
.then(function (response) {
  var formattedResponse = instance.formatResponse(response.parsed, {
    $$liTagName: 'virtual_GuestRewardTransactionAndDetails',
    GuestID: 'id',
    BillToLocationID: 'lid',
    Description: 'desc'
  });
  console.log(formattedResponse);
})
.catch(function (err) {
  console.error(err)
});

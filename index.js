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
.helper
.updateGuestDetails([
  {
    $$elementType: 'GUEST_INTERESTS',
    $$elementUpdateType: 'modified',
    GuestID: '0',
    Interest: 'Interesting Things',
    CommFormatType: 'HTML',
    OptOut: 'false',
    EntryDate: new Date().toISOString(),
    EntryBy: 'AccountName',
    LastEditDate: new Date().toISOString(),
    LastEditBy: 'AccountName'
  }
])
.then(function (response) {
  console.log(response);
})
.catch(function (err) {
  console.error(err)
});

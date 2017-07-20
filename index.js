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

// Make a request
instance
.request('ReadGuestLoginGuestIDString', {
  parstrGuestID: 'email@example.com'
})
.then(function (response) {
  var formattedResponse = instance.formatResponse(response.parsed, {
    id: 'GuestID',
    email: 'GuestLoginID',
    password: 'GuestLoginPassword',
    langcode: 'CultureID',
    created: 'EntryDate',
    updated: 'LastEditDate'
  });
  console.log(formattedResponse);
})
.catch(function (err) {
  console.error(err)
});

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
.request('ReadGuestLoginGuestIDString', {
  parstrGuestID: "testemail@gmail.com"
})
.then(function (response) {
  var formattedResponse = instance.formatResponse(response.parsed, {
    GuestID: 'id',
    GuestLoginID: 'email',
    GuestLoginPassword: 'password',
    CultureID: 'langcode',
    EntryDate: 'created',
    LastEditDate: 'updated'
  });
  console.log(formattedResponse);
})
.catch(function (err) {
  console.error(err)
});

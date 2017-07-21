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
.getGuestById(0)
.then(function (response) {
  console.log(response);
})
.catch(function (err) {
  console.error(err)
});

instance
.helper
.getGuestByEmail('email@example.com')
.then(function (response) {
  console.log(response);
})
.catch(function (err) {
  console.error(err)
});

require('dotenv').config();
var Guestware = require('./lib/Guestware');

var instance = new Guestware(
  process.env.WDSL,
  process.env.APPLICATION_NAME,
  process.env.VERSION_NUMBER,
  process.env.USERNAME,
  process.env.PASSWORD,
  process.env.APPLICATION_ID
);

instance
.getGuestDetails(process.env.GUESTWARE_USER_ID)
.then(function (response) {
  console.log(response);
})
.catch(function (err) {
  console.error(err)
});

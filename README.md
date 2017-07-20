# guestware
Because working with GuestWare shouldn't suck this much

```javascript
require('dotenv').config();
var GuestwareSoapClient = require('guestware');

// Create a new instance of the GuestwareSoapClient
var instance = new GuestwareSoapClient(
  process.env.WDSL,
  process.env.APPLICATION_NAME,
  process.env.VERSION_NUMBER,
  process.env.APPLICATION_ID,
  process.env.USERNAME,
  process.env.PASSWORD
);

// Set up request arguments (this data will be sent to GuestWare with the request)
var requestArguments = {
  parstrGuestID: "testemail@gmail.com"
};

// Make a request
instance
.request('ReadGuestLoginGuestIDString', requestArguments)
.then(function (response) {
  // By default, we are returned a raw string response and a parsed version
  // If you would like to clean up your response, use the formatResponse function
  // This will map response nodes to a key in a new object
  var formattedResponse = instance.formatResponse(response.parsed, {
    id: 'GuestID',
    email: 'GuestLoginID',
    password: 'GuestLoginPassword',
    langcode: 'CultureID',
    created: 'EntryDate',
    updated: 'LastEditDate'
  });
  console.log(formattedResponse);
  // {
  //   id: "testuserid" #from GuestID,
  //   email: "testemail@gmail.com" #from GuestLoginID,
  //   password: "plaintextpasswordXd" #from GuestLoginPassword,
  //   langcode: "en" #from CultureID,
  //   created: "2017-02-02T15:26:32.543-08:00" #from EntryDate,
  //   updated: "2017-02-02T15:26:32.543-08:00" #from LastEditDate
  // }
})
.catch(function (err) {
  console.error(err)
});

// Make a request which returns a list
instance
.request('ReadGuestRewardTransactionAndDetailsByGuestID', {
  parintGuestID: 123456789
})
.then(function (response) {
  // Here we are going to format a list of response data into a nice clean array
  var formattedResponse = instance.formatResponse(response.parsed, {
    $$liTagName: 'virtual_GuestRewardTransactionAndDetails', // #tag name of list item
    id: 'GuestID',
    desc: 'Description'
  });
  console.log(formattedResponse);
  // [
  //   {
  //     id: '123456789' #from GuestID of this reward,
  //     desc: 'A description specific to this reward' #from Description of this reward
  //   },
  //   {
  //     id: '123456789',
  //     desc: 'A different description'
  //   }
  // ]
})
.catch(function (err) {
  console.error(err)
});
```

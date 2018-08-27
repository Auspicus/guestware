var Guestware = require('../index.js');
var requestReadData = require('./read.json');
var requestUpdateData = require('./update.json');

Guestware.prototype.read = function (method, args) {
  return new Promise(function (resolve, reject) {
    resolve(this.generateMockResponse(method, requestReadData[method]));
  }.bind(this));
}

Guestware.prototype.update = function (method, objectName, changeList) {
  return new Promise(function (resolve, reject) {
    resolve(this.generateMockResponse(method, requestUpdateData[method]));
  }.bind(this));
}

describe('# Guestware', function () {
  var instance = new Guestware(
    'http://example.com/wsdl',
    'TestAppName',
    'TestVersionNumber',
    'TestUsername',
    'TestPassword',
    'TestAppId'
  );

  describe('Request Generation', function () {
    it('should generate a valid read request', function () {
      expect(instance.generateReadRequestBody('ReadTestRequestMethod', {
        parintExampleArgument: 1
      }).raw).toMatchSnapshot();
    });

    it('should generate a valid update request', function () {
      expect(instance.generateUpdateRequestBody(
        'UpdateTestRequestMethod',
        'pardstTestComplexType',
        [{
          type: 'TEST_ELEMENT',
          updated: true,
          properties: {
            ExampleAttribute: 'ExampleValue',
            TestAttribute: 1
          }
        }]
      ).raw).toMatchSnapshot();
    })
  });

  describe('Response', function () {
    it('should return a response from a valid read request', function () {
      instance
      .read('ReadGuestLogin', { parintGuestID: 0 })
      .then(function (response) {
        expect(response.raw).toMatchSnapshot();
      })
      .catch(function (err) {
        throw err;
      })
    });

    it('should format a valid response', function () {
      instance
      .read('ReadGuestLogin', { parintGuestID: 0 })
      .then(function (response) {
        expect(instance.formatResponse(response.parsed, {
          liTagName: 'GUEST_LOGIN',
          map: {
            id: 'GuestID',
            email: 'GuestLoginID',
            password: 'GuestLoginPassword',
            language: 'CultureID',
            logActivity: 'LogActivity',
            disableLogin: 'DisableLogin',
            created: 'EntryDate',
            createdBy: 'EntryBy',
            updated: 'LastEditDate',
            updatedBy: 'LastEditBy'
          }
        }, true)).toMatchSnapshot();
      })
      .catch(function (err) {
        throw err;
      })
    });
  });
});

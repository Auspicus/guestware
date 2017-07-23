var GuestwareSoapClient = require('./index.js');

describe('# GuestwareSoapClient', function () {
  describe('Request Generation', function () {
    var instance = new GuestwareSoapClient(
      'http://example.com/wsdl',
      'TestAppName',
      'TestVersionNumber',
      'TestAppId',
      'TestUsername',
      'TestPassword'
    );

    it('should generate a valid read request header', function () {
      expect(instance.requestReadHeader).toMatchSnapshot();
    });

    it('should generate a valid read request footer', function () {
      expect(instance.requestReadFooter).toMatchSnapshot();
    });

    it('should generate a valid update request header', function () {
      expect(instance.requestUpdateHeader).toMatchSnapshot();
    });

    it('should generate a valid update request footer', function () {
      expect(instance.requestUpdateFooter).toMatchSnapshot();
    });

    it('should generate a valid read request', function () {
      expect(instance.generateReadRequestBody('ReadTestRequestMethod', {
        parintExampleArgument: 1
      })).toMatchSnapshot();
    });

    it('should generate a valid update request', function () {
      expect(instance.generateUpdateRequestBody(
        'UpdateTestRequestMethod',
        'pardstTestComplexType',
        [{
          $$elementType: 'TEST_ELEMENT',
          $$elementUpdateType: 'modified',
          ExampleAttribute: 'ExampleValue',
          TestAttribute: 1
        }]
      )).toMatchSnapshot();
    })
  });
});

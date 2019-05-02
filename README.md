## Using "Guestware"

This client attempts to make it easier to interface with the Guestware API by recreating exact representations of the DataSets provided by Guestware. It can take a response from Guestware and parse it (using XPath) to find DataSet values. It can also recreate DiffGrams to send to Guestware based on these DataSets.

It provides a simple interface to make edits to values in the DataSet.

## Potential issues

There may in some cases arise an issue where two or more parties are editing the same Dataset. This Guestware client makes no attempt to solve this issue for you so if you would like to prevent simultaneous editing of the same profile we recommend implementing a lock system.

### Upgrading to v2.x

Backwards compatibility has been maintained between v2.x and v1.x.
However, because v2.x uses ES6 modules (`export` / `import`) you will need to
change your require statements from `require('guestware')` to `require('guestware').default`.

However, all API methods have been maintained (but are deprecated) for backwards compatibility.

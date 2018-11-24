## Using "Guestware"

This client attempts to make it easier to interface with the Guestware API by recreating exact representations of the DataSets provided by Guestware. It can take a response from Guestware and parse it (using XPath) to find DataSet values. It can also recreate DiffGrams to send to Guestware based on these DataSets.

It provides a simple interface to make edits to values in the DataSet.

## Potential issues

There may in some cases arise an issue where two or more parties are editing the same Dataset. This Guestware client makes no attempt to solve this issue for you so if you would like to prevent simultaneous editing of the same profile we recommend implementing a lock system.
/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('nexxus_seed');

// Insert a few documents into the metadata collection.
db.getCollection('metadata').insertMany([
  { 'title': 'Document 1', 'description': 'Description of document 1', 'tags': ['tag1', 'tag2'], 'createdAt': new Date() },
  { 'title': 'Document 2', 'description': 'Description of document 2', 'tags': ['tag2', 'tag3'], 'createdAt': new Date() },
]);

// Verify the inserted documents.
const metadataDocuments = db.getCollection('metadata').find().toArray();
console.log('Inserted metadata documents:', metadataDocuments);

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.getCollection('sales').find({
  date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
}).count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred on April 4th, 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
const aggregationResults = db.getCollection('sales').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]).toArray();

// Print the aggregation results to the output window.
console.log('Total sales for each product in 2014:', aggregationResults);

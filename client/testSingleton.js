// testSingleton.js
const dbInstance1 = require('./src/config/db');
const dbInstance2 = require('./src/config/db');

if (dbInstance1 === dbInstance2) {
  console.log("Singleton pattern works: Both instances are identical.");
} else {
  console.log("Singleton pattern failed: Instances are different.");
}

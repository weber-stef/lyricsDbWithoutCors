console.log(`---- LyricsDB Mongo Express ----`);
console.log(`It creates a "LyricsDb" database, seed it with few sample lyrics and shows them with Express/JSON`);

/* Controllers - Mongo database & Express middleware */
const db = require('./controllers/db');
const middleware = require('./controllers/middleware');

db.connect();
db.seed();
middleware.run();



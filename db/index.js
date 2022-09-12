const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

var init = () => {
  db.serialize(() => {
    db.run('CREATE TABLE ipv6 (ipv6 TEXT)');
  });
};

const storeipv6 = (ipv6) => {
  db.serialize(() => {
    const stmt = db.prepare('INSERT INTO ipv6 VALUES (?)');
    console.log('Stored: ' + ipv6);
    stmt.run(ipv6);
    stmt.finalize();
  });

  
};

const getipv6 = () => {
  db.serialize(() => {
    db.each('SELECT * FROM ipv6 ORDER BY ipv6 DESC LIMIT 1', (err, row) => {
      console.log(row.ipv6);
    });
  });
};

module.exports = {
  init,
  storeipv6,
  getipv6,
};

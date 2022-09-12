const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

var init = () => {
  db.serialize(() => {
    db.run('CREATE TABLE ipv6 (ipv6 TEXT)')
    db.run('INSERT INTO ipv6 VALUES ("::1")');
 
 
  });
};

const storeipv6 = (ipv6) => {
  db.serialize(() => {
    db.run('Delete from ipv6');
    const stmt = db.prepare('INSERT INTO ipv6 VALUES (?)');
    console.log('Stored: ' + ipv6);
    stmt.run(ipv6);
    stmt.finalize();
  });
};

const getipv6 = () => {
  return  new Promise((resolve, reject) => {
    db.serialize(() => {
      db.each('SELECT * FROM ipv6', (err, row) => {
        if (err) {
          reject(err);
        }
        if (!row) {
          reject("No ipv6 found");
        }
        console.log('IPV6: ' + row.ipv6);
        resolve(row.ipv6);
      });
    }); 
  });

};

module.exports = {
  init,
  storeipv6,
  getipv6,
};

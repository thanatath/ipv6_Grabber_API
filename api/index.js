const express = require('express');
const db = require('../db');
const router = express.Router();

 router.get('/',async (req, res) =>  {

  const ipv6 = await db.getipv6();
   
  res.json({
    message: ipv6,
  });
});


router.post('/', (req, res) => {
  const ipv6  = req.headers["ipv6"];
  if (!ipv6) {
    return res.status(400).json({
      message: 'Missing ipv6',
    });
  } else {
    db.storeipv6(ipv6);
    return res.status(200).json({
      message: 'Grabbed: ' + ipv6,
    });
  }
});

module.exports = router;

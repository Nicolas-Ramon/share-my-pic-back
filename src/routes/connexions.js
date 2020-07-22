const express = require('express');
const util = require('util');
const bcrypt = require('bcrypt');

const router = express.Router();
const connection = require('../../db');

const queryAsync = util.promisify(connection.query).bind(connection);

router.post('/', async (req, res) => {
  try {
    const { mail, password } = req.body;
    if (!mail || !password) {
      return res.status(403).send('Please provide all the fields!');
    }
    const query = 'SELECT * FROM user WHERE mail = ?';
    const existingUser = await queryAsync(query, mail);
    if (existingUser[0]) {
      if (bcrypt.compareSync(password, existingUser[0].password)) {
        return res.status(200).json({
          id: existingUser[0].id,
          name: existingUser[0].name,
          mail: existingUser[0].mail,
        });
      }
    }
    return res.status(404).send('User not found!');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something bad happened...');
  }
});

module.exports = router;

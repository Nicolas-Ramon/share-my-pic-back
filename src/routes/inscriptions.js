const express = require('express');
const util = require('util');
const bcrypt = require('bcrypt');

const router = express.Router();
const connection = require('../../db');

const queryAsync = util.promisify(connection.query).bind(connection);

router.post('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM user WHERE mail = ?';
    const {
      name,
      mail,
      password,
    } = req.body;
    if (!name || !mail || !password) {
      return res.status(403).send('Please provide all the fields!');
    }
    const existingUser = await queryAsync(query, mail);
    if (existingUser[0]) {
      return res.status(409).send('This mail is allready used!');
    }
    const hash = bcrypt.hashSync(password, 10);
    const insertQuery = 'INSERT INTO user SET ?';
    const result = await queryAsync(insertQuery, {
      ...req.body,
      password: hash,
    });
    return res.status(201).json({
      id: result.insertId,
      ...req.body,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something bad happened...');
  }
});

module.exports = router;
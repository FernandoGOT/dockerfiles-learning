const mysql = require('mysql');
const express = require('express');
const { uniqueNamesGenerator, names, starWars } = require('unique-names-generator');

const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const createDB = () => {
  const createDataBaseQuery = `CREATE DATABASE IF NOT EXISTS nodedb`;
  const createTableQuery = `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id), name VARCHAR(32) )`;

  const connection = mysql.createConnection(config);
  connection.query(createDataBaseQuery);
  connection.query(createTableQuery);

  connection.end();
};

const generateName = () =>
  new Promise((resolve, reject) => {
    const randomName = uniqueNamesGenerator({ dictionaries: [names, starWars] });

    const insertQuery = `INSERT INTO people(name) values('${randomName}')`;
    const getQuery = `SELECT name  FROM people`;

    const connection = mysql.createConnection(config);
    connection.query(insertQuery);
    connection.query(getQuery, (err, results) => {
      const namesList = [];

      if (err) {
        return reject(err);
      }

      results.forEach(rowData => namesList.push(rowData.name));

      resolve(namesList);
    });

    connection.end();
  });

createDB();

app.get('/', async (req, res) => {
  const namesList = await generateName();

  let newHTML = '<h1>Full Cycle!</h1><br /><ul>';

  namesList.forEach(name => (newHTML += `<li>${name}</li>`));
  newHTML += '</ul>';

  res.send(newHTML);
});

app.listen(port, () => {
  console.log(`rodando na porta ${port}`);
});

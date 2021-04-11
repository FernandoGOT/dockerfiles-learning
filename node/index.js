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

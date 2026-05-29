const { Client } = require('pg');

async function run() {
  const client = new Client({
    connectionString: 'postgresql://postgres:1234@localhost:5432/projet1'
  });
  await client.connect();

  const depts = await client.query('SELECT * FROM "Departement"');
  console.log('Departments:', depts.rows);

  const classes = await client.query('SELECT * FROM "classe"');
  console.log('Classes:', classes.rows);

  const inscriptions = await client.query('SELECT * FROM "inscription" LIMIT 5');
  console.log('Inscriptions:', inscriptions.rows);

  await client.end();
}

run().catch(console.error);

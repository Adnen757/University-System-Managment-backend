
const { Client } = require('pg');
async function run() {
  const client = new Client({ user: 'postgres', host: 'localhost', database: 'projet1', password: '1234', port: 5432 });
  await client.connect();
  const res = await client.query("UPDATE \"user\" SET role = 'Professeur' WHERE email LIKE '%@iset.tn'");
  console.log('Updated', res.rowCount, 'professors');
  await client.end();
}
run();

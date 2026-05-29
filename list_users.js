
const { Client } = require('pg');
async function run() {
  const client = new Client({ user: 'postgres', host: 'localhost', database: 'projet1', password: '1234', port: 5432 });
  await client.connect();
  const res = await client.query("SELECT id, fullname, role, \"departementId\" FROM \"user\"");
  console.log(JSON.stringify(res.rows, null, 2));
  await client.end();
}
run();

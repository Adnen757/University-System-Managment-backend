
const { Client } = require('pg');
async function run() {
  const client = new Client({ user: 'postgres', host: 'localhost', database: 'projet1', password: '1234', port: 5432 });
  await client.connect();
  const res = await client.query("SELECT u.fullname, u.email, d.nom as dept_name, d.id as dept_id FROM \"user\" u LEFT JOIN \"Departement\" d ON u.\"departementId\" = d.id WHERE u.email = 'Jalila@gmail.com'");
  console.log(res.rows);
  await client.end();
}
run();

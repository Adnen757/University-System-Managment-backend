
const { Client } = require('pg');
async function check() {
  const client = new Client({ user: 'postgres', host: 'localhost', database: 'projet1', password: '1234', port: 5432 });
  await client.connect();
  const profs = await client.query("SELECT id, fullname, email, \"departementId\" FROM \"user\" WHERE role = 'ENSEIGNANT' OR role = 'professeur'");
  console.log("Professeurs in DB:", JSON.stringify(profs.rows, null, 2));
  const deps = await client.query("SELECT id, nom FROM \"Departement\"");
  console.log("Departements in DB:", JSON.stringify(deps.rows, null, 2));
  await client.end();
}
check();

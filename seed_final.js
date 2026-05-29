
const { Client } = require('pg');
const argon2 = require('argon2');

async function seed() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'projet1',
    password: '1234',
    port: 5432,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // 1. Get or Create Department "Informatique" (ID 1)
    let res = await client.query("SELECT id FROM \"Departement\" WHERE nom = 'Informatique'");
    let deptId;
    if (res.rows.length === 0) {
      console.log("Creating department 'Informatique'...");
      res = await client.query("INSERT INTO \"Departement\" (nom, code, description) VALUES ('Informatique', 'INFO', 'Département Informatique') RETURNING id");
      deptId = res.rows[0].id;
    } else {
      deptId = res.rows[0].id;
    }

    const scheduleData = [
      { name: "KADDOUCI Belgacem", subjects: [{ intitule: "2CN", code: "2CN" }] },
      { name: "SAIDI Jamel Edine", subjects: [{ intitule: "Fondements des Réseaux", code: "FR" }] },
      { name: "ARDHAOUI Wafa", subjects: [{ intitule: "Technique d'expression 2", code: "TE2" }] },
      { name: "ZAAFOURI Jalila", subjects: [{ intitule: "English for computing 2", code: "ENG2" }] },
      { name: "GAMMOUDI Salah", subjects: [{ intitule: "Algorithmique & Programmation II", code: "ALGO2" }] },
      { name: "AZRI Rekaya", subjects: [{ intitule: "Systèmes d'Exploitation", code: "SE" }] },
      { name: "GUESMI Manel", subjects: [{ intitule: "Recherche Opérationnelle", code: "RO" }] },
      { name: "AFFI Nawfel", subjects: [{ intitule: "Atelier Système s I", code: "AS1" }] },
      { name: "SAHLI Nihel", subjects: [{ intitule: "Programmtion Python", code: "PY" }, { intitule: "Atelier Programmtion Python", code: "APY" }] },
      { name: "ISSAOUI Zouhayra", subjects: [{ intitule: "Développement web et multimédia I", code: "DWM1" }, { intitule: "Atelier Développement Web et Multimédia I", code: "ADWM1" }] },
      { name: "ZAAFOURI Amira", subjects: [{ intitule: "Atelier programmation II", code: "APR2" }] },
      { name: "GHANEM Nessrine", subjects: [{ intitule: "Statistiques & Probabilités", code: "STAT" }] },
      { name: "AKACHI Samir", subjects: [{ intitule: "Préparation aux métiers", code: "PM" }] }
    ];

    const hashedPassword = await argon2.hash("Password123");

    for (const item of scheduleData) {
      console.log(`Processing Professor: ${item.name}`);
      
      // Handle Subjects
      const mIds = [];
      for (const sub of item.subjects) {
        let mRes = await client.query("SELECT id FROM \"Matiere\" WHERE code = $1", [sub.code]);
        let mId;
        if (mRes.rows.length === 0) {
          mRes = await client.query("INSERT INTO \"Matiere\" (code, intitule, coefficient, \"creditsECTS\", \"departementId\") VALUES ($1, $2, 3, 4, $3) RETURNING id", [sub.code, sub.intitule, deptId]);
          mId = mRes.rows[0].id;
        } else {
          mId = mRes.rows[0].id;
        }
        mIds.push(mId);
      }

      // Handle Professor
      const email = item.name.toLowerCase().replace(/ /g, '.') + "@iset.tn";
      let pRes = await client.query("SELECT id FROM \"user\" WHERE email = $1", [email]);
      let pId;
      if (pRes.rows.length === 0) {
        // Use role 'Professeur' for TypeORM inheritance
        pRes = await client.query("INSERT INTO \"user\" (fullname, email, password, role, \"departementId\", \"ChargeHoraireSemestrielle\") VALUES ($1, $2, $3, 'Professeur', $4, '18') RETURNING id", [item.name, email, hashedPassword, deptId]);
        pId = pRes.rows[0].id;
      } else {
        pId = pRes.rows[0].id;
        // Update existing user to ensure they have the correct role and department
        await client.query("UPDATE \"user\" SET role = 'Professeur', \"departementId\" = $1 WHERE id = $2", [deptId, pId]);
      }

      // Link Professor to Subjects (table: user_matieres_matiere)
      for (const mId of mIds) {
        let lRes = await client.query("SELECT * FROM \"user_matieres_matiere\" WHERE \"userId\" = $1 AND \"matiereId\" = $2", [pId, mId]);
        if (lRes.rows.length === 0) {
          await client.query("INSERT INTO \"user_matieres_matiere\" (\"userId\", \"matiereId\") VALUES ($1, $2)", [pId, mId]);
        }
      }
    }

    console.log('Seeding COMPLETE! Professors added/updated with role Professeur.');
  } catch (err) {
    console.error('Seeding ERROR:', err);
  } finally {
    await client.end();
  }
}

seed();

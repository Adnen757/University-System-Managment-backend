
const { Client } = require('pg');
const argon2 = require('argon2');

async function seed() {
  const client = new Client({
    user: 'postgres', host: 'localhost', database: 'projet1', password: '1234', port: 5432,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    const deptId = 1; // Informatique

    const newScheduleData = [
      { name: "REBHI Besma", subjects: [{ intitule: "Programmation Objet avancée", code: "POA" }, { intitule: "Atelier Programmation Objet avancée", code: "APOA" }] },
      { name: "HCINI Mourad", subjects: [{ intitule: "Atelier Angular avancé", code: "AAAV" }] },
      { name: "GHARBI Wafa", subjects: [{ intitule: "Sécurité des applications web", code: "SAW" }] },
      { name: "JELLALI Fairouz", subjects: [{ intitule: "Etude et management de projets innovants", code: "EMPI" }] },
      { name: "OMRI Sameh", subjects: [{ intitule: "Atelier outil d'animation 3D", code: "AOA3D" }] },
      { name: "RADDAOUI Afef", subjects: [{ intitule: "Business english", code: "BE" }] },
      { name: "KHELIFI Mouna", subjects: [{ intitule: "Angular avancé", code: "AAV" }] },
      { name: "HAMDOUNI Dorra", subjects: [{ intitule: "business intelligence", code: "BI" }] },
      { name: "NCIBI Sana", subjects: [{ intitule: "Développement Coté Serveur", code: "DCS" }, { intitule: "Atelier Développement Coté Serveur", code: "ADCS" }] },
      { name: "SLIMANI Khaoula", subjects: [{ intitule: "Programmation Graphique 2D-3D", code: "PG2D3D" }, { intitule: "Atelier Programmation Graphique 2D", code: "APG2D" }] },
      { name: "ZOUAIDI Nabil", subjects: [{ intitule: "Atelier SGBD", code: "ASGBD" }] },
      { name: "AMARA Amel", subjects: [{ intitule: "Atelier Design et Integration pour le Web", code: "ADIW" }] },
      { name: "ARDHAOUI Wafa", subjects: [{ intitule: "Préparation à la certification en français", code: "PCF" }] }
    ];

    const hashedPassword = await argon2.hash("Password123");

    for (const item of newScheduleData) {
      console.log(`Processing Professor: ${item.name}`);
      
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

      const email = item.name.toLowerCase().replace(/ /g, '.') + "@iset.tn";
      let pRes = await client.query("SELECT id FROM \"user\" WHERE email = $1", [email]);
      let pId;
      if (pRes.rows.length === 0) {
        pRes = await client.query("INSERT INTO \"user\" (fullname, email, password, role, \"departementId\", \"ChargeHoraireSemestrielle\") VALUES ($1, $2, $3, 'Professeur', $4, '18') RETURNING id", [item.name, email, hashedPassword, deptId]);
        pId = pRes.rows[0].id;
      } else {
        pId = pRes.rows[0].id;
        await client.query("UPDATE \"user\" SET role = 'Professeur', \"departementId\" = $1 WHERE id = $2", [deptId, pId]);
      }

      for (const mId of mIds) {
        let lRes = await client.query("SELECT * FROM \"user_matieres_matiere\" WHERE \"userId\" = $1 AND \"matiereId\" = $2", [pId, mId]);
        if (lRes.rows.length === 0) {
          await client.query("INSERT INTO \"user_matieres_matiere\" (\"userId\", \"matiereId\") VALUES ($1, $2)", [pId, mId]);
        }
      }
    }

    console.log('New batch seeding COMPLETE!');
  } catch (err) {
    console.error('Seeding ERROR:', err);
  } finally {
    await client.end();
  }
}

seed();

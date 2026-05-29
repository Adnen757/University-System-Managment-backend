const axios = require('axios');

async function test() {
  try {
    const res = await axios.post('http://localhost:3001/presence', {
      statut: 'ABSENT',
      methode: 'FACIAL',
      heureArrivee: '10:00:00',
      seance: 'Test - 2025-10-10',
      utilisateur: 'Prof',
      semestre: 'S1',
      etudiant: 155
    });
    console.log('Success:', res.data);
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

test();

const axios = require('axios');

async function test() {
  try {
    const res = await axios.get('http://localhost:3001/inscription');
    const inscriptions = res.data.inscription || res.data || [];
    
    for (const e of inscriptions) {
      if (e.user && e.user.id) {
        try {
          await axios.get(`http://localhost:3001/etudiant/${e.user.id}`);
          console.log(`Etudiant ${e.user.id} EXISTS`);
        } catch (err) {
          console.error(`Etudiant ${e.user.id} NOT FOUND:`, err.response?.data?.message || err.message);
        }
      }
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();

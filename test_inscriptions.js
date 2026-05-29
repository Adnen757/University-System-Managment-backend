const axios = require('axios');

async function test() {
  try {
    const res = await axios.get('http://localhost:3001/inscription');
    const inscriptions = res.data.inscription || res.data || [];
    console.log('Inscriptions:', inscriptions.slice(0, 5));
    if (inscriptions.length > 0 && inscriptions[0].user) {
      console.log('Type of user.id:', typeof inscriptions[0].user.id);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();

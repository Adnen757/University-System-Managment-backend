const axios = require('axios');

async function test() {
  try {
    const res = await axios.get('http://localhost:3001/etudiant/164');
    console.log('Success:', res.data);
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

test();

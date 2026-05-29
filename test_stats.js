const axios = require('axios');

async function run() {
  try {
    const res = await axios.get('http://localhost:3001/stats?departementId=1');
    console.log('Success:', res.data);
  } catch (err) {
    console.error('Error Status:', err.response?.status);
    console.error('Error Data:', JSON.stringify(err.response?.data, null, 2));
  }
}

run();

const axios = require('axios');
async function run() {
  try {
    const res = await axios.get('http://127.0.0.1:3001/user');
    const roles = res.data.user.map(u => u.role);
    console.log('Unique Roles in DB:', [...new Set(roles)]);
    console.log('Chefs in DB:', res.data.user.filter(u => u.role.toLowerCase().includes('chef')));
  } catch (err) {
    console.error(err);
  }
}
run();

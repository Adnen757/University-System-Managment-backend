const { DataSource } = require('typeorm');

const ds = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'stage',
});

ds.initialize().then(async () => {
    const etudiants = await ds.query('SELECT id, fullname, role FROM user WHERE role = "etudiant" LIMIT 5');
    console.log('Etudiants in user table:', etudiants);
    
    const etudiantsChild = await ds.query('SELECT * FROM etudiant LIMIT 5');
    console.log('Etudiants in etudiant table (if exists separately):', etudiantsChild);
    
    ds.destroy();
});

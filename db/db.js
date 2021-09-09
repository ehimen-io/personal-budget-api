const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'dbadmin',
    host: 'localhost',
    database: 'budgetapi',
    password: 'ehimen101',
    port: 5432
})


module.exports = pool;


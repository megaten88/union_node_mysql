const mysql = require('mysql');
const {database} = require('./configuration');
const {promisify} = require('util');


const pool = mysql.createPool(database);
pool.getConnection((err,connection)=>{
    if(err){
        if(err.code == 'PROTOCOL_CONNECTION_LOST'){
            console.log('Connection was closed.')
        }
        if(err.code == 'ER_CON_COUNT_ERROR'){
            console.log('Database has too many connections.')
        }
        if(err.code == 'ECONNREFUSED'){
            console.log('Connection was refused.')
        }
    }
    if(connection){
        connection.release();
        console.log('Database is connected');
    }
    return;
});
pool.query = promisify(pool.query);
module.exports = pool;

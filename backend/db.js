// Node js require returns the same instance of a module everytime! 
// https://stackoverflow.com/questions/30545749/how-to-provide-a-mysql-database-connection-in-single-file-in-nodejs/32064391
// Node docs: https://nodejs.org/docs/latest/api/modules.html#modules_caching
const mysql = require('mysql');

const HOST = "localhost";
const PORT = "3306";
const USER = "dev-npr";
const PASSWORD = "1q2w#NPR";
const DATABASE = "bwc"

// Create a Connection Object
dbConfig = {
    host: HOST,
    port: PORT,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
}

// var db = mysql.createConnection (dbConfig);

//see https://stackoverflow.com/questions/17015590/node-js-mysql-needing-persistent-connection
const pool = mysql.createPool(dbConfig); //connectionLimit : 10 as default
module.exports = {
    query: function(){
        var sql_args = [];
        var args = [];
        for(var i=0; i<arguments.length; i++){
            args.push(arguments[i]);
        }
        var callback = args[args.length-1]; //last arg is callback
        pool.getConnection(function(err, connection) {
        if(err) {
                console.log(err);
                return callback(err);
            }
            if(args.length > 2){
                sql_args = args[1];
            }
        connection.query(args[0], sql_args, function(err, results) {
          connection.release(); // always put connection back in pool after last query
          if(err){
                    console.log(err);
                    return callback(err);
                }
          callback(null, results);
        });
      });
    }
};

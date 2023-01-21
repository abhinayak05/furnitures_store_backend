var mysql = require('mysql');
var util = require('util');
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"my_furniture_store"

});


connection.connect(function(err){
if (err){
    console.error('error connecting' + err.stack)
    return;
}
console.log('mysql connected')
})
connection.query = util.promisify(connection.query)
module.exports = connection;


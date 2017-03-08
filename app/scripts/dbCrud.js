/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('db/mydb.db');

db.serialize(function() {
    //db.run("CREATE TABLE if not exists lorem (info TEXT)");

    //var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    //for (var i = 0; i < 10; i++) {
    //    stmt.run("Ipsum " + i);
    //}
    //stmt.finalize();

    //db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
    //    console.log(row.id + ": " + row.info);
    //});
    db.run("INSERT ignore into concessionarias ()");


});

db.close();
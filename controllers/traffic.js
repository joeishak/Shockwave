
/**Node Packages and Global Object - Declaration / Instantiation */
let express = require('express');
let router = express.Router();
let mySql = require('mysql');
let _ = require('lodash');
// var config =
// {
//     user: "sa",
//     password: "ft3t7pgz",
//     host: "70.176.243.97",
//     port: "3306",
//     database: 'egypt'
// }
var config =
{
    user: "fossilapi",
    password: "d8fj482kbwer",
    host: "192.168.1.5",
    port: "3306",
    database: 'egypt'
}
const pool = new mySql.createConnection(config)
// Check for Errors
pool.connect(err => {
    if (err) console.log(err);
    else console.log('success');
})
let categorized, grouped, accumulated = [];




exports.getAllTraffic = (req, res, next) => {
    pool.query('select * from yonkerstraffic.tickets;', (err, response, fields) => {
        res.send(response);
    });
};




// module.exports = router;

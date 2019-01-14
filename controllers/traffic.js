
/**Node Packages and Global Object - Declaration / Instantiation */
let express = require('express');
let router = express.Router();
let mySql = require('mysql');
let _ = require('lodash');
var config =
{
    user: "sa",
    password: "ft3t7pgz",
    host: "70.176.243.97",
    port: "3306",
    database: 'yonkers'
}
// var config =
// {
//     user: "fossilapi",
//     password: "d8fj482kbwer",
//     host: "192.168.1.5",
//     port: "3306",
//     database: 'egypt'
// }
const pool = new mySql.createConnection(config)
// Check for Errors
pool.connect(err => {
    if (err) console.log(err);
    else console.log('success');
})


exports.getAllTrafficCams = (req, res, next) => {
    const street_list = convertFilterList(req.body.street_list);
    const query = `select * from yonkers.cameras where street_one IN ` + ` (${street_list}) ` + ` OR street_two IN ` + ` (${street_list});`; 

    console.log('QUERY', query);

    pool.query(query, (err, response, fields) => {
        res.send(response);
    });
};

exports.getAllSiteIds = (req, res, next) => {
    // const site_id_list = convertFilterList(req.body.id_list);
    const query = `select distinct site_id from yonkers.cameras;`; 

    pool.query(query, (err, response, fields) => {
        res.send(response);
    });
};

/**
 * Returns the siteid,total,type,monthOfEntry,dayOfEntry,and yearOfEntry
 * for a speciic siteid e.g. 'YK01', 'YK02', etc. 
 */
exports.getPaymentsForCam = (req,res,next) => {

    const site_id = req.body.site_id
    const query = `SELECT siteid, total, type, monthOfEntry, dayOfEntry, yearOfEntry 
    FROM yonkers.tickets where siteid = '` + site_id +"'";

    pool.query(query, (err, response, fields) => {
        res.send(response);
    });
}

exports.getDistinctStreets = (req,res,next) => {
    const street_column = req.body.street
    const query = `select distinct ` + street_column + ` from yonkers.cameras;` ;
    // pool.query(query, (err, response, fields) => {
    //     res.send(response);
    // });
    // res.send({response: query, street: street_column});
    pool.query(query, (err, response, fields) => {
        res.send(response);
    });
}



function convertFilterList(arrayList) {
    return "'" + arrayList.join("\', \'") + "' ";
}


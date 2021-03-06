var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
const bcrypt = require('bcrypt');

var authenticModel = {
    authentic: authentic,
    signup: signup
}

function authentic(authenticData) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE username_user ='${authenticData.username}'`, (error, rows, fields) => {
            if (error) {
                reject(error);
            } else if (rows.length){
                bcrypt.compare(authenticData.password, rows[0].password_user, function (err, isMatch) {
                    if (err) {
                        reject(error);
                    } else if (isMatch) {
                        resolve(rows);
                    }
                    else {
                        reject({"success":false,"message":"Invalid Credentials"});
                    }
                });

            } else {
              reject({"success":false,"message":"Invalid Credentials"});
            }
        });
    });

}


function signup(user) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                db.query("SELECT * FROM users WHERE username='"+user.username+"'", (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else if(rows.length>0) {
                        dbFunc.connectionRelease;
                        reject({"success":false,"message":"user already exist ! try with different user"});
                    } else {
                        db.query("INSERT INTO users(username,password,email)VALUES('" + user.username + "','" + user.password + "', '"+user.email+"')", (error, rows, fields) => {
                            if (error) {
                                dbFunc.connectionRelease;
                                reject(error);
                            } else {
                                dbFunc.connectionRelease;
                                resolve(rows);
                            }
                        });
                    }
                });
            })

        });
    });
}

module.exports = authenticModel;




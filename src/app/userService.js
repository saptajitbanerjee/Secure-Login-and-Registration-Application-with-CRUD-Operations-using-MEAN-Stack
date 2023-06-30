var userModel = require('./userModel');
const CryptoJS = require("crypto-js");

module.exports.loginuserDBService = (userDetails) => {
    return new Promise(function myFn(resolve, reject) {
        userModel.findOne({ username: userDetails.username }).then((result) => {
            //console.log(result)
            //console.log(result.password)
            //if (errorvalue) {
            //  reject({ status: false, msg: "Invaild Data" });
            //} else {
            if (result != undefined || result != null) {
                console.log("Encrypted Password ==> " + result.password)
                var decrypted = CryptoJS.AES.decrypt(result.password, "secret_key")
                decrypted = decrypted.toString(CryptoJS.enc.Utf8);
                console.log("Decrypted Password ==> " + decrypted)
                if ((userDetails.password) === decrypted) {
                    resolve({ status: true, msg: "Login Validated Successfully" });
                } else {
                    reject({ status: false, msg: "Login Validated failed" });
                }
            } else {
                reject({ status: false, msg: "Login Error Details" });
            }
        })
    });
}

module.exports.getDataFromDBService = () => {

    return new Promise(function checkURL(resolve, reject) {
        userModel.find({})
            .then((result) => { resolve(result); })
            .catch((err) => { reject(false); })
    })
}

module.exports.updateUserDBService = (id, userDetails) => {
    return new Promise(function myFn(resolve, reject) {
        userModel.findByIdAndUpdate(id, userDetails)
            .then((result) => { resolve(result); })
            .catch((err) => { reject(false) })
    })
}


module.exports.removeUserDBService = (id) => {
        return new Promise(function myFn(resolve, reject) {
            userModel.findByIdAndDelete(id)
                .then((result) => { resolve(result); })
                .catch((err) => { reject(false) })
        })
    }
    /*
        return new Promise(function login(resolve, reject) {
            userModel.findOne({ username: userDetails.username })
                .then((error) => {
                    console.log(result)
                    if (result != undefined && result != null) {
                        if (result.password == userDetails.password) {
                            resolve({ status: true, msg: "Login Validated Successfully" });
                        } else {
                            reject({ status: false, msg: "Login Validation Failed" });
                        }
                    } else {
                        reject({ status: false, msg: "Login Error Details" });
                    }
                })
                .catch((errorvalue) => { reject({ status: false, msg: "Invaild Data" }) })
        });
    */
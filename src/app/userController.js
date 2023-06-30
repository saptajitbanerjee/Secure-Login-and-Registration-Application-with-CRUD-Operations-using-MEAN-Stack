var userModel = require('./userModel')
    //var registrationModel = require('./registrationModel')
var userService = require('./userService')
var jwt = require('jsonwebtoken')
const CryptoJS = require("crypto-js");

var createUserControllerFn = async(req, res) => {
    try {
        const body = req.body
        const userModelData = new userModel()

        userModelData.username = body.username
        userModelData.mobile_no = body.mobile_no
        userModelData.email_addr = body.email_addr
            //Encrypting User's password using Crypto JS
        userModelData.password = CryptoJS.AES.encrypt(body.password, "secret_key");
        console.log(userModelData.password)
        await userModelData.save()

        res.status(200).send({
            "status": true,
            "message": "User registered successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

var loginUserControllerFn = async(req, res) => {
    var result = null;
    console.log("===>", req.body)
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            let token = jwt.sign(req.body, "secret_key", { expiresIn: '30d' })
            res.send({ "status": true, "message": result.msg, "token": token });
            //res.status(200).send({ token })
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var getDataConntrollerfn = async(req, res) => {
    var user = await userService.getDataFromDBService();
    res.send({ "status": true, "data": user });
}

var updateUserController = async(req, res) => {
    console.log(req.params.id);
    console.log(req.body);

    console.log("Updated Details: " + req.body.password);
    var password = CryptoJS.AES.encrypt(req.body.password, "secret_key");
    console.log("Password ==> " + password);
    req.body.password = password.toString();

    var result = await userService.updateUserDBService(req.params.id, req.body);

    if (result) {
        res.send({ "status": true, "message": "User Updated" });
    } else {
        res.send({ "status": false, "message": "User Updated Failed" });
    }
}

var deleteUserController = async(req, res) => {
    console.log(req.params.id);
    var result = await userService.removeUserDBService(req.params.id);
    if (result) {
        res.send({ "status": true, "message": "User Deleteddd" });
    } else {
        res.send({ "status": false, "message": "User Deleteddd Faileddddddd" });
    }
}

module.exports = { createUserControllerFn, loginUserControllerFn, getDataConntrollerfn, updateUserController, deleteUserController };
const admin = require("../admin");
const db = admin.firestore();
const storage = admin.storage();

exports.postUser = (req,res) => {
    db.collection("users").add({name: req.body.name, surname: req.body.surname}).then((response) => {
        res.status(201).json({message: response.id})
        console.log(response)
    }).catch((error) => {
        res.status(400).json({error})
        console.log(error)
    })
}

exports.getUsers = async (req,res) => {
    let users = [];
    await db.collection("users").get().then((result) => {
        result.docs.forEach((item) => {
            users.push({...item.data(),id: item.id})
        })
        console.log(users);
        res.status(200).json({users: users})
    }).catch((error) => {
        console.log(error);
    })
}


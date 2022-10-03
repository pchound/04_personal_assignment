const http = require('http');
const { ObjectId } = require('mongodb');
//const ObjectId = require('mongodb').ObjectId;
const client = require('../db.js').client;
//const mongodb = require('mongodb');

async function contacts(request, response) {
    console.log('Responding to request');
    const contacts = await client.db('sample_airbnb').collection('contacts').find({}).toArray();
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(contacts), 'utf-8');
};

async function contactsId(request, response) {
    let uri = new URL(request.url, `http://${request.headers.host}`);
    let params = uri.searchParams;
    let id = params.get('id');
    let contact = await client.db('sample_airbnb').collection('contacts').findOne({ '_id': mongodb.ObjectId(id) });
    console.log('Results: ' + contact);
    console.log('search_id:' + id);

    response.writeHead(200, { 'ContentType': 'application/json' });
    response.end(JSON.stringify(contact), "utf-8");
};

//POST
async function saveContact(request, response) {
    let uri = new URL(request.url, `http://${request.headers.host}`);
    /*let params = uri.searchParams;
    let id = params.get('id');
    let contact = await client.db('sample_airbnb').collection('contacts').findOne({'_id' : mongodb.ObjectId(id)});*/

    await client.db("sample_airbnb").collection('contacts').insertOne({ 'firstName': 'First', 'lastName': 'Last' }, function (error, result) {
        if (error) {
            return response.send("Insert failed");
        }
        response.writeHead(200, { 'ContentType': 'application/json' });
        response.end('{}');
        //return response.status(201).send(result.insertedId.toString());
    });

    /*console.log('Results: ' + contact);
    console.log('search_id:' + id);*/

    response.writeHead(200, { 'ContentType': 'application/json' });
    //response.end(JSON.stringify(contacts), "utf-8");
};

async function getAllContacts(req, res) {
    try {
        const contacts = await client.db('sample_airbnb').collection('contacts').find({}).toArray();
        res.status(200).json(contacts);
    } catch (error) {
        return res.status(500).json({message:'Server Error'});
    }
};

async function getContactById(req, res) {
    try {
        const contacts = await client.db('sample_airbnb').collection('contacts').find({_id:new ObjectId(req.params.id)}).toArray();
        res.status(200).json(contacts[0]);
    } catch (error) {
        return res.status(500).json({message:'Server Error'});
    }
}

async function createContact(req, res) {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await client.db('sample_airbnb').collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
};

async function updateContactById(req,res){
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await client.db('sample_airbnb').collection('contacts').findOneAndUpdate({_id:new ObjectId(req.params.id)},{$set:contact});
        res.status(200).json({message: 'Successfully updated contact'});

    } catch (error) {
        return res.status(500).json({message:'Server Error'});
    }
}

async function deleteContactById(req,res){
    try {
 
        const response = await client.db('sample_airbnb').collection('contacts').deleteOne({_id:new ObjectId(req.params.id)});
        res.status(200).json({message: 'Contact deleted successfully'});

    } catch (error) {
        return res.status(500).json({message:'Server Error'});
    }

}
module.exports = { contacts, contactsId, saveContact, getAllContacts, getContactById, createContact, updateContactById, deleteContactById};

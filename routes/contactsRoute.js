const express = require('express');
const contacts_controller = require('../controllers/contacts_controller');
//const saveContact = require('../controllers/contacts_controller').saveContact;
const client = require('../db.js').client;
const router = express.Router();

//router.use('/', require('/.swagger'));


router.get('/contacts', contacts_controller.getAllContacts);
router.get('/contacts/:id', contacts_controller.getContactById);
router.post('/contacts', contacts_controller.createContact);
router.put('/contacts/:id', contacts_controller.updateContactById);
router.delete('/contacts/:id', contacts_controller.deleteContactById);



module.exports = router;
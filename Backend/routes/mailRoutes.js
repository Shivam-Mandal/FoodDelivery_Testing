const express = require('express');
const router = express.Router();

const { sendmail, sendBill } = require('../controllers/mailController');
router.post('/sendmail', sendmail);
router.post('/sendBill', sendBill);

module.exports = router;

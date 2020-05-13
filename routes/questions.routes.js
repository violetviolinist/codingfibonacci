const express = require('express');
const router = express.Router();

const questionsController = require('../controllers/questions.controller');

router.post('/', questionsController.createQuestion);
router.get('/', questionsController.getQuestions);
router.get('/all', questionsController.getAllQuestions);
router.get('/generateFib', questionsController.generateFib);
router.get('/fibonacci', questionsController.getFibonacci);

module.exports = router;
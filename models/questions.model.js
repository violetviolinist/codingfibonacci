const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let QuestionSchema = new Schema({
    date: {type: Date, required: true},
    name: {type: String, required: true},
    link: {type: String, required: true},
});

let FibonacciSchema = new Schema({
    1: {type: String, required: true},
    2: {type: String, required: true},
    3: {type: String, required: true},
    5: {type: String, required: true},
    8: {type: String, required: true},
    13: {type: String, required: true},
    21: {type: String, required: true},
    34: {type: String, required: true},
    55: {type: String, required: true},
    89: {type: String, required: true},
    144: {type: String, required: true},
    233: {type: String, required: true},
    377: {type: String, required: true},
});

exports.Question = mongoose.model('Question', QuestionSchema);
exports.Fibonacci = mongoose.model('Fibonacci', FibonacciSchema);
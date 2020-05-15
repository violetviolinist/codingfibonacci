const Question = require('../models/questions.model').Question;
const Fibonacci = require('../models/questions.model').Fibonacci;
const VALID_FIBONACCI_NUMBER = 'validFibonacciNumber';

exports.createQuestion = (req, res, next) => {
    let question = new Question({
        name: req.body.name,
        link: req.body.link,
        date: new Date(),
    });

    question.save((err) => {
        if(err){
            res.status(500).send(err);
        }
        res.send('Questoin added successfully');
    });
};

exports.getAllQuestions = async (req, res, next) => {
    let questions;
    try{
        questions = await Question.find({});
    }catch(err){
        res.status(500).send(err);
    }
    res.send(questions);
};

exports.getQuestions = (req, res, next) => {
    Question.find({}, async (err, questions) => {
        if(err){
            res.status.send(err);
        }
        try{
            const fibNumbers = await Fibonacci.findOne({});
            const currentDate = new Date().getDate();
            const todaysQuestions = questions.filter( question => {
                const questionDate = question.date.getDate();
                console.log('questionDate: ' + questionDate);
                const dayDifference = parseInt((currentDate - questionDate) / (1000 * 60 * 60 * 24));
                console.log('dayDifference: ' + dayDifference);
                const dayDifferenceString = dayDifference.toString();
                return dayDifference in fibNumbers;
            }).map(question => {
                return {
                    'name': question.name,
                    'link': question.link,
                };
            });
            res.send(todaysQuestions);
        }catch(err){
            return next(err);
        }
    });
};

exports.getFibonacci = (req, res, next) => {
    Fibonacci.findOne({}, (err, doc) => {
        if(err){
            res.status(500).send(err);
        }
        res.send(doc);
    });
}

// To generate Fibonacci numbers and add to database in the Schema called Fibonacci
exports.generateFib = (req, res, next) => {
    let first = 1;
    let second = 1;
    let fibSet = {};
    for(let i = 0; i < 13; ++i){
        fibSet[second] = 'validFibonacciNumber';
        let temp = second;
        second = first + second;
        first = temp;
    }
    let fibonacci = new Fibonacci({
        1: "validFibonacciNumber",
        2: "validFibonacciNumber",
        3: "validFibonacciNumber",
        5: "validFibonacciNumber",
        8: "validFibonacciNumber",
        13: "validFibonacciNumber",
        21: "validFibonacciNumber",
        34: "validFibonacciNumber",
        55: "validFibonacciNumber",
        89: "validFibonacciNumber",
        144: "validFibonacciNumber",
        233: "validFibonacciNumber",
        377: "validFibonacciNumber",
    });

    fibonacci.save((err) => {
        if(err){
            res.status(500).send(err);
        }
        res.send('yeah');
    });
};
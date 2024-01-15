import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import './quizBaseImages.component.quiz.scss';

import first_deriv from './assets/images/first_deriv.png';
import second_deriv from './assets/images/second_deriv.png';
import cosine_graph_rect from './assets/images/cosine_graph_rect.png';
import cosine_graph_square from './assets/images/cosine_graph_square.png';
import cosine_graph from './assets/images/cosine_graph.svg';
import concave_up_down_svg from './assets/images/concave_up_down.svg';
import concave_up_down from './assets/images/concave_up_down.png';
import training_function_svg from './assets/images/training_function.svg';
import training_function from './assets/images/training_function.png';
import tutorial_graph_svg from './assets/images/tutorial_graph.svg';
import tutorial_graph from './assets/images/tutorial_graph.png';
import tutorial_graph_derivative_svg from './assets/images/tutorial_graph_derivative.svg';
import tutorial_graph_derivative from './assets/images/tutorial_graph_derivative.png';
import tutorial_graph_second_derivative_svg from './assets/images/tutorial_graph_second_derivative.svg';
import tutorial_graph_second_derivative from './assets/images/tutorial_graph_second_derivative.png';


// import data from './assets/questions/derivativesQuestions.js';

export default function QuizBaseQuestions() {
    
    const data = { questionsArray: [
        {
            questionId: 1,
            stem:"We can use the first and second derivative to explore the shape of the graph of a function.",
            question: `What is the relationship between a function's behavior and the value of the first derivative, f'(x) ?`,
            latex1: "whatever",
            imageFile: tutorial_graph_svg,
            randomizableAnswers: false,
            correctAnswerPosition: 1,
            correctAnswer: "When the function is increasing, the first derivative is positive.",
            distractor1: "When the function is positive, the first derivative is positive.",
            distractor2: "When the function is concave up, the first derivative is positive.",
            distractor3: "When the function is continuous, the first derivative is positive.",
            distractor4: null
        },
        {
            questionId: 2,
            stem:"When the function is increasing, its derivative is positive. When the function is decreasing, the derivative is neagative.",
            question: `On what interval(s) if f(x) increasing?`,
            latex1: "whatever",
            imageFile: tutorial_graph_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(-1, 2)",
            distractor1: "(-∞, -1.8) and (0, 2.2) ",
            distractor2: "(0, ∞)",
            distractor3: "(0, 2)",
            distractor4: null
        },
        {
            questionId: 3,
            stem:"Right! The function is increasing on the interval (-1, 2).",
            question: `Even though the function has a negative value on the interval (-1, 0), the derivative from (-1,0) is _________`,
            latex1: "whatever",
            imageFile: tutorial_graph_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "positive",
            distractor1: "negative",
            distractor2: "0",
            distractor3: "undefined",
            distractor4: null
        },        
        {
            questionId:4,
            stem:"The function is decreasing on the intervals (-∞, -1) and (2, ∞).",
            question: `Since the function is decreasing, the derivative at x = -2 and x = 3 is _________.`,
            latex1: "whatever",
            imageFile: tutorial_graph_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "negative",
            distractor1: "positive",
            distractor2: "0",
            distractor3: "There is not enough information to know.",
            distractor4: null
        },        
        {
            questionId: 5,
            stem:"Whenever the function is at a peak or a valley, it has a horizontal tangent line and the derivative is 0.",
            question: `What is the value of the derivative at x = -1 and x = 2 ?`,
            latex1: "whatever",
            imageFile: tutorial_graph_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "0",
            distractor1: "positive",
            distractor2: "negative",
            distractor3: "not enough information to know",
            distractor4: null
        },
        {
            questionId: 6,
            stem:"Now we are looking at the graph of f'(x), the derivative of f(x). Let's use this to think about the shape of the graph of the function.",
            question: `The derivative is positive on the interval (-1, 2). What does that tell us about the function.`,
            latex1: "whatever",
            imageFile: tutorial_graph_derivative_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "it is increasing on the interval (0, 2)",
            distractor1: "it is positive on the interval (0, 2)",
            distractor2: "it is concave up on the interval (0, 2)",
            distractor3: "not much",
            distractor4: null
        },                
        {
            questionId: 7,
            stem:"The value of f'(x) is negative on the intervals (-∞, -1) and (2, ∞).",
            question: `What does this tell us about the graph of f(x) from on the intervals (-∞, -1) and (2, ∞)?`,
            latex1: "whatever",
            imageFile: tutorial_graph_derivative_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "f(x) is decreasing on the intervals (-∞, -1) and (2, ∞)",
            distractor1: "f(x) is negative on the intervals (-∞, -1) and (2, ∞)",
            distractor2: "f(x) is concave up on the intervals (-∞, -1) and (2, ∞)",
            distractor3: "f(x) is constant on the intervals (-∞, -1) and (2, ∞)",
            distractor4: null
        },                        
        {
            questionId: 8,
            stem:"We know that all the peaks and valley of the function happen when the derivative is 0.",
            question: `At what x value(s) does f(x) have a potential peak or valley ?`,
            latex1: "whatever",
            imageFile: tutorial_graph_derivative_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "x = -1 and x = 2 ",
            distractor1: "x = 0.5",
            distractor2: "x = -∞, ∞, and 0.5",
            distractor3: "there is not enough information to answer",
            distractor4: null
        },                        
        {
            questionId: 9,
            stem:"The first derivative test is used to determine where the original function has relative minimums and maximums.",
            question: `When the first derivative changes from negative to positive, the original function is at a ___________.`,
            latex1: "whatever",
            imageFile: tutorial_graph_derivative_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "relative maximum",
            distractor1: "relative minimum",
            distractor2: "absolute maximum",
            distractor3: "0",
            distractor4: null
        },
        {
            questionId: 10,
            stem:"This makes sense when we remember that the sign of the derivative tells us whether the function is increasing or decreasing.",
            question: `x = -1 is a relative maximum of f(x) because ______________ ?`,
            latex1: "whatever",
            imageFile: tutorial_graph_derivative_svg,
            randomizableAnswers: false,
            correctAnswerPosition: 0,
            correctAnswer: "f'(x) changes from negative to positive so f(x) changes from decreasing to increasing",
            distractor1: "f'(x) changes from negative to positive so f(x) changes from negative to positive",
            distractor2: "f'(x) changes from decreasing to increasing so f(x) changes from decreasing to increasing",
            distractor3: "f'(x) changes from negative to positive so f(x) changes from negative to positive",
            distractor4: null
        },                        
        {
            questionId: 11,
            stem: "The first derivative test tells us that x = 2 is a local maximum of f(x).",
            question: `We know x = 2 is a local maximum because _____________.`,
            latex1: "whatever",
            imageFile: tutorial_graph_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "f'(x) changes from positive to negative, so f(x) changes from increasing to decreasing",
            distractor1: "f'(x) changes from positive to negative, so f(x) changes from positive to negative",
            distractor2: "f'(x) changes from increasing to decreasing, so f(x) changes from increasing to decreasing",
            distractor3: "f'(x) changes from increasing to decreasing, so f(x) changes from positive to negative",
            distractor4: null
        },                        
        {
            questionId: 12,
            stem: "We can use the second derivative, f''(x) to describe the concavity of f(x).",
            question: `When f''(x) is positive, f(x) is concave up. When f''(x) is negative, f(x) is ___________`,
            latex1: "whatever",
            imageFile: tutorial_graph_second_derivative_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "concave down",
            distractor1: "decreasing",
            distractor2: "negative",
            distractor3: "undefined",
            distractor4: null
        },   
        {
            questionId: 13,
            stem:"The second derivative is positive at x = -1.",
            question: `This tells us that f(x) is _____________ at x = -1 ?`,
            latex1: "whatever",
            imageFile: tutorial_graph_second_derivative_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "concave up",
            distractor1: "increasing",
            distractor2: "positive",
            distractor3: "at a maximum",
            distractor4: null
        },
        {
            questionId: 14,
            stem:"Inflection point",
            question: `On what intervals(s) is the second derivative of f(x) positive ?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(1, 3)",
            distractor1: "(-0.75, 1) and (2.75, 3)",
            distractor2: "(-0.75, 1)",
            distractor3: "(-1, 1) and (2.75, 3)",
            distractor4: null
        },
        {
            questionId: 15,
            stem:"Increasing slope",
            question: `What is true about f(x) at x = 2 ?`,
            latex1: "whatever",
            imageFile: tutorial_graph_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "f'(2) = 0 and f''(2) is positive",
            distractor1: "f(2) is an absolute maximum",
            distractor2: "the graph of f(x) is decreasing and concave down",
            distractor3: "the derivative of f'(2) is negative",
            distractor4: null
        },
        {
            questionId: 16,
            stem:"decreasing slope",
            question: `What is true about f(x) at x = 2.75 ?`,
            latex1: "whatever",
            imageFile: tutorial_graph_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "f(2.75) = 0",
            distractor1: "f(2.75) is an inflection point",
            distractor2: "f(2.75) is a critical point",
            distractor3: "f(x) has a horizontal tangent line at x = 2.75",
            distractor4: null
        },        
        {
            questionId: 1,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `On what interval(s) is f(x) increasing?`,
            latex1: "whatever",
            imageFile: training_function_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(-∞, 0) and (2, ∞)",
            distractor1: "(-0.75, 0) and (2.75, ∞)",
            distractor2: "(-0.75, 1) and (2.75, ∞)",
            distractor3: "(-∞, 1)",
            distractor4: null
        },
        {
            questionId: 2,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `On what interval(s) does f(x) have a positive slope?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(-∞, 0) and (2, ∞)",
            distractor1: "(-0.75, 0) and (2.75, ∞)",
            distractor2: "(-0.75, 1) and (2.75, ∞)",
            distractor3: "(-∞, 1)",
            distractor4: null
        },
        {
            questionId: 3,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `On what interval(s) does f(x) have a positive slope?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(-∞, 0) and (2, ∞)",
            distractor1: "(-0.75, 0) and (2.75, ∞)",
            distractor2: "(-0.75, 1) and (2.75, ∞)",
            distractor3: "(-∞, 1)",
            distractor4: null
        },        
        {
            questionId:4,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `On what interval(s) is the derivative of f(x) positive?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(-∞, 0) and (2, ∞)",
            distractor1: "(-0.75, 0) and (2.75, ∞)",
            distractor2: "(-0.75, 1) and (2.75, ∞)",
            distractor3: "(-∞, 1)",
            distractor4: null
        },        
        {
            questionId: 5,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `On what interval(s) is f(x) decreasing?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(0, 2)",
            distractor1: "(-∞, -0.75) and (1, 2.75)",
            distractor2: "(-0.75, 1)",
            distractor3: "(1, 2)",
            distractor4: null
        },
        {
            questionId: 6,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `On what interval(s) does f(x) have a negative slope?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(0, 2)",
            distractor1: "(-∞, -0.75) and (1, 2.75)",
            distractor2: "(-0.75, 1)",
            distractor3: "(1, 2)",
            distractor4: null
        },                
        {
            questionId: 7,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `On what interval(s) is the derivative of f(x) negative?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(0, 2)",
            distractor1: "(-∞, -0.75) and (1, 2.75)",
            distractor2: "(-0.75, 1)",
            distractor3: "(1, 2)",
            distractor4: null
        },                        
        {
            questionId: 8,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `At what x value(s) does the slope of f(x) = 0 ?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "0 and 2",
            distractor1: "0 only",
            distractor2: "-0.75, 1, 2.75",
            distractor3: "there is not enough information to answer",
            distractor4: null
        },                        
        {
            questionId: 9,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `What is the slope of the line tangent to f(x) at x = 2?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "0",
            distractor1: "-2",
            distractor2: "2",
            distractor3: "there is not enough information to answer",
            distractor4: null
        },
        {
            questionId: 10,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `At what x value(s) is the derivative of f(x) = 0 ?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "0 and 2",
            distractor1: "0 only",
            distractor2: "-0.75, 1, 2.75",
            distractor3: "there is not enough information to answer",
            distractor4: null
        },                        
        {
            questionId: 11,
            stem:null,
            question: `What is the minimum value of f(x)  on the interval (-1, 3)?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "2",
            distractor1: "2.75",
            distractor2: "3",
            distractor3: "∞",
            distractor4: null
        },                        
        {
            questionId: 12,
            stem: null,
            question: `At what x does f(x) have a minimum value on the interval (0, 3)?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "2",
            distractor1: "-2",
            distractor2: "0",
            distractor3: "1",
            distractor4: null
        },   
        {
            questionId: 13,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `On what intervals(s) is f(x) concave up ?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(1, 3)",
            distractor1: "(-0.75, 1) and (2.75, 3)",
            distractor2: "(-0.75, 1)",
            distractor3: "(-1, 1) and (2.75, 3)",
            distractor4: null
        },
        {
            questionId: 14,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `On what intervals(s) is the second derivative of f(x) positive ?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(1, 3)",
            distractor1: "(-0.75, 1) and (2.75, 3)",
            distractor2: "(-0.75, 1)",
            distractor3: "(-1, 1) and (2.75, 3)",
            distractor4: null
        },
        {
            questionId: 15,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `What is true about f(x) at x = 2 ?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "f'(2) = 0 and f''(2) is positive",
            distractor1: "f(2) is an absolute maximum",
            distractor2: "the graph of f(x) is decreasing and concave down",
            distractor3: "the derivative of f'(2) is negative",
            distractor4: null
        },
        {
            questionId: 16,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `What is true about f(x) at x = 2.75 ?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "f(2.75) = 0",
            distractor1: "f(2.75) is an inflection point",
            distractor2: "f(2.75) is a critical point",
            distractor3: "f(x) has a horizontal tangent line at x = 2.75",
            distractor4: null
        },
        {
            questionId: 1,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `On what interval(s) is f(x) increasing?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(-∞, 0) and (2, ∞)",
            distractor1: "(-0.75, 0) and (2.75, ∞)",
            distractor2: "(-0.75, 1) and (2.75, ∞)",
            distractor3: "(-∞, 1)",
            distractor4: null
        },
        {
            questionId: 2,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `On what interval(s) does f(x) have a positive slope?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(-∞, 0) and (2, ∞)",
            distractor1: "(-0.75, 0) and (2.75, ∞)",
            distractor2: "(-0.75, 1) and (2.75, ∞)",
            distractor3: "(-∞, 1)",
            distractor4: null
        },
        {
            questionId:4,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `On what interval(s) is the derivative of f(x) positive?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(-∞, 0) and (2, ∞)",
            distractor1: "(-0.75, 0) and (2.75, ∞)",
            distractor2: "(-0.75, 1) and (2.75, ∞)",
            distractor3: "(-∞, 1)",
            distractor4: null
        },        
        {
            questionId: 5,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `On what interval(s) is f(x) decreasing?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(0, 2)",
            distractor1: "(-∞, -0.75) and (1, 2.75)",
            distractor2: "(-0.75, 1)",
            distractor3: "(1, 2)",
            distractor4: null
        },
        {
            questionId: 6,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `On what interval(s) does f(x) have a negative slope?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(0, 2)",
            distractor1: "(-∞, -0.75) and (1, 2.75)",
            distractor2: "(-0.75, 1)",
            distractor3: "(1, 2)",
            distractor4: null
        },                
        {
            questionId: 7,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `On what interval(s) is the derivative of f(x) negative?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(0, 2)",
            distractor1: "(-∞, -0.75) and (1, 2.75)",
            distractor2: "(-0.75, 1)",
            distractor3: "(1, 2)",
            distractor4: null
        },                        
        {
            questionId: 8,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `At what x value(s) does the slope of f(x) = 0 ?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "0 and 2",
            distractor1: "0 only",
            distractor2: "-0.75, 1, 2.75",
            distractor3: "there is not enough information to answer",
            distractor4: null
        },                        
        {
            questionId: 9,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `What is the slope of the line tangent to f(x) at x = 2?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "0",
            distractor1: "-2",
            distractor2: "2",
            distractor3: "there is not enough information to answer",
            distractor4: null
        },
        {
            questionId: 10,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `At what x value(s) is the derivative of f(x) = 0 ?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "0 and 2",
            distractor1: "0 only",
            distractor2: "-0.75, 1, 2.75",
            distractor3: "there is not enough information to answer",
            distractor4: null
        },                        
        {
            questionId: 11,
            stem:null,
            question: `What is the minimum value of f(x)  on the interval (-1, 3)?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "2",
            distractor1: "2.75",
            distractor2: "3",
            distractor3: "∞",
            distractor4: null
        },                        
        {
            questionId: 12,
            stem: null,
            question: `At what x does f(x) have a minimum value on the interval (0, 3)?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "2",
            distractor1: "-2",
            distractor2: "0",
            distractor3: "1",
            distractor4: null
        },   
        {
            questionId: 13,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `On what intervals(s) is f(x) concave up ?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(1, 3)",
            distractor1: "(-0.75, 1) and (2.75, 3)",
            distractor2: "(-0.75, 1)",
            distractor3: "(-1, 1) and (2.75, 3)",
            distractor4: null
        },
        {
            questionId: 14,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `On what intervals(s) is the second derivative of f(x) positive ?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(1, 3)",
            distractor1: "(-0.75, 1) and (2.75, 3)",
            distractor2: "(-0.75, 1)",
            distractor3: "(-1, 1) and (2.75, 3)",
            distractor4: null
        },
        {
            questionId: 15,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `What is true about f(x) at x = 2 ?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "f'(2) = 0 and f''(2) is positive",
            distractor1: "f(2) is an absolute maximum",
            distractor2: "the graph of f(x) is decreasing and concave down",
            distractor3: "the derivative of f'(2) is negative",
            distractor4: null
        },
        {
            questionId: 16,
            stem:"Consider the graph of f(x) on the interval (-1, 3):",
            question: `What is true about f(x) at x = 2.75 ?`,
            latex1: "whatever",
            imageFile: concave_up_down_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "f(2.75) = 0",
            distractor1: "f(2.75) is an inflection point",
            distractor2: "f(2.75) is a critical point",
            distractor3: "f(x) has a horizontal tangent line at x = 2.75",
            distractor4: null
        },                                                                                             
        {
            questionId:1,
            stem:"Consider the graph of cos(x) on the interval (0, 2π):",
            question: `On what interval(s) is cos(x) increasing?`,
            latex1: "whatever",
            imageFile: cosine_graph_rect,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(π, 2π)",
            distractor1: "(0, π/2) and (3π/2, 2π)",
            distractor2: "(π/2, 3π/2)",
            distractor3: "(π/2, π)",
            distractor4: null
        },
        {
            questionId:2,
            stem:"Consider the graph of cos(x) on the interval (0, 2π):",
            question: `On what interval(s) does cos(x) have a positive slope?`,
            latex1: "whatever",
            imageFile: cosine_graph_rect,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(π, 2π)",
            distractor1: "(0, π/2) and (3π/2, 2π)",
            distractor2: "(π/2, 3π/2)",
            distractor3: "(π, 3π/2)",
            distractor4: null
        },
        {
            questionId:4,
            stem:"Consider the graph of cos(x) on the interval (0, 2π):",
            question: `On what interval(s) is the derivative of cos(x) positive?`,
            latex1: "whatever",
            imageFile: cosine_graph_rect,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(π, 2π)",
            distractor1: "(0, π/2) and (3π/2, 2π)",
            distractor2: "(π/2, 3π/2) only",
            distractor3: "(3π/2, 2π) only",
            distractor4: null
        },        
        {
            questionId: 5,
            stem:"Consider the graph of cos(x) on the interval (0, 2π):",
            question: `On what interval(s) is cos(x) decreasing?`,
            latex1: "whatever",
            imageFile: cosine_graph_rect,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(0, π)",
            distractor1: "(π/2, 3π/2)",
            distractor2: "(π, 2π)",
            distractor3: "(3π/2, 2π)",
            distractor4: null
        },
        {
            questionId: 6,
            stem:"Consider the graph of cos(x) on the interval (0, 2π):",
            question: `On what interval(s) does cos(x) have a negative slope?`,
            latex1: "whatever",
            imageFile: cosine_graph_rect,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(0, π)",
            distractor1: "(π/2, 3π/2)",
            distractor2: "(π, 2π)",
            distractor3: "(3π/2, 2π)",
            distractor4: null
        },                
        {
            questionId: 7,
            stem:"Consider the graph of cos(x) on the interval (0, 2π):",
            question: `On what interval(s) is the derivative of cos(x) negative?`,
            latex1: "whatever",
            imageFile: cosine_graph_rect,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(0, π)",
            distractor1: "(π/2, 3π/2)",
            distractor2: "(π, 2π)",
            distractor3: "(3π/2, 2π)",
            distractor4: null
        },                        
        {
            questionId: 8,
            stem:"Consider the graph of cos(x) on the interval (0, 2π):",
            question: `At what x value(s) does the slope of cos(x) = 0 ?`,
            latex1: "whatever",
            imageFile: cosine_graph_rect,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "π",
            distractor1: "π/2 and 3π/2",
            distractor2: "π/4 and 7π/4",
            distractor3: "there is not enough information to answer",
            distractor4: null
        },                        
        {
            questionId: 9,
            stem:"Consider the graph of cos(x) on the interval (0, 2π):",
            question: `What is the slope of the line tangent to cos(x) at x = π?`,
            latex1: "whatever",
            imageFile: cosine_graph_rect,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "0",
            distractor1: "1",
            distractor2: "-1",
            distractor3: "there is not enough information to answer",
            distractor4: null
        },
        {
            questionId: 10,
            stem:"Consider the graph of cos(x) on the interval (0, 2π):",
            question: `At what x value(s) is the derivative of cos(x) = 0 ?`,
            latex1: "whatever",
            imageFile: cosine_graph_rect,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "π",
            distractor1: "π/2 and 3π/2",
            distractor2: "π/4 and 7π/4",
            distractor3: "there is not enough information to answer",
            distractor4: null
        },                        
        {
            questionId: 11,
            stem: null,
            question: `What is the minimum value of cos(x)  on the interval (0, 2π)?`,
            latex1: "whatever",
            imageFile: cosine_graph_rect,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "-1",
            distractor1: "1",
            distractor2: "π",
            distractor3: "-π",
            distractor4: null
        },                        
        {
            questionId: 12,
            stem: null,
            question: `At what x does cos(x) have a minimum value on the interval (0, 2π)?`,
            latex1: "whatever",
            imageFile: cosine_graph_rect,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "π",
            distractor1: "-1",
            distractor2: "1",
            distractor3: "-π",
            distractor4: null
        },   
        {
            questionId: 13,
            stem:"Consider the graph of cos(x) on the interval (0, 2π):",
            question: `On what intervals(s) is cos(x) concave up ?`,
            latex1: "whatever",
            imageFile: cosine_graph_rect,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(π/2, 3π/2)",
            distractor1: "(0, 2π)",
            distractor2: "(0, π)",
            distractor3: "(0, π/2) and (3π/2, 2π)",
            distractor4: null
        },
        {
            questionId: 14,
            stem:"Consider the graph of cos(x) on the interval (0, 2π):",
            question: `On what intervals(s) is the second derivative of cos(x) positive ?`,
            latex1: "whatever",
            imageFile: cosine_graph_rect,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(π/2, 3π/2)",
            distractor1: "(0, 2π)",
            distractor2: "(0, π)",
            distractor3: "(0, π/2) and (3π/2, 2π)",
            distractor4: null
        },
        {
            questionId: 15,
            stem:"Consider the graph of cos(x) on the interval (0, 2π):",
            question: `What is true about cos(x) at x = π/2 ?`,
            latex1: "whatever",
            imageFile: cosine_graph_rect,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "cos(π/2) = 0",
            distractor1: "the derivative of cos(x) is 0 at x = π/2",
            distractor2: "the graph of cos(x) is decreasing and concave down",
            distractor3: "the derivative of cos(x) is changing from postitive to negative",
            distractor4: null
        },
        {
            questionId: 16,
            stem:"Consider the graph of cos(x) on the interval (0, 2π):",
            question: `What is true about cos(x) at x = π ?`,
            latex1: "whatever",
            imageFile: cosine_graph_rect,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "cos(x) is at an absolute minimum and the graph is concave up",
            distractor1: "the derivative of cos(x) is -1",
            distractor2: "the graph of cos(x) is decreasing and concave down",
            distractor3: "the derivative of cos(x) is negative",
            distractor4: null
        },                                                                                     
        {
            questionId: 1,
            stem:"Consider the graph of g(x), where g(x) = f'(x):",
            question: `On what interval(s) is f(x) increasing?`,
            latex1: "whatever",
            imageFile: cosine_graph_rect,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(-∞, -2), (7, ∞)",
            distractor1: "(-2, 7)",
            distractor2: "(3.5, ∞)",
            distractor3: "(-∞, ∞)",
            distractor4: null
        },
        {
            questionId: 14,
            stem:"Consider the graph of g(x), where g(x) = f'(x):",
            question: "At what x value does f(x) have a relative minimum?",
            imageFile: cosine_graph_square,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "7",
            distractor1: "-2",
            distractor2: "-2 and 7",
            distractor3: "3.5",
            distractor4: null
        },
        {
            questionId:3,
            stem:"Consider the graph of g(x), where g(x) = f'(x):",
            question: "At x = -2, f(x) is . . .",
            imageFile: cosine_graph,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "at a relative maximum",
            distractor1: "decreasing",
            distractor2: "at an inflection point",
            distractor3: "concave up",
            distractor4: null
        },
        {
            questionId:4,
            stem:"Consider the graph of g(x), where g(x) = f'(x):",
            question: "The graph of f(x) is concave up on which of the following interval(s)?",
            imageFile: first_deriv,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(3.5, ∞)",
            distractor1: "(-∞, 3.5)",
            distractor2: "(-∞, -2), (7, ∞)",
            distractor3: "(-∞, ∞)",
            distractor4: null
        },
        {
            questionId:5,
            stem:"Consider the graph of g(x), where g(x) = f''(x):",
            question: "The graph of f(x) is concave up on which of the following interval(s)?",
            imageFile: first_deriv,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(3.5, ∞)",
            distractor1: "(-∞, 3.5)",
            distractor2: "(-∞, -2), (7, ∞)",
            distractor3: "(-∞, ∞)",
            distractor4: null
        },
        {
            questionId:6,
            stem:"Consider the graph of g(x), where g(x) = f''(x):",
            question: "On what intervals is the slope of f(x) increasing?",
            imageFile: first_deriv,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(3.5, ∞)",
            distractor1: "(-∞, 3.5)",
            distractor2: "(-∞, -2), (7, ∞)",
            distractor3: "(-∞, ∞)",
            distractor4: null
        },                
    ]
    }
    const [count, setCount] = useState(0)
    var incorrectAnswers = [data.questionsArray[count].distractor1, data.questionsArray[count].distractor2, data.questionsArray[count].distractor3];

    const [randomizedAnswers, setRandomizedAnswers] = useState(sortArray(incorrectAnswers.concat(data.questionsArray[0].correctAnswer), []));
    const [graded, setGraded] = useState('true')
    const [alreadyClicked, setAlreadyClicked] = useState('false')

    function sortArray(array, randomizedAnswers) {
        var pick = 0;
        while (array.length > 0) {
            pick = Math.floor(Math.random() * array.length);
            randomizedAnswers.push(array[pick]);
            array.splice(pick, 1);
        }
        return randomizedAnswers;
    }

    function setClicked(clicked) {
        setAlreadyClicked(clicked);
    }

    function nextQuestion() {
        setCount(count + 1);
        setGraded(!graded);
        setClicked("false")
        incorrectAnswers = [data.questionsArray[count+1].distractor1, data.questionsArray[count+1].distractor2, data.questionsArray[count+1].distractor3];
        setRandomizedAnswers(sortArray(incorrectAnswers.concat(data.questionsArray[count+1].correctAnswer), []))    
    }

    return (
        <Container>
            <div id="quizContent" className="mt-2">
                <QuestionArea
                    question={data?.questionsArray[count]}
                    answers={randomizedAnswers}
                    graded={graded}
                    alreadyClicked={alreadyClicked}
                    setClicked={setClicked}
                    first_deriv={first_deriv}
                />
                <div>
                    <Button variant="primary" type="submit" onClick={nextQuestion}>Next</Button>
                </div>
                <br /><br />
                <NavLink to="/tutorialTopics">
                    <Button type="button" variant="info" size="lg">Back to Tutorials and Quizzes</Button>
                </NavLink>
            </div>
        </Container>    
    );
}

export function QuestionArea({question, answers, graded, alreadyClicked, setClicked, first_deriv}) {
    return (
        <div className="mt-2">
            <div className="row">
                <div className="col-xsm-12 offset-xsm-3 col-sm-6 offset-sm-3 ">
                    <Image src={question.imageFile} fluid />
                </div>
            </div>
            <div className="row mt-2">
              <p dangerouslySetInnerHTML={{__html: question.stem}}></p>
            </div>
            <div className="row mt-2">
              <p dangerouslySetInnerHTML={{__html: question.question}}></p>
            </div>
            <div id="aArea" className="mt-2">
                <div className="answerA">
                    <p>a.&nbsp;&nbsp;&nbsp;&nbsp;
                        <Answer 
                            answer={answers[0]}
                            correctAnswer={question?.correctAnswer}
                            graded={graded}
                            alreadyClicked={alreadyClicked}
                            setClicked={setClicked}
                        />
                    </p>
                </div>
                <div className="answerB">
                <p>b.&nbsp;&nbsp;&nbsp;&nbsp; 
                    <Answer 
                        answer={answers[1]}
                        correctAnswer={question?.correctAnswer}
                        graded={graded}
                        alreadyClicked={alreadyClicked}
                        setClicked={setClicked}
                    />
                </p>
                </div>
                <div className="answerC">
                <p>c.&nbsp;&nbsp;&nbsp;&nbsp; 
                    <Answer 
                        answer={answers[2]}
                        correctAnswer={question?.correctAnswer}
                        graded={graded}
                        alreadyClicked={alreadyClicked}
                        setClicked={setClicked}
                    />
                </p>
                </div>
                <div className="answerC">
                <p>d.&nbsp;&nbsp;&nbsp;&nbsp; 
                    <Answer 
                        answer={answers[3]}
                        correctAnswer={question?.correctAnswer}
                        graded={graded}
                        alreadyClicked={alreadyClicked}
                        setClicked={setClicked}
                    />  
                </p>
                </div>                              
            </div>
        </div>
    );
}
// UseEffect forces the change in the value of graded to update state in this child.
export function Answer({answer, correctAnswer, graded, alreadyClicked, setClicked}){
    const [grade, setGrade] = useState(graded)
    useEffect(()=> {
        setGrade("#E7E7E7");
    }, [graded])
    
    function checkAnswer() {
        setClicked('true');
        if (alreadyClicked == 'false') {
            if (answer === correctAnswer) {
                setGrade("green");
            } else {
                setGrade("red");
            }
            graded = false;
        }
    }

    const styles = {
        correct: {
            color:grade
        }
    }
    return (
        <span
            style={styles.correct}
            onClick={checkAnswer}
            dangerouslySetInnerHTML={{__html: answer}}>
        </span>
    )
}
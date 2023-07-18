import React from 'react';
import { useState } from "react";
import { Cookies, useCookies } from 'react-cookie';
import './App.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Protected from './components/Protected';
import Navigation from "./components/navbar/navbar.component.navbar";
import Splash from './components/splash.component.js';
import Success from './components/success.component';
import Login from './components/auth/login.component.auth';
import Register from './components/auth/register.component.auth';
import LogOut from './components/auth/logout.component.auth';

import QuizCategories from './components/quiz/quizCategories.component.quiz';
import QuizCategoriesButtons from './components/quiz/quizCategoriesButtons.component.quiz';
import GetQuestions from './components/quiz/quizBase.component.quiz';

import MyComponent from './components/sandbox/fetch.component';
import Dropdown from './components/sandbox/dropdown';
import Create from './components/sandbox/create.component';
import ListUsers from './components/sandbox/listUsers.component';
import QuestionArea from './components/sandbox/question-area.component';
import GetAPI from './components/sandbox/getAPI.component';
import GetAPIWithEffect from './components/sandbox/getAPIWithEffect.component';
import GetAPIAxios from './components/sandbox/getAPIAxios.component';
import GetTrivia from './components/sandbox/getTrivia.component';

import Multiplication from './components/multiply/multiplication.component.multiply';
import Calculus from './components/calculus/calculus.component.calculus';
import Exponents from './components/calculus/calculus.component.exponents';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const signin = () => {
    setIsSignedIn(true)
  }
  const signout = () => {
    setIsSignedIn(false)
  }
  const [cookies, setCookie, removeCookie] = useCookies(['cookies'])
  const [username, setUsername] = useState(cookies.username);
  var loggedIn = false;
  if (username) {
    loggedIn = true;
  }
  console.log(cookies);
  // const [username, setUsername] = useState("");
  // const allCookies = new Cookies();
  // var myCookie = allCookies.get('username');
  // console.log(myCookie);
  // setUsername(myCookie);
  return (
    <div className="App">
      <Navigation 
        username={username}
        loggedIn={loggedIn}
      />
      <div className="appContent">
        <Routes>
          <Route exact path="/" element={<Splash />} />
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={<Login
                                            setUsername={setUsername}
                                            setCookie={setCookie} 
                                        />} />
          <Route path="/register" element={<Register
                                            setUsername={setUsername}
                                            setCookie={setCookie} 
                                          />} />
          <Route path="/logout" element={<LogOut
                                            setUsername={setUsername}
                                            removeCookie={removeCookie}
                                        /> } />
          
          <Route path="/categories"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <QuizCategories />
                  </Protected>
                }
          />
          <Route path="/categoriesButtons" element={<QuizCategoriesButtons /> } />
          <Route path="/getQuestions/:categoryId" element={<GetQuestions /> } />
          
          <Route path="/fetch" element={<MyComponent />} />
          <Route path="/dropdown" element={<Dropdown /> } />
          <Route path="/create" element={<Create />} />
          <Route path="/listUsers" element={<ListUsers /> } />
          <Route path="/question" element={<QuestionArea />} />
          <Route path="/api" element={<GetAPI />} />
          <Route path="/apiRef" element={<GetAPIWithEffect /> } />
          <Route path="/apiAxios" element={<GetAPIAxios /> } />
          <Route path="/getTrivia" element={<GetTrivia /> } />

          <Route path="/multiply"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <Multiplication />
                  </Protected>
                }
          />
          <Route path="/calculus"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <Calculus />
                  </Protected>
                }
          />
          <Route path="/exponents"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <Exponents username={username}/>
                  </Protected>
                }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

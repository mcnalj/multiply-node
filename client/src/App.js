import React from 'react';
import { useState } from "react";
import { useCookies } from 'react-cookie';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Protected from './components/Protected';
import Navigation from "./components/navbar/navbar.component.navbar";
import Splash from './components/splash.component.js';
import Success from './components/success.component';
import Login from './components/auth/login.component.auth';
import Register from './components/auth/register.component.auth';
import LogOut from './components/auth/logout.component.auth';

import TutorialTopics from './components/calculus/calculus.component.tutorialTopics.js';
import QuizCategories from './components/quiz/quizCategories.component.quiz';
import QuizCategoriesButtons from './components/quiz/quizCategoriesButtons.component.quiz';
import GetQuestions from './components/quiz/quizBase.component.quiz';
import QuizBaseImages from './components/quiz/quizBaseImages.component.quiz';
import QuizTutorial from './components/quiz/quizTutorial.component.quiz';

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
import ExponentsTopics from './components/calculus/calculus.component.exponentsTopics';
import Exponents from './components/calculus/calculus.component.exponents';
import Derivatives from './components/calculus/calculus.component.derivatives';
import DerivativesTopics from './components/calculus/calculus.component.derivativesTopics';
import Markdown from './components/calculus/calculus.component.markdown';

import DerivativeRules from './components/flashcards/derivativeRules.component.flashcards';
import FlippableCard from './components/flashcards/gptFlashcard.component.flashcards';
import GFGFlippableCard from './components/flashcards/gfgFlashcard.component.flashcards';
import CardStack from './components/flashcards/cardStack.component.flashcard';
import CardSlide from './components/flashcards/cardSlide.component.flashcard';

import UserProgress from './components/userInfo/userInfo.component.progress';
import ClassProgress from './components/userInfo/userInfo.component.classProgress';
import ProgressChoices from './components/userInfo/userInfo.component.progressChoices';
import SingleUsersProgress from './components/userInfo/userInfo.component.singleUsersProgress';

import ManageClasses from './components/auth/manageClasses.component.auth';
import CreateClass from './components/auth/createClass.component.auth';
import ListClasses from './components/auth/listClasses.component.auth';
import CreateTargets from './components/class/createTargets.component.class';
import ViewClass from './components/class/viewClass.component.class';

import TrigonometricTopics from './components/calculus/trigonometricTopics.component.calculus';
import TrigonometricFunctions from './components/calculus/trigonometricFunctions.component.calculus';
import TrigonometricDerivatives from './components/calculus/trigonometricDerivatives.component.calculus';

import NaturalTopics from './components/calculus/naturalTopics.component.calculus';
import NaturalDerivatives from './components/calculus/naturalDerivatives.component.calculus';

import IntegrationTopics from './components/calculus/integrationTopics.component.calculus';
import Integration from './components/calculus/integration.component.calculus';

import DerivativeRulesStandards from './components/standards/derivativeRulesStandards.component.standards.js';
import DerivativesStandards from './components/standards/derivativesStandards.component.standards';
import StandardsCategories from './components/standards/standardsCategories.component.standards';
import StandardsTopics from './components/standards/standardsTopics.component.standards';

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
  if (username && username != 'undefined') {
    loggedIn = true;
  }
  console.log(cookies);
  // const [username, setUsername] = useState("");
  // const allCookies = new Cookies();
  // var myCookie = allCookies.get('username');
  // console.log(myCookie);
  // setUsername(myCookie);
  return (
    <div className="App text-center">
      <Navigation 
        username={username}
        loggedIn={loggedIn}
      />
      <div className="appContent container-fluid m-0 p-0">
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
          <Route path="/quizBaseImages" element={<QuizBaseImages /> } />
          {/* <Route path="/quizTutorial" element={<QuizTutorial /> } /> */}
          
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
                    <Calculus username={username}/>
                  </Protected>
                }
          />
          <Route path="/exponentsTopics"
              element={
                <Protected isSignedIn={loggedIn}>
                  <ExponentsTopics username={username}/>
                </Protected>
              }
          />        
          <Route path="/exponents/:topic"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <Exponents username={username}/>
                  </Protected>
                }
          />
          <Route path="/derivatives/:topic"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <Derivatives username={username}/>
                  </Protected>
                }
          />
          <Route path="/derivativesTopics"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <DerivativesTopics username={username}/>
                  </Protected>
                }
          />
          <Route path="/markdown"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <Markdown username={username}/>
                  </Protected>
                }
          />
          <Route path="/progressChoices"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <ProgressChoices username={username}/>
                  </Protected>
                }
          />
          <Route path="/singleUsersProgress/:username"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <SingleUsersProgress username={username}/>
                  </Protected>
                }
          />                    
          <Route path="/userProgress"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <UserProgress username={username}/>
                  </Protected>
                }
          />
          <Route path="/classProgress"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <ClassProgress username={username}/>
                  </Protected>
                }
          />
        <Route path="/manageClasses"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <ManageClasses username={username}/>
                  </Protected>
                }
          />                    
          <Route path="/createClass"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <CreateClass username={username}/>
                  </Protected>
                }
          />
          <Route path="/listClasses"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <ListClasses username={username}/>
                  </Protected>
                }
          />
          <Route path="/viewClass/:classCode"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <ViewClass username={username}/>
                  </Protected>
                }
          />
          <Route path="/createTargets"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <CreateTargets username={username}/>
                  </Protected>
                }
          />
          <Route path="/trigonometricTopics"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <TrigonometricTopics username={username}/>
                  </Protected>
                }
          />          
          <Route path="/trigonometricFunctions/:topic"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <TrigonometricFunctions username={username} />
                  </Protected>
                } 
          />                                                                                                            
          <Route path="/trigonometricDerivatives/:topic"
                  element={
                    <Protected isSignedIn={loggedIn}>
                      <TrigonometricDerivatives username={username} />
                    </Protected>
                  } 
          />
          <Route path="/naturalTopics"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <NaturalTopics username={username}/>
                  </Protected>
                }
          />                    
          <Route path="/naturalDerivatives/:topic"
                  element={
                    <Protected isSignedIn={loggedIn}>
                      <NaturalDerivatives username={username} />
                    </Protected>
                  } 
          />
          <Route path="/integrationTopics"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <IntegrationTopics username={username}/>
                  </Protected>
                }
          />                    
          <Route path="/integration/:topic"
                element={
                  <Protected isSignedIn={loggedIn}>
                    <Integration username={username}/>
                  </Protected>
                }
          />                                        
          <Route path="/derivativeRules"
                  element={
                    <Protected isSignedIn={loggedIn}>
                      <DerivativeRules username={username} />
                    </Protected>
                  } 
          />
          <Route path="/gptFlashcard"
                  element={
                    <Protected isSignedIn={loggedIn}>
                      <FlippableCard username={username} />
                    </Protected>
                  } 
          />
          <Route path="/gfgFlashcard"
                  element={
                    <Protected isSignedIn={loggedIn}>
                      <GFGFlippableCard username={username} />
                    </Protected>
                  } 
          /> 
          <Route path="/cardStack"
                  element={
                    <Protected isSignedIn={loggedIn}>
                      <CardStack username={username} />
                    </Protected>
                  } 
          /> 
          <Route path="/cardSlide"
                  element={
                    <Protected isSignedIn={loggedIn}>
                      <CardSlide username={username} />
                    </Protected>
                  } 
          /> 
          <Route path="/quizTutorial"
                  element={
                    <Protected isSignedIn={loggedIn}>
                        <QuizTutorial username={username} />
                    </Protected>
                  }
          />
          <Route path="/tutorialTopics"
                  element={
                    <Protected isSignedIn={loggedIn}>
                        <TutorialTopics username={username} />
                    </Protected>
                  }
          />                              
          {/* <Route path="/derivativesStandards"
                  element={
                    <Protected isSignedIn={loggedIn}>
                        <DerivativesStandards username={username} />
                    </Protected>
                  }
          />                               */}
          <Route path="/derivativeRulesStandards"
                  element={
                    <Protected isSignedIn={loggedIn}>
                        <DerivativeRulesStandards username={username} />
                    </Protected>
                  }
          />                                        
          <Route path="/standardsCategories"
                  element={
                    <Protected isSignedIn={loggedIn}>
                        <StandardsCategories username={username} />
                    </Protected>
                  }
          />
          <Route path="/standardsTopics/:category"
                  element={
                    <Protected isSignedIn={loggedIn}>
                      <StandardsTopics username={username} />
                   </Protected>
                  }
          />                                                                                                                                                                       


                                                                                                            
          </Routes>                                    
      </div>
    </div>
  );
}

export default App;

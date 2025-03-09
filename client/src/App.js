import React, { useEffect, useState } from 'react';
import { config} from './components/constants';
import { useCookies } from 'react-cookie';
import './App.scss';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Protected from './components/Protected';
import Navigation from "./components/navbar/navbar.component.navbar";
import Splash from './components/splash.component.js';
import Success from './components/success.component';
import Login from './components/auth/login.component.auth';
import Register from './components/auth/register.component.auth';
import LogOut from './components/auth/logout.component.auth';
import LoginWithGoogle from './components/auth/loginWithGoogle.component.auth';

import CalculusHome from './components/calculus/calculus.component.calculusHome.js';

import TutorialTopics from './components/calculus/calculus.component.tutorialTopics.js';
import QuizCategories from './components/quiz/quizCategories.component.quiz';
import QuizCategoriesButtons from './components/quiz/quizCategoriesButtons.component.quiz';
import GetQuestions from './components/quiz/quizBase.component.quiz';
import QuizBaseImages from './components/quiz/quizBaseImages.component.quiz';
import QuizTutorial from './components/quiz/quizTutorial.component.quiz';

import QuizHumanities from './components/quiz/quiz.component.humanitiesQuiz';
import QuizHumanitiesTopics from './components/quiz/quiz.component.humanitiesQuizTopics';

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
import Exponents2 from './components/calculus/calculus.component.exponents2';
import ExponentsVariety from './components/calculus/calculus.component.exponentsVariety';
import Derivatives from './components/calculus/calculus.component.derivatives';
import DerivativesTopics from './components/calculus/calculus.component.derivativesTopics';

import SkillComplete from './components/calculus/calculus.component.skillComplete'

import PowerRuleTopics from './components/calculus/calculus.component.powerRuleTopics.js';
import PowerRuleSkills from './components/calculus/calculus.component.powerRuleSkills.js';

import Markdown from './components/calculus/calculus.component.markdown';
import PrivacyPolicy from './components/auth/component.auth.privacy';
import TermsOfService from './components/auth/component.auth.termsofservice';

import DerivativeRules from './components/flashcards/derivativeRules.component.flashcards';
import FlippableCard from './components/flashcards/gptFlashcard.component.flashcards';
import GFGFlippableCard from './components/flashcards/gfgFlashcard.component.flashcards';
import CardStack from './components/flashcards/cardStack.component.flashcard';
import CardSlide from './components/flashcards/cardSlide.component.flashcard';

import UserProgress from './components/userInfo/userInfo.component.progress';
import ClassProgress from './components/userInfo/userInfo.component.classProgress';
import ProgressChoices from './components/userInfo/userInfo.component.progressChoices';
import SingleUsersProgress from './components/userInfo/userInfo.component.singleUsersProgress';
import UsersCC from './components/userInfo/userInfo.component.usersCC.js';
import UserActionsCC from './components/userInfo/userInfo.component.userActionsCC.js';

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

import IntegrationTopicsDetails from './components/calculus/integrationTopicsDetails.component.calculus';
import Integration from './components/calculus/integration.component.calculus';

import DerivativeRulesStandards from './components/standards/derivativeRulesStandards.component.standards.js';
import DerivativesStandards from './components/standards/derivativesStandards.component.standards';
import StandardsCategories from './components/standards/standardsCategories.component.standards';
import StandardsTopics from './components/standards/standardsTopics.component.standards';
import StandardsTracker from './components/standards/standardsTracker.component.standards';

import SummerPrepTopics from './components/summerPrep/summerPrepTopics.component.summerPrep.js';
import MultiplicationTopics from './components/summerPrep/multiplicationTopics.component.summerPrep.js';
import CubesAndSquares from './components/summerPrep/cubesAndSquares.component.summerPrep.js';
import IdentifyingFunctions from './components/summerPrep/identifyingFunctions.component.summerPrep.js';
import IdentifyingFunctionsExtractAnswers from './components/summerPrep/identifyingFunctionsExtractAnswers.component.summerPrep.js';
import PlottingPointsTopics from './components/summerPrep/plottingPointsTopics.component.summerPrep.js';
import PlottingPoints from './components/summerPrep/plottingPoints.component.summerPrep.js';
import PlottingPointsPolynomials from './components/summerPrep/plottingPointsPolynomials.component.summerPrep.js';
import GraphingFunctions from './components/summerPrep/graphingFunctions.component.summerPrep.js';
import FactoringQuadraticsTopics from './components/summerPrep/factoringQuadraticsTopics.component.summerPrep.js';
import FactoringQuadratics from './components/summerPrep/factoringQuadratics.component.summerPrep.js';
import ExponentsSummer from './components/summerPrep/exponentsSummer.component.summerPrep.js';
import ExponentsSummerGPT from './components/summerPrep/exponentsSummerGPT.component.summerPrep.js';
import SVGGraphs from './components/summerPrep/svgGraphs.component.summerPrep.js';
import FunctionNotation from './components/summerPrep/functionNotation.component.summerPrep.js';
import EquationsOfLines from './components/summerPrep/equationsOfLines.component.summerPrep.js';

import LimitsGraphs from './components/limits/limitsGraphs.component.limits.js';

var url = config.url.API_URL;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserId = async () => {    
      try {
        const result = await fetch(`${url}/record/checkAuth`, {
          method: 'GET',
          credentials: 'include',
        })
        const answer = await result.json();
        if (answer.authenticated) {
          setIsAuthenticated(true);
          setUserId(answer.userId);
        } else {
          setIsAuthenticated(false);
          // navigate("/loginWithGoogle");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
        // navigate("/loginWithGoogle");
      }
    }

    fetchUserId();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
        if (userId) {
          try {
            const response = await fetch(`${url}/users/fetchUsername?userId=${encodeURIComponent(userId)}`, {
                method: 'GET',
                credentials: 'include',
            })
            const data = await response.json();
            if (data.username) {
                setUsername(data.username);
                setAvatarUrl(data.avatar);
                setLoading(false);
            } else {
                // navigate("/loginWithGoogle");
                setLoading(false);
            }
          } catch (error) {
            console.error("Error checking authentication:", error);
            // navigate("/loginWithGoogle");
          } finally {
            setLoading(false);
          }
        }
    };
      
    fetchData();
  }, [userId]);  

  const location = useLocation();
  const hideNavOnRoutes = ["/", "/loginWithGoogle"];

  // this is added to make login with google work
  const [userEmail, setUserEmail] = useState();
  // if (loading) {
  //   return <div>Loading . . . </div>
  // }
  return (
    <div className="App text-center">
      {!hideNavOnRoutes.includes(location.pathname) && (      
        <Navigation 
          isAuthenticated={isAuthenticated}
          username={username}
          avatarUrl={avatarUrl}
        />
      )}
      <div className="appContent container-fluid m-0 p-0">
        <Routes>
          <Route exact path="/" element={<Splash />} />
          <Route path="/success" element={<Success />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/termsofservice" element={<TermsOfService />} />
          <Route path="/calculusHome" element={<CalculusHome
                                                  isAuthenticated={isAuthenticated}
                                                  userId={userId}
                                              />}
          />

          <Route path="/login" element={<Login
                                            // setIsAuthenticated={setIsAuthenticated}
                                            // setUserId={setUserId} 
                                        />} />
          <Route path="/register" element={<Register
                                            // setUsername={setUsername}
                                            // setCookie={setCookie} 
                                          />} />
          <Route path="/logout" element={<LogOut
                                            setIsAuthenticated={setIsAuthenticated}
                                            setUserId={setUserId}
                                        /> } />
          
          <Route path="/categories"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <QuizCategories />
                  </Protected>
                }
          />
          <Route path="/categoriesButtons" element={<QuizCategoriesButtons /> } />
          <Route path="/getQuestions/:categoryId" element={<GetQuestions /> } />
          <Route path="/quizBaseImages" element={<QuizBaseImages /> } />
          {/* <Route path="/quizTutorial" element={<QuizTutorial /> } /> */}

          <Route path="/quizHumanities/:categoryId" element={<QuizHumanities /> } />
          <Route path="/quizHumanitiesTopics" element={<QuizHumanitiesTopics /> } />
          <Route path="/mocktrialquiz" element={<QuizHumanities /> } />
          
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
                  <Protected isAuthenticated={isAuthenticated}>
                    <Multiplication />
                  </Protected>
                }
          />
          <Route path="/calculus"
                element={
                    <Calculus userId={userId}/>
                }
          />
          <Route path="/exponentsTopics"
              element={
                  <ExponentsTopics userId={userId}/>
              }
          />        
          <Route path="/exponents/:topic"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <Exponents userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/exponents2/:topic"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <Exponents2 userId={userId}/>
                  </Protected>
                }
          />          
          <Route path="/exponentsVariety/:topic"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <ExponentsVariety userId={userId}/>
                  </Protected>
                }
          />                    
          <Route path="/derivatives/:topic"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <Derivatives userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/derivativesTopics"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <DerivativesTopics userId={userId}/>
                  </Protected>
                }
          />

          <Route path="/powerRuleTopics"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <PowerRuleTopics userId={userId}/>
                  </Protected>
                }
          />

          <Route path="/powerRuleSkills/:skill"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <PowerRuleSkills userId={userId}/>
                  </Protected>
                }
          />

          <Route path="/skillComplete"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <SkillComplete userId={userId}/>
                  </Protected>
                }
          />

          <Route path="/markdown"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <Markdown userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/progressChoices"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <ProgressChoices userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/singleUsersProgress/:username"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <SingleUsersProgress userId={userId}/>
                  </Protected>
                }
          />                    
          <Route path="/usersCC"
                element={
                    <UsersCC userId={userId}/>
                }
          />
          <Route path="/userActionsCC"
                element={
                    <UserActionsCC userId={userId}/>
                }
          />
          <Route path="/userProgress"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <UserProgress userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/classProgress"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <ClassProgress userId={userId}/>
                  </Protected>
                }
          />
        <Route path="/manageClasses"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <ManageClasses userId={userId}/>
                  </Protected>
                }
          />                    
          <Route path="/createClass"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <CreateClass userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/listClasses"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <ListClasses userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/viewClass/:classCode"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <ViewClass userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/createTargets"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <CreateTargets userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/trigonometricTopics"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <TrigonometricTopics userId={userId}/>
                  </Protected>
                }
          />          
          <Route path="/trigonometricFunctions/:topic"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <TrigonometricFunctions userId={userId} />
                  </Protected>
                } 
          />                                                                                                            
          <Route path="/trigonometricDerivatives/:topic"
                  element={
                    <Protected isAuthenticated={isAuthenticated}>
                      <TrigonometricDerivatives userId={userId} />
                    </Protected>
                  } 
          />
          <Route path="/naturalTopics"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <NaturalTopics userId={userId}/>
                  </Protected>
                }
          />                    
          <Route path="/naturalDerivatives/:topic"
                  element={
                    <Protected isAuthenticated={isAuthenticated}>
                      <NaturalDerivatives userId={userId} />
                    </Protected>
                  } 
          />
          <Route path="/integrationTopics"
                element={
                    <IntegrationTopicsDetails userId={userId}/>
                }
          />                    
          <Route path="/integration/:topic"
                element={
                  
                    <Integration userId={userId}/>
                  
                }
          />                                        
          <Route path="/derivativeRules"
                  element={
                    <Protected isAuthenticated={isAuthenticated}>
                      <DerivativeRules userId={userId} />
                    </Protected>
                  } 
          />
          <Route path="/gptFlashcard"
                  element={
                    <Protected isAuthenticated={isAuthenticated}>
                      <FlippableCard userId={userId} />
                    </Protected>
                  } 
          />
          <Route path="/gfgFlashcard"
                  element={
                    <Protected isAuthenticated={isAuthenticated}>
                      <GFGFlippableCard userId={userId} />
                    </Protected>
                  } 
          /> 
          <Route path="/cardStack"
                  element={
                    <Protected isAuthenticated={isAuthenticated}>
                      <CardStack userId={userId} />
                    </Protected>
                  } 
          /> 
          <Route path="/cardSlide"
                  element={
                    <Protected isAuthenticated={isAuthenticated}>
                      <CardSlide userId={userId} />
                    </Protected>
                  } 
          /> 
          <Route path="/quizTutorial"
                  element={
                    <Protected isAuthenticated={isAuthenticated}>
                        <QuizTutorial userId={userId} />
                    </Protected>
                  }
          />
          <Route path="/tutorialTopics"
                  element={
                    <Protected isAuthenticated={isAuthenticated}>
                        <TutorialTopics userId={userId} />
                    </Protected>
                  }
          />                              
          {/* <Route path="/derivativesStandards"
                  element={
                    <Protected isAuthenticated={isAuthenticated}>
                        <DerivativesStandards userId={userId} />
                    </Protected>
                  }
          />                               */}
          <Route path="/derivativeRulesStandards"
                  element={
                    <Protected isAuthenticated={isAuthenticated}>
                        <DerivativeRulesStandards userId={userId} />
                    </Protected>
                  }
          />                                        
          <Route path="/standardsCategories"
                  element={
                    <Protected isAuthenticated={isAuthenticated}>
                        <StandardsCategories userId={userId} />
                    </Protected>
                  }
          />
          <Route path="/standardsTopics/:category"
                  element={
                    <Protected isAuthenticated={isAuthenticated}>
                      <StandardsTopics userId={userId} />
                   </Protected>
                  }
          />                                                                                                                                                                       
          <Route path="/standardsTracker/:categoryWord/:topic"
                  element={
                    <Protected isAuthenticated={isAuthenticated}>
                      <StandardsTracker userId={userId} />
                   </Protected>
                  }
          />    
          <Route path="/summerPrepTopics"
                element={
                    <SummerPrepTopics userId={userId}/>
                }
          />
          <Route path="/multiplicationTopics"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <MultiplicationTopics userId={userId}/>
                  </Protected>
                }
          />                      
          <Route path="/cubesAndSquares/:topic"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <CubesAndSquares userId={userId}/>
                  </Protected>
                }
          />            
          <Route path="/identifyingFunctions"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <IdentifyingFunctions userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/identifyingFunctionsExtractAnswers"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <IdentifyingFunctionsExtractAnswers userId={userId}/>
                  </Protected>
                }
          />           
          <Route path="/plottingPoints/:topic"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <PlottingPoints userId={userId}/>
                  </Protected>
                }
          />                  

         <Route path="/plottingPointsPolynomials"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <PlottingPointsPolynomials userId={userId}/>
                  </Protected>
                }
          />                                                                                                                                                                                                                                                                                                                                                     
         <Route path="/plottingPointsTopics"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <PlottingPointsTopics userId={userId}/>
                  </Protected>
                }
          />                                                                                                                                                                                                                                                                                                                                                     


          <Route path="/graphingFunctions"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <GraphingFunctions userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/factoringQuadratics/:topic"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <FactoringQuadratics userId={userId}/>
                  </Protected>
                }
          />
         <Route path="/factoringQuadraticsTopics"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <FactoringQuadraticsTopics userId={userId}/>
                  </Protected>
                }
          />                                                                                                                                                                                                                                                                                                                                                     
          <Route path="/exponentsSummer"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <ExponentsSummer userId={userId}/>
                  </Protected>
                }
          />  
          <Route path="/exponentsSummerGPT"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <ExponentsSummerGPT userId={userId}/>
                  </Protected>
                }
          />            
          <Route path="/svgGraphs"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <SVGGraphs userId={userId}/>
                  </Protected>
                }
          />                                                                                                                                                                             
          <Route path="/functionNotation"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <FunctionNotation userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/equationsOfLines"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <EquationsOfLines userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/limitsGraphs"
                element={
                  <Protected isAuthenticated={isAuthenticated}>
                    <LimitsGraphs userId={userId}/>
                  </Protected>
                }
          />                                                                                                                                                       
          <Route path="/loginWithGoogle"
                element={
                    <LoginWithGoogle setUserEmail={setUserEmail} />
                }
          />                                                                                                                                                       


                                                                                                            
          </Routes> 
      </div>
    </div>
  );
}

export default App;

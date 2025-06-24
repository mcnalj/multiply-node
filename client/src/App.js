import React, { useEffect, useState } from 'react';
import { config} from './components/constants';
import { useCookies } from 'react-cookie';
import './App.scss';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Protected from './components/Protected';
import Navigation from "./components/navbar/navbar.component.navbar";
import Splash from './components/splash.component.js';
import Success from './components/success.component';
import Login from './components/auth/auth.component.login.js';
import Register from './components/auth/auth.component.register.js';
import LogOut from './components/auth/auth.component.logout.js';
import LoginWithGoogle from './components/auth/auth.component.loginWithGoogle.js';

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

import Multiplication from './components/multiply/multiply.component.multiplication.js';
import Calculus from './components/calculus/calculus.component.calculus';
import ExponentsTopics from './components/calculus/calculus.component.exponentsTopics';
import Exponents from './components/calculus/calculus.component.exponents';
import Exponents2 from './components/calculus/calculus.component.exponents2';
import ExponentsVariety from './components/calculus/calculus.component.exponentsVariety';
import Derivatives from './components/derivatives/derivatives.component.derivatives.js';
import DerivativesTopics from './components/derivatives/derivatives.component.derivativesTopics.js';
// import ProgressTracker from './components/userInfo/userInfo.component.GPTProgressTracker';

import SkillComplete from './components/calculus/calculus.component.skillComplete'

import PowerRuleTopics from './components/derivatives/derivatives.component.powerRuleTopics.js';
import PowerRuleSkills from './components/derivatives/derivatives.component.powerRuleSkills.js';

import Markdown from './components/calculus/calculus.component.markdown';
import PrivacyPolicy from './components/auth/auth.component.privacy.js';
import TermsOfService from './components/auth/auth.component.termsofservice.js';

import DerivativeRules from './components/flashcards/flashcards.component.derivativeRules.js';
import FlippableCard from './components/flashcards/flashcards.component.gptFlashcard.js';
import GFGFlippableCard from './components/flashcards/flashcards.component.gfgFlashcard.js';
import CardStack from './components/flashcards/flashcards.component.cardStack.js';
import CardSlide from './components/flashcards/flashcards.component.cardSlide.js';

import UserSkillsCompleted from './components/userInfo/userInfo.component.userSkillsCompleted.js';
import UserProgress from './components/userInfo/userInfo.component.progress';
import ClassProgress from './components/userInfo/userInfo.component.classProgress';
import ProgressChoices from './components/userInfo/userInfo.component.progressChoices';
import SingleUsersProgress from './components/userInfo/userInfo.component.singleUsersProgress';
import UsersCC from './components/userInfo/userInfo.component.usersCC.js';
import UserActionsCC from './components/userInfo/userInfo.component.userActionsCC.js';
import Roadmap from './components/userInfo/userInfo.component.userActionsGPT.js';

import ManageClasses from './components/auth/auth.component.manageClasses.js';
import CreateClass from './components/auth/auth.component.createClass.auth.js';
import ListClasses from './components/auth/auth.component.listClasses.js';
import CreateTargets from './components/class/class.component.createTargets';
import ViewClass from './components/class/class.component.viewClass';

import TrigonometricTopics from './components/derivatives/derivatives.component.trigonometricTopics.js';
import TrigonometricFunctions from './components/derivatives/derivatives.component.trigonometricFunctions.js';
import TrigonometricDerivatives from './components/derivatives/derivatives.component.trigonometricDerivatives.js';

import UnitCircle from './components/summerPrep/summerPrep.component.unitCircle.js';

import NaturalTopics from './components/derivatives/derivatives.component.naturalTopics.js';
import NaturalDerivatives from './components/derivatives/derivatives.component.naturalDerivatives.js';

import IntegrationTopicsDetails from './components/integration/integration.component.integrationTopicsDetails';
import Integration from './components/integration/integration.component.integration';

import DerivativeRulesStandards from './components/standards/derivativeRulesStandards.component.standards.js';
import DerivativesStandards from './components/standards/derivativesStandards.component.standards';
import StandardsCategories from './components/standards/standardsCategories.component.standards';
import StandardsTopics from './components/standards/standardsTopics.component.standards';
import StandardsTracker from './components/standards/standardsTracker.component.standards';

import SummerPrepTopics from './components/summerPrep/summerPrepTopics.component.summerPrep.js';
import MultiplicationTopics from './components/summerPrep/summerPrep.component.multiplicationTopics.js';
import CubesAndSquares from './components/summerPrep/summerPrep.component.cubesAndSquares.js';
import IdentifyingFunctions from './components/summerPrep/summerPrep.component.identifyingFunctions.js';
import IdentifyingFunctionsExtractAnswers from './components/summerPrep/summerPrep.component.identifyingFunctionsExtractAnswers.js';
import PlottingPointsTopics from './components/summerPrep/summerPrep.component.plottingPointsTopics.js';
import PlottingPoints from './components/summerPrep/summerPrep.component.plottingPoints.js';
import PlottingPointsPolynomials from './components/summerPrep/summerPrep.component.plottingPointsPolynomials.js';
import GraphingFunctions from './components/summerPrep/summerPrep.component.graphingFunctions.js';
import FactoringQuadraticsTopics from './components/summerPrep/summerPrep.component.factoringQuadraticsTopics.js';
import FactoringQuadratics from './components/summerPrep/summerPrep.components.factoringQuadratics.js';
import ExponentsSummer from './components/summerPrep/summerPrep.component.exponentsSummer.js';
import ExponentsSummerGPT from './components/summerPrep/summerPrep.component.exponentsSummerGPT.js';
import SVGGraphs from './components/summerPrep/svgGraphs.component.summerPrep.js';
import FunctionNotation from './components/summerPrep/summerPrep.component.functionNotation.js';
import EquationsOfLines from './components/summerPrep/summerPrep.component.equationsOfLines.js';
import UnitCircleTopics from './components/summerPrep/summerPrep.component.unitCircleTopics.js';

import LimitsGraphs from './components/limits/limits.component.limitsGraphs.js';

var url = config.url.API_URL;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authChecked, setAuthChecked] = useState(false);
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
      } finally {
        setAuthChecked(true);
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
                  <Protected isAuthenticated={isAuthenticated}
                    authChecked={authChecked}>
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
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <Multiplication />
                  </Protected>
                }
          />
          <Route path="/calculus"
                element={
                  <Protected 
                    isAuthenticated={isAuthenticated}
                    authChecked={authChecked}>
                    <Calculus userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/exponentsTopics"
              element={
                  <ExponentsTopics userId={userId}/>
              }
          />        
          <Route path="/exponents/:topic"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <Exponents userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/exponents2/:topic"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <Exponents2 userId={userId}/>
                  </Protected>
                }
          />          
          <Route path="/exponentsVariety/:topic"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <ExponentsVariety userId={userId}/>
                  </Protected>
                }
          />                    
          <Route path="/derivatives/:topic"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <Derivatives userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/derivativesTopics"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <DerivativesTopics userId={userId}/>
                  </Protected>
                }
          />

          <Route path="/powerRuleTopics"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <PowerRuleTopics userId={userId}/>
                  </Protected>
                }
          />

          <Route path="/powerRuleSkills/:skill"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <PowerRuleSkills userId={userId}/>
                  </Protected>
                }
          />

          <Route path="/skillComplete"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <SkillComplete userId={userId}/>
                  </Protected>
                }
          />

          <Route path="/markdown"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <Markdown userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/progressChoices"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <ProgressChoices userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/userSkillsCompleted"
                element={
                  // <Protected isAuthenticated={isAuthenticated}>
                    <UserSkillsCompleted userId={userId}/>
                  // </Protected>
                }
          />    
          {/* <Route path="/GPTProgressTracker"
                element={
                    <ProgressTracker userId={userId}/>
                }
          />                                */}
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
          <Route path="/userActionsGPT"
                element={
                    <Roadmap userId={userId}/>
                }
          />
          <Route path="/userProgress"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <UserProgress userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/classProgress"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <ClassProgress userId={userId}/>
                  </Protected>
                }
          />
        <Route path="/manageClasses"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <ManageClasses userId={userId}/>
                  </Protected>
                }
          />                    
          <Route path="/createClass"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <CreateClass userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/listClasses"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <ListClasses userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/viewClass/:classCode"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <ViewClass userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/createTargets"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <CreateTargets userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/trigonometricTopics"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <TrigonometricTopics userId={userId}/>
                  </Protected>
                }
          />          
          <Route path="/trigonometricFunctions/:topic"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <TrigonometricFunctions userId={userId} />
                  </Protected>
                } 
          />                                                                                                            
          <Route path="/trigonometricDerivatives/:topic"
                  element={
                    <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                      <TrigonometricDerivatives userId={userId} />
                    </Protected>
                  } 
          />

          <Route path="/unitCircle/:topic"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <UnitCircle userId={userId} />
                  </Protected>
                } 
          />
          <Route path="/naturalTopics"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <NaturalTopics userId={userId}/>
                  </Protected>
                }
          />                    
          <Route path="/naturalDerivatives/:topic"
                  element={
                    <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                      <NaturalDerivatives userId={userId} />
                    </Protected>
                  } 
          />
          <Route path="/integrationTopics"
                element={
                  <Protected 
                    isAuthenticated={isAuthenticated}
                    authChecked={authChecked}
                  >
                    <IntegrationTopicsDetails userId={userId}/>
                  </Protected>
                }
          />                    
          <Route path="/integration/:topic"
                element={
                  <Protected 
                    isAuthenticated={isAuthenticated}
                    authChecked={authChecked}
                  >
                    <Integration userId={userId}/>
                  </Protected>
                }
          />                                        
          <Route path="/derivativeRules"
                  element={
                    <Protected 
                      isAuthenticated={isAuthenticated}
                      authChecked={authChecked}
                    >
                      <DerivativeRules userId={userId} />
                    </Protected>
                  } 
          />
          <Route path="/gptFlashcard"
                  element={
                    <Protected 
                      isAuthenticated={isAuthenticated}
                      authChecked={authChecked}
                    >
                      <FlippableCard userId={userId} />
                    </Protected>
                  } 
          />
          <Route path="/gfgFlashcard"
                  element={
                    <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                      <GFGFlippableCard userId={userId} />
                    </Protected>
                  } 
          /> 
          <Route path="/cardStack"
                  element={
                    <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                      <CardStack userId={userId} />
                    </Protected>
                  } 
          /> 
          <Route path="/cardSlide"
                  element={
                    <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                      <CardSlide userId={userId} />
                    </Protected>
                  } 
          /> 
          <Route path="/quizTutorial"
                  element={
                    <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                        <QuizTutorial userId={userId} />
                    </Protected>
                  }
          />
          <Route path="/tutorialTopics"
                  element={
                    <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
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
                    <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                        <DerivativeRulesStandards userId={userId} />
                    </Protected>
                  }
          />                                        
          <Route path="/standardsCategories"
                  element={
                    <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                        <StandardsCategories userId={userId} />
                    </Protected>
                  }
          />
          <Route path="/standardsTopics/:category"
                  element={
                    <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                      <StandardsTopics userId={userId} />
                   </Protected>
                  }
          />                                                                                                                                                                       
          <Route path="/standardsTracker/:categoryWord/:topic"
                  element={
                    <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                      <StandardsTracker userId={userId} />
                   </Protected>
                  }
          />    
          <Route path="/summerPrepTopics"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <SummerPrepTopics userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/multiplicationTopics"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <MultiplicationTopics userId={userId}/>
                  </Protected>
                }
          />                      
          <Route path="/cubesAndSquares/:topic"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <CubesAndSquares userId={userId}/>
                  </Protected>
                }
          />            
          <Route path="/identifyingFunctions"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <IdentifyingFunctions userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/identifyingFunctionsExtractAnswers"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <IdentifyingFunctionsExtractAnswers userId={userId}/>
                  </Protected>
                }
          />           
          <Route path="/plottingPoints/:topic"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <PlottingPoints userId={userId}/>
                  </Protected>
                }
          />                  

         <Route path="/plottingPointsPolynomials"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <PlottingPointsPolynomials userId={userId}/>
                  </Protected>
                }
          />                                                                                                                                                                                                                                                                                                                                                     
         <Route path="/plottingPointsTopics"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <PlottingPointsTopics userId={userId}/>
                  </Protected>
                }
          />                                                                                                                                                                                                                                                                                                                                                     


          <Route path="/graphingFunctions"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <GraphingFunctions userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/factoringQuadratics/:topic"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <FactoringQuadratics userId={userId}/>
                  </Protected>
                }
          />
         <Route path="/factoringQuadraticsTopics"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <FactoringQuadraticsTopics userId={userId}/>
                  </Protected>
                }
          />                                                                                                                                                                                                                                                                                                                                                     
          <Route path="/exponentsSummer"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <ExponentsSummer userId={userId}/>
                  </Protected>
                }
          />  
          <Route path="/exponentsSummerGPT"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <ExponentsSummerGPT userId={userId}/>
                  </Protected>
                }
          />            
          <Route path="/svgGraphs"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <SVGGraphs userId={userId}/>
                  </Protected>
                }
          />                                                                                                                                                                             
          <Route path="/functionNotation"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <FunctionNotation userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/equationsOfLines"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <EquationsOfLines userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/unitCircleTopics"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <UnitCircleTopics userId={userId}/>
                  </Protected>
                }
          />
          <Route path="/limitsGraphs"
                element={
                  <Protected isAuthenticated={isAuthenticated} authChecked={authChecked}>
                    <LimitsGraphs userId={userId}/>
                  </Protected>
                }
          />                                                                                                                                                       
          <Route path="/loginWithGoogle"
                element={
                    <LoginWithGoogle
                      setUserEmail={setUserEmail}
                      setIsAuthenticated={setIsAuthenticated}
                      setUserId={setUserId}
                    />
                }
          />                                                                                                                                                       


                                                                                                            
          </Routes> 
      </div>
    </div>
  );
}

export default App;

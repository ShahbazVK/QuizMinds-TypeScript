import './App.css'
import React,{useState,useEffect} from 'react'
import QuestionCard from './components/QuestionCard'
import { fetchQuizQuestions } from './API'
import { Difficulty, QuestionState } from './API'
import styled from 'styled-components'

//Styled components
const StyledButton=styled.button`
  border: none;
  width: 15rem;
  height: 4rem;
  font-size: x-large;
  font-weight: bolder;
  letter-spacing: 0.1rem;
  background-color: ${(props)=>props.variant==="nextButton"? "orange":"green"};
  color:white;
  cursor: pointer;
  &:hover{
    background-color: ${(props)=>props.variant==="nextButton"?"#bb841e":"#066106"};
  }
`
const CentreDiv= styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
`

const TOTAL_QUESTIONS=10

type AnswerObject={
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {

  const [loading, setloading] = useState(false)
  const [questions, setquestions] = useState <QuestionState[]> ([])
  const [number, setnumber] = useState(0)
  const [userAnswers, setuserAnswers] = useState <AnswerObject[]> ([])
  const [score, setscore] = useState(0)
  const [gameOver, setgameOver] = useState(true)
  const [isAnswerCorrect, setisAnswerCorrect] = useState(false)

  // fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY)

  const startTrivia = async () => {
    setloading(true)
    setgameOver(false)

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)

    setquestions(newQuestions)
    setscore(0)
    setuserAnswers([])
    setnumber(0)
    setloading(false)
  }
  const checkAnswers = (e: React.MouseEvent <HTMLButtonElement> ) => {
    const answer = e.target.outerText

    const correct = questions[number].correct_answer === answer
    
    if (correct) {
      setscore(score + 1)
      setisAnswerCorrect(true)
    }

    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer,
    }
    setuserAnswers(prev=>[...prev,answerObject])
  }
  const nextQuestion = () => {
    const nextQuestion=number+1
    if (nextQuestion===TOTAL_QUESTIONS){
      setgameOver(true)
    }
    else {
      setnumber(nextQuestion) 
      setisAnswerCorrect(false)
    }
  }

  useEffect(() => {
    
  }, [])
  

  return (
    <div style={{height:"100vh", fontSize:"1.5rem"}}>
      <h1>QuizMinds: Explore & Enlighten</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ?
      <CentreDiv>
        <StyledButton onClick={startTrivia}>Start Triva</StyledButton> 
      </CentreDiv>
      :
      null
      
    }
      { !gameOver ? <p> Score: {score} </p> : null }
      { loading ? <p> Loading Questions </p> : null }

      {!loading && !gameOver && 
      <QuestionCard 
        question={questions[number].question} 
        answers={questions[number].answers} 
        userAnswer={userAnswers ? userAnswers[number] : undefined } 
        callback={checkAnswers} 
        questionNr={number+1}
        totalQuestions={TOTAL_QUESTIONS}
        isAnswerCorrect={isAnswerCorrect}
      />}
        <br />

      {
        !gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS -1 ? 
        <StyledButton variant="nextButton" onClick={nextQuestion}>Next Question</StyledButton> : null
      }
    </div>
  )
}

export default App

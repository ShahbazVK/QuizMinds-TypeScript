import React,{useState,useEffect} from 'react'
import styled from 'styled-components'

const Div=styled.div`
    background-color: #000000a0;
    color: white;
    padding: 2rem;
`
const OptionButton=styled.button`
    border: 1 px solid black;
    border-radius: 8px;
    background-color: #3d4547;
    color: white;
    font-size: large;
    padding: 1rem 1rem 1rem 1rem;
    cursor: pointer;
    &:hover{
        background-color: #282d2e;
    }
`
type Props = {
    question: string;
    answers: string[];
    callback: (e:  React.MouseEvent <HTMLButtonElement>) => void; 
    userAnswer: any;
    questionNr: number;
    totalQuestions: number;
    isAnswerCorrect: any;
}

const QuestionCard: React.FC <Props> = ({question, answers, callback, userAnswer, questionNr, totalQuestions, isAnswerCorrect}) => {
    const [selectedOptionKey, setselectedOptionKey] = useState <number> (-1)
    const callBackOnClick=(e: React.MouseEvent< HTMLElement >, key: number)=>{
        setselectedOptionKey(key)
        callback(e)
    }
    useEffect(() => {
        setselectedOptionKey(-1)
    }, [questionNr])
    
  return (
    <Div>
        <p>Question: {questionNr} / {totalQuestions}</p>
        <br />
        <p dangerouslySetInnerHTML={{ __html:question }}/>
        <br />
        <div>
            {answers.map((answer,key)=>{
                return(
                    <div style={{display:"flex",justifyContent:"center", alignItems:"center", flex:1}} key={key}>
                        <OptionButton style={{backgroundColor:selectedOptionKey===key && isAnswerCorrect?"green":selectedOptionKey===key && !isAnswerCorrect? "red" : ""}} disabled={userAnswer} value={answer} onClick={ (e) => callBackOnClick(e, key) } >
                            <span dangerouslySetInnerHTML={{ __html: answer}}></span>
                        </OptionButton>
                        <br />
                        <br />
                    </div>
                )
            })}
        </div>
    </Div>
  )
}

export default QuestionCard
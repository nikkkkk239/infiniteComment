import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Comment from './Comment'
import { commentContext } from './helper/context'

function App() {
  const {state,dispatch}=useContext(commentContext)
  const [text, setText] = useState('')
  useEffect(()=>{
    localStorage.setItem('comments',JSON.stringify(state))
  },[state])
  const handleCommentAdd=()=>{
    dispatch({type:'addComment',payload:{text}})
    setText('')
  }
  return (
    <>
      
      <div>
        <input type="text" placeholder='type...' value={text} onChange={(e)=>{setText(e.target.value)}} />
        <button onClick={handleCommentAdd}>comment</button>
      </div>
      <ul style={{display:'flex',flexDirection:'column',gap:'20px'}}>
        {state.comments.map((comment,i)=>{
          return <Comment comment={comment} key={i}/>
        })}
      </ul>


    </>
  )
}

export default App

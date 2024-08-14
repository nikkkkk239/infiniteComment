import React, { useContext, useState } from 'react'
import { commentContext } from './helper/context'

function Comment({comment,index}) {
    const {state,dispatch}=useContext(commentContext)
    const [replyClicked,setReplyClicked]=useState(false)
    const [reply,setReply] =useState('')
    const handleReply=(id)=>{
        console.log('comment id',comment.id)
        dispatch({type:'addReply',payload:{text:reply,id:id}})
        setReply('')
        setReplyClicked(false)
    }
  return (
    <li key={index}>
        <span>{comment.text}</span>
        <div style={{display:'flex',gap:'20px'}}>
            <button style={{cursor:'pointer'}} onClick={()=>{setReplyClicked(!replyClicked)}}>reply</button>
            <span>edit</span>
            <span>delete</span>
        </div>
        {
            replyClicked && <div>
                <input type="text" placeholder='' value={reply} onChange={(e)=>{setReply(e.target.value)}} />
                <button disabled={reply==''?true:false} onClick={()=>handleReply(comment.id)}>reply</button>
                <button disabled={reply==''?true:false}>cancel</button>

            </div>
        }
        <ul>
        {
            state.replies.map((reply,i)=>{
                if(reply.parentId==comment.id){
                    return <Comment comment={reply} key={i}/>
                }
            })
        }
        </ul>
    </li>   
       
  )
}

export default Comment
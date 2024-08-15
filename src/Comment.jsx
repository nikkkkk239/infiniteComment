import React, { useContext, useState } from 'react'
import { commentContext } from './helper/context'

function Comment({comment,index}) {
    const {state,dispatch}=useContext(commentContext)
    const [replyClicked,setReplyClicked]=useState(false)
    const [reply,setReply] =useState('')
    const [newText,setNewText]=useState('')
    const handleReply=(id)=>{
        console.log('comment id',comment.id)
        dispatch({type:'addReply',payload:{text:reply,id:id}})
        setReply('')
        setReplyClicked(false)
    }
    const handleEdit=(id,text)=>{
        setNewText(text)
        dispatch({type:'changeEdit',payload:{editableId:id}})
    }
    const handleSave=(id)=>{
        dispatch({type:'save',payload:{saveId:id,newText:newText}})
    }
    const handleCancel=(id)=>{
        dispatch({type:'cancel',payload:{cancelId:id}})
    }
    const handleDelete=(id)=>{
        dispatch({type:'delete',payload:{deleteId:id}})
    }
  return (

    <li key={index}>
        
        
            {
                comment.editable ? 
                <>
                    <input type='text' value={newText} onChange={(e)=>{setNewText(e.target.value)}}/>
                    <div style={{display:'flex',gap:'20px'}}>
                            
                            <button onClick={()=>handleSave(comment.id)}>save</button>
                            <button onClick={()=>handleCancel(comment.id)}>cancel</button>
                    </div>
                </>
                :<>
                    <span>{comment.text}</span>
                    <div style={{display:'flex',gap:'20px'}}>
                    <button style={{cursor:'pointer'}} onClick={()=>{setReplyClicked(!replyClicked)}}>reply</button>
                    <button style={{cursor:'pointer'}} onClick={()=>handleEdit(comment.id,comment.text)}>edit</button>
                    <button onClick={()=>handleDelete(comment.id)}>delete</button>
                    </div>
                </>
            }
        
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
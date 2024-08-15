import { createContext, useReducer } from "react";
import {nanoid} from 'nanoid'
export const commentContext=createContext({})
export const CommentContextProvider=({children})=>{
    const reducer=(state,action)=>{
        switch (action.type){
            case 'addComment':
                return {
                    ...state,
                    comments:[
                        ...state.comments,
                        {
                            text:action.payload.text,
                            id:nanoid(),
                            editable:false,
                        }
                    ]
                }
            case 'addReply':
                return {
                    ...state,
                    replies:[
                        ...state.replies,
                        {
                            text:action.payload.text,
                            parentId:action.payload.id,
                            id:nanoid(),
                            editable:false,
                        }
                    ]
                }
                // return state.map((comment)=>{
                //     if(comment.id == action.payload.commentId){
                //         return {
                //             ...comment,replies:[...comment.replies,{
                //                 text:action.payload.text,
                //                 id:nanoid(),
                //                 editable:false,
                //                 replies:[]
                //             }]
                //         }
                //     }else{
                //         return comment
                //     }
                // })
            case 'changeEdit':
                return {
                    replies : state.replies.map((reply,id)=>{
                        if(reply.id == action.payload.editableId)
                            return {...reply,editable:true}
                        else
                            return reply
                        
                    }),
                    comments : state.comments.map((comment,id)=>{
                        if(comment.id == action.payload.editableId)
                            return {...comment,editable:true}
                        else
                            return comment
                    })
                }
                case 'cancel':
                    return {
                        replies : state.replies.map((reply,id)=>{
                            if(reply.id == action.payload.cancelId)
                                return {...reply,editable:false}
                            else
                                return reply
                            
                        }),
                        comments : state.comments.map((comment,id)=>{
                            if(comment.id == action.payload.cancelId)
                                return {...comment,editable:false}
                            else
                                return comment
                        })
                    }
                    case 'delete':
                        return {
                            replies : state.replies.filter((reply,id)=>{
                                return reply.id!=action.payload.deleteId
                                
                            }),
                            comments : state.comments.filter((comment,id)=>{
                                return comment.id != action.payload.deleteId
                            })
                        }
            case 'save':
                return {
                    replies : state.replies.map((reply,id)=>{
                        if(reply.id == action.payload.saveId)
                            return {...reply,text:action.payload.newText,editable:false}
                        else
                            return reply
                        
                    }),
                    comments : state.comments.map((comment,id)=>{
                        if(comment.id == action.payload.saveId)
                            return {...comment,text:action.payload.newText,editable:false}
                        else
                            return comment
                    })
                }
            default:
                return state
        }
    }
    const [state,dispatch]=useReducer(reducer,{comments:[],replies:[]},()=>{
        try {
            const local=localStorage.getItem('comments')
            return local ? JSON.parse(local) : {comments:[],replies:[]}
        } catch (error) {
            return {comments:[],replies:[]}
        }
        
    })
    return <commentContext.Provider value={{state,dispatch}}>
        {children}
    </commentContext.Provider>
}
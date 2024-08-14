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
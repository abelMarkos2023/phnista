import React, { useState } from 'react'
import useToast from './useToast'
import useAuthStore from '../Store/authStore'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../Firebase/Firebase'
import { usePostStore } from '../Store/usePostStore'
import { FeedStore } from '../Store/FeedStore'

const usePostComment = () => {
    const {showToast} = useToast()
    const {user} = useAuthStore()
    const {addComment} = usePostStore()
    const [commenting,setCommenting] = useState(false)
    const {setComments} = FeedStore()

    const postComment = async (postId,comment,isFeed) => {

        const commentObj = {
            postId,
            comment,
            createdAt:Date.now(),
            createdBy:user.uid
        }
        try {
            setCommenting(true)
            const post = doc(firestore,'posts',postId)
            await updateDoc(post,{comments:arrayUnion(commentObj)})
            if(isFeed){
                setComments(commentObj,postId);
            }
            else{
                addComment(commentObj,postId)
            }
            //if(!isFeed){
                
           
           
            //}
            setCommenting(false)
            showToast('Success','Comment Added Successfully','success')

        } catch (error) {
            showToast('Error',error.message,'error')
            console.log(error)
            setCommenting(false)
        }
    }
  return {commenting,postComment}
}

export default usePostComment
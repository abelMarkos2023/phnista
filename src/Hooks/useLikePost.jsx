import React, { useState } from 'react'
import useToast from './useToast'
import useAuthStore from '../Store/authStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../Firebase/Firebase'
import { FeedStore } from '../Store/FeedStore'
import { usePostStore } from '../Store/usePostStore'

const useLikePost = (post) => {
    const {showToast} = useToast()
    const {user} = useAuthStore()
    const [liking,setLiking] = useState(false)
    const [isLiked,setIsLiked] = useState(post?.likes.includes(user?.uid))
    const [likes,setLikes] = useState(post?.likes.length)
    const {setLikes:modLikes} = FeedStore()
    const {toggleLike} = usePostStore()
    const likePost = async (isFeed = false) => {
        if(!user) {
            showToast("Error",'You are Not Logged In','error')
            return
        }
        try {
            setLiking(true)
            const postRef = doc(firestore,'posts',post.id)
            await updateDoc(postRef,{
            likes:isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)  
            })
            setIsLiked(!isLiked)
            setLikes(isLiked? likes - 1 : likes + 1)
            setLiking(false)
            toggleLike(post.id,user.uid)

           if(isFeed){
            modLikes(isLiked,post.id,user.uid)
           }
            showToast('Success','Post Liked','success')

        } catch (error) {
            showToast("Error",error.message,'error')
            setLiking(false)
            console.log(error)
            
        }
    }

  return {isLiked,liking,likePost,likes}
}

export default useLikePost
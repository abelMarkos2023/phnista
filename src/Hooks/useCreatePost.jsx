import React, { useState } from 'react'
import useToast from './useToast'
import useAuthStore from '../Store/authStore'
import { useUserProfile } from '../Store/userProfileStore'
import { usePostStore } from '../Store/usePostStore'
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { firestore, storage } from '../Firebase/Firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { FeedStore } from '../Store/FeedStore'

const useCreatePost = () => {
    const {showToast} = useToast()
    const {user} = useAuthStore()
    const {addPost} = useUserProfile()
    const {setPost} = usePostStore()
    const addPostToFeed = FeedStore(state => state.addPost)

    const [loading,setLoading] = useState(false)
    const createNewPost = async (inputs) => {
        const {caption,image} = inputs;
        if(!caption ||!image)
        {
            showToast('Error','Please fill all the fields','error')
            return
        }
        const newPost = {
            caption,
            likes:[],
            comments:[],
            createdAt:new Date().toISOString(),
            createdBy:user?.uid,
            userName:user.userName,
        }
        console.log(newPost)
        try {
            setLoading(true)
            const postRef = await addDoc(collection(firestore,'posts'),newPost)
            const userRef =  doc(firestore,'users',user.uid)
            const imageRef = ref(storage,`posts/${postRef.id}`)
            await updateDoc(userRef,{posts:arrayUnion(postRef.id)})
            await uploadString(imageRef,image,'data_url')
            const downloadURL = await getDownloadURL(imageRef)
            await updateDoc(postRef,{imageURL:downloadURL})
            newPost.imageURL = downloadURL;
            setPost({...newPost,id:postRef.id})

            showToast('Success','Post Created Successfully','success')
            setLoading(false)
            addPostToFeed({...newPost,id:postRef.id})
        } catch (error) {
            showToast('Error',error.message,'error')
            console.log(error)
            setLoading(false)
        }
    }

  return {loading,createNewPost}
}

export default useCreatePost;
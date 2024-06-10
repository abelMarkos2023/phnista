import React, { useEffect, useState } from 'react'
import useToast from './useToast'
import { usePostStore } from '../Store/usePostStore'
import { useUserProfile } from '../Store/userProfileStore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../Firebase/Firebase'

const useGetPosts = () => {
    const [loading,setLoading] = useState(false)
    const {posts,setPosts} = usePostStore()
    const {userProfile} = useUserProfile()
    const {showToast} = useToast();

    useEffect(() => {
        const getPosts = async() => {

            try {
                setLoading(true)
                const postRef = collection(firestore,'posts');
                const query1 = query(postRef,where('createdBy','==',userProfile.uid))
                const querySnapshot = await getDocs(query1);
                if(querySnapshot.empty){
                   showToast('Error','No Posts for this user','error')
                   setLoading(false)
                   setPosts([])
                   return
                }
                const posts = []
                querySnapshot.forEach(doc => {
                    posts.push({...doc.data(),id:doc.id})
                })
                posts.sort((a,b) => a.createdAt - b.createdAt)
                setPosts([...posts])
                setLoading(false)
                showToast("Success",'Posts Fetched Successfully','success')
            } catch (error) {
                setLoading(false)
                showToast("Error",error.message,'error')
                console.log(error)
            }
        }

        getPosts()
    },[])
  return{posts,loading}
}

export default useGetPosts
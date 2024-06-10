import {useEffect, useState} from 'react'
import useAuthStore from '../Store/authStore'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { firestore } from '../Firebase/Firebase'
import useToast from './useToast'
import { FeedStore } from '../Store/FeedStore'

const useGetFeed = () => {
    const [loading,setLoading] = useState(false)
    const [posts,setPosts] = useState([])
    const {user} = useAuthStore()
    const {showToast} = useToast()
    const {setFeed} = FeedStore()
    const followingUser = [];
    if(user?.following.length > 0){
        user.following.forEach(user => {
            followingUser.push(user)
        })
    }
    followingUser.push(user.uid)

    

    useEffect(() => {
        const getFeed = async () => {
            try {
                setLoading(true)
            const querySnap = query(collection(firestore,'posts'),where('createdBy','in',followingUser))
            const feed = await getDocs(querySnap)
            if(feed.empty){
                showToast('Error','No Posts Found','error')
            }
            let postsData = [];
            feed.forEach(doc => {
                postsData.push({...doc.data(),id:doc.id})
            })
            //postsData.sort((a,b) => a.createdAt - b.createdAt)
            setFeed(postsData)
            setLoading(false)
            } catch (error) {
                showToast('Error',error.message,'error')
            }
        }
        getFeed()
    },[])
  return {loading,posts}
}

export default useGetFeed
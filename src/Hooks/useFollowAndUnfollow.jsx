import React, { useEffect, useState } from 'react'
import useAuthStore from '../Store/authStore'
import { useUserProfile } from '../Store/userProfileStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../Firebase/Firebase';
import useToast from './useToast';
import suggestedUserStore from '../Store/suggestedUserStore';


//fou hold a text with either a 'Follow' or 'Unfollow' value
const useFollowAndUnfollow = (userId,fou) => {
const {user,setUser} = useAuthStore();
const [updating,setUpdating] = useState(false)
const {userProfile,setUserProfile} = useUserProfile()
const {followUser} = suggestedUserStore()
const {showToast} = useToast();


const followToggler = async() => {
    setUpdating(true)

    const currentUserRef = doc(firestore,'users',user.uid)
    const otherUserRef = doc(firestore,'users',userId)
    try {
        
   await updateDoc(currentUserRef,{
        following:fou == 'Unfollow' ? arrayRemove(userId) : arrayUnion(userId)
    })
    
    await updateDoc(otherUserRef,{
        followers:fou == 'Unfollow' ? arrayRemove(user.uid) : arrayUnion(user.uid)
    })
    setUser({ 
        ...user,
        following : fou == 'Unfollow' ? user.following.filter(uid => uid !== userId) : [...user.following,userId]
    })
    // setUserProfile({
    //     ...userProfile,
    //     followers : fou == 'Unfollow'? userProfile.followers.filter(uid => uid !== userId) : [...userProfile.followers,userId]
    // })
    const userNew = {
        ...user,
        following:fou == 'Unfollow' ? user.following.filter(uid => uid !== userId) : [...user.following,userId]
    }
   
    localStorage.setItem('userInfo',JSON.stringify(userNew))
    showToast('Success',`${fou == 'Follow' ? 'User Followed Successfully' :'User Unfollowed Successfully'}`)
    setUpdating(false)
    followUser(UserId,user.uid,fou)
    } catch (error) {
        showToast("Error",error.message,'error')
        console.log(error)
        setUpdating(false)
    }
   

}

  return {updating,followToggler}
}

export default useFollowAndUnfollow
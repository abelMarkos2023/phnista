import React, { useState,useEffect } from 'react'
import useAuthStore from '../Store/authStore'
import useToast from './useToast'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { firestore } from '../Firebase/Firebase'
import suggestedUserStore from '../Store/suggestedUserStore'

const useGetSuggestedUser = () => {
    const {user} = useAuthStore()
    const {showToast} = useToast()
    const [loading,setLoading] = useState(true);
    const [sugestedUsers,setSugestedUsers] = useState([])
    const {setSuggestedUsers} = suggestedUserStore()

    const out = [...user.following,user.uid]

     useEffect(() => {
      const getUsers = async() => {

      try {
        const userRef = collection(firestore,'users');
        const q = query(userRef,where('uid','not-in',[user.uid,...user.following]),orderBy('uid'),limit(4))
        //const q = query(userRef);
        const querySnap = await getDocs(q);
  
        if(querySnap.empty){
          showToast("Error","No Suggested User Found",'error')
          setLoading(false)
          return;
        }
        const users = [] 
        // querySnap.forEach(doc => {
        //   out.includes(doc.data().uid) !== true && users.push(doc.data())
        // });
        querySnap.forEach(doc => {
          users.push({...doc.data(),id:doc.id})
        })
        console.log(users)
        setSugestedUsers(users)
        setLoading(false)

        setSuggestedUsers(users)
  
      } catch (error) {
        console.log(error)
      }
      }
      if(user){
        getUsers()
        setLoading(false)
      }
    }, [])
  return {sugestedUsers,loading}
}

export default useGetSuggestedUser
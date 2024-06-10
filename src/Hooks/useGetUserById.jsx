import React, { useEffect, useState } from 'react'
import useToast from './useToast'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../Firebase/Firebase'
import { useUserProfile } from '../Store/userProfileStore'

const useGetUserById = (id) => {

    const [loading,setLoading] = useState(true)
    const {showToast} = useToast()
    const [user,setUser] = useState({})

    useEffect(()=>{
        const getUserProfile = async ()=> {
            let userData;
            try {
                const q = query(collection(firestore,'users'),where('uid','==',id))
                const userSnapshot = await getDocs(q)
                if(!userSnapshot.empty){
                    userSnapshot.forEach(doc => {
                        userData = {...doc.data()}
                    })
                    setLoading(false)
                   setUser(userData)
                }else{
                    showToast('Error','User Not Found','error')
                    return null
                }
            } catch (error) {
                console.log(error.message)
                showToast('Error',error.message,'error')
            }

        }
        getUserProfile(); 
    },[loading])
  return {user,loading}
}

export default useGetUserById
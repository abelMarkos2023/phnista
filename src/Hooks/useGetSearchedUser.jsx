import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { firestore } from '../Firebase/Firebase'
import useToast from './useToast'

const useGetSearchedUser = () => {
  const [loading,setLoading] = useState(false)
  const [user,setUser] = useState()
  const {showToast} = useToast()
  const getUserInfo = async(username) => {
    setLoading(true)
    const querySnap = query(collection(firestore,'users'),where('userName','==',username))

    try {
        const snapshot = await getDocs(querySnap)
        if(snapshot.empty){
            showToast("Error","User Not Found",'error')
            return;
        }
        snapshot.forEach(doc => setUser(doc.data()))

        setLoading(false)
    } catch (error) {
        showToast("Error",error.message,'error')
        setLoading(false)
    }
    finally{
        setLoading(false)
    }
  }

  return {loading,user,getUserInfo}
}

export default useGetSearchedUser
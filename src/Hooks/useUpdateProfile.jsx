import React, { useState } from 'react'
import useToast from './useToast'
import useAuthStore from '../Store/authStore'
import {useUserProfile} from '../Store/userProfileStore'

import { storage,firestore } from '../Firebase/Firebase'
import { ref,uploadString,getDownloadURL } from 'firebase/storage'
import  {doc,updateDoc} from 'firebase/firestore'

const useUpdateProfile = () => {
  const [isLoading,setIsLoading] = useState(false)

  const {showToast} = useToast()
  const {user,setUser} = useAuthStore()
  const {setUserProfile} = useUserProfile()

  const editProfile = async(inputs,selectedFile) => {

    if(!user) {
      showToast("Error",'In the middle of Processing the previous Request','error')
      return
    }
     else {
      setIsLoading(true)
     
      try {
          const storageRef = ref(storage,`userProfilePicture/${user.uid}`)
          const userRef = doc(firestore,'users',user.uid)
          let url = ''
          if(selectedFile){
        await uploadString(storageRef,selectedFile,'data_url')
        url = await getDownloadURL(storageRef)

        const updatedUser = {
          ...user,
          fullName: inputs.fullName || user.fullName,
          userName: inputs.userName || user.userName,
          bio:inputs.bio || user.bio,
          profilePic : url || user.profilePic
        }
        await updateDoc(userRef,updatedUser)
        localStorage.setItem('userInfo',JSON.stringify(updatedUser))
        setUser(updatedUser)
        setUserProfile(updatedUser)
        setIsLoading(false)
          }

      } catch (error) {
          showToast("Error",error.message,'error')
      }
    }
  }

  return {editProfile,isLoading}
}

export default useUpdateProfile
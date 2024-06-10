import React from 'react'
import {Image,Flex,Text} from "@chakra-ui/react"
import Google from '../assets/google.png'
import { auth, firestore } from '../Firebase/Firebase'
import {useSignInWithGoogle} from 'react-firebase-hooks/auth'
import useAuthStore from '../Store/authStore'
import useToast from '../Hooks/useToast'
import { doc, getDoc, setDoc } from 'firebase/firestore'
const GoogleAuth = ({prefix}) => {
  const [signInWithGoogle,user,loading,error] = useSignInWithGoogle(auth)

  const {login} = useAuthStore()

  const {showToast} = useToast()

  const handleClick = async() => {
     try {
      const googleUser = await signInWithGoogle()

      if(!googleUser.user || error){
        showToast('Error','Server Error','error')
        return
      }

      const userRef = doc(firestore,'users',googleUser.user.uid);
      const userSnap = await getDoc(userRef);
      if(userSnap.exists()){

        const userInfo = userSnap.data()
        localStorage.setItem('userInfo',JSON.stringify(userInfo))
        login(userInfo)
        return
      }
      else{
          const userDoc = {
              uid:googleUser.uid,
              userName:googleUser.email.split('@')[0],
              fullName:googleUser.displayName,
              email:googleUser.email,
              bio:"",
              profilePic:googleUser.photoURL,
              posts:[],
              followers:[],
              following:[],
              createdAt:Date.now()
          }
  
          const user = await setDoc(doc(firestore,'users',googleUser.uid),userDoc)
          localStorage.setItem('userInfo',JSON.stringify(user))
          //navigate('/')
         login(user)
      
      }
      ////
     

      /////
     } catch (error) {
      showToast('Error',error.message,'error')
      console.log(error)
     }
  }
  return (
    <Flex alignItems={'center'} cursor={'pointer'} gap={1} onClick={handleClick}>
    <Image w={'5'} src={Google}  />
    <Text>{prefix} with Google</Text>
</Flex>
  )
}

export default GoogleAuth
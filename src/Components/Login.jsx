import React, { useState } from 'react'
import {Input,Button} from "@chakra-ui/react"
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useToast from '../Hooks/useToast';
import useAuthStore from '../Store/authStore';
import { auth, firestore } from '../Firebase/Firebase';
import { doc, getDoc } from 'firebase/firestore';
const Login = () => {
    const [input,setInput] = useState({email:"",password:""});
    const {showToast} = useToast()
    const {login} = useAuthStore()

    const [
      signInWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useSignInWithEmailAndPassword(auth);
    const handleFormSubmit = async () => {
      const {email,password} = input;
      if(!email,!password){
        showToast('Error','Please Fill out all the field');
        return;
      }
      try {
        const user = await signInWithEmailAndPassword(email,password)
        if(!user){
          showToast("Error",'Error Accured While Trying TO Log you in','error')
          return;
        }
        else{
          const docRef = doc(firestore,'users',user.user.uid);
          const userDoc = await getDoc(docRef)
          console.log(userDoc.data())
          localStorage.setItem('userInfo',JSON.stringify(userDoc.data()))
          login(userDoc.data())
        }
      } catch (error) {
        showToast("Error",error.message,'error')
      }
    }
  return (
    <>
        <Input 
                placeholder='Youe Email '
                fontSize={16}
                type='email'
                value={input.email}
                onChange={(e) => setInput({...input,email:e.target.value})}
                />
                <Input 
                placeholder='Youe Password '
                fontSize={16}
                type='password'
                value={input.password}
                onChange={(e) => setInput({...input,password:e.target.value})}
                />
                <Button isLoading = {loading} w={'full'} colorScheme='blue' fontSize={'16'} size={'md'} 
                onClick={handleFormSubmit}
                >
                    Login
                </Button>
    </>
  )
}

export default Login
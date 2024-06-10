import React, { useState } from 'react'

import {Input,Button,InputRightAddon,Alert,AlertIcon,InputGroup,InputRightElement} from "@chakra-ui/react"
import { TbViewfinder, TbViewfinderOff } from 'react-icons/tb';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

import useSignupWithEmailAndPassword from '../Firebase/useSignupWithEmailAndPassword';

const Signup = () => {
    const [input,setInput] = useState({email:"",password:"",fullName:"",userName:""});
    const [showPassword,setShowPassword] = useState(false)

    const {error,loading,signup} = useSignupWithEmailAndPassword();

    const handleSignup = () => {

    }

    const handleFormSubmit = () => {
      console.log(input)
      signup(input)
    }

  return (
    <>
    <Input 
                placeholder='Youe Email '
                size='sm'
                fontSize={16}
                type='email'
                value={input.email}
                onChange={(e) => setInput({...input,email:e.target.value})}
                />
                <Input 
                size='sm'
                placeholder='Your Full Name '
                fontSize={16}
                type='text'
                value={input.fullName}
                onChange={(e) => setInput({...input,fullName:e.target.value})}
                />
                <Input 
                size='sm'
                placeholder='Your User Name '
                fontSize={16}
                type='text'
                value={input.userName}
                onChange={(e) => setInput({...input,userName:e.target.value})}
                />

                <InputGroup>
                <Input 
                size='sm'
                placeholder='Youe Password '
                fontSize={16}
                type={showPassword ? 'text':'password'}
                value={input.password}
                onChange={(e) => setInput({...input,password:e.target.value})}
                />
                 <InputRightElement h='full'>
        <Button  onClick={() => setShowPassword(!showPassword)} h='1.75rem' size='sm'>
          {showPassword ? <FaEye size/> : <FaEyeSlash/>}
        </Button>
                 </InputRightElement>
                </InputGroup>
                {error && <Alert status='error' fontSize={12} p={2} borderRadius={4}>
                    <AlertIcon fontSize={10} />
                    {error.message}
                  </Alert>}
                

                <Button isLoading = {loading} w={'full'} colorScheme='blue' fontSize={'16'} size={'md'} 
                onClick={handleFormSubmit}
                >
                    Signup
                </Button>
    </>
  )
}

export default Signup
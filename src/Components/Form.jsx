import React, { useState } from 'react'
import {Box,Image,VStack,Input,Button,Flex,Text} from '@chakra-ui/react'
import Logo from '../assets/logo.png'
import {useNavigate} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import GoogleAuth from './GoogleAuth'
const Form = () => {
    const [isLogin,setIsLogin] = useState(true)
 
    const navigate = useNavigate()
    const handleFormSubmit = () => {

    }
  return (
    <>
        <Box border={'1px solid gray'} borderRadius={4} padding={5}>
            <VStack spacing={4}>
                <Image src={Logo} h={'24'} />
               
                {
                    isLogin ? <Login /> : <Signup />
                }
                {isLogin && (
                    <>
                    <Flex w={'full'} alignItems={'center'} gap={'1'} my={4}>
                    <Box flex={2} h={'1px'} bg={'gray.200'}/>
                    <Text color={'white'}>OR</Text>
                    <Box flex={2} h={'1px'} bg={'gray.200'}/>

                </Flex>
                
                    </>
                )}
                <GoogleAuth prefix={isLogin ? 'Login' : "Signup"}/>
                
            </VStack>
        </Box>
        <Box border={'1px solid gray'} borderRadius={4} padding={5}>
            <Flex alignItems={'center'} gap={2} justifyContent={'center'}>
                <Text>
                {
                    isLogin ?"Don't have an account":"Already have an account"
                }
                </Text>
                <Text color={'teal'} fontSize={'18'} onClick = {() => setIsLogin(prev => !prev)} cursor={'pointer'}>
                {
                    isLogin ? "Sign up" : "Login"
                }
                </Text>
            </Flex>
        </Box>
    </>
  )
}

export default Form
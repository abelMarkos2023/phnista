import React from 'react'
import {Container,Flex,Box,Image,VStack} from "@chakra-ui/react"
import Img from '../../assets/auth.png'
import Img1 from '../../assets/playstore.png'
import img2 from '../../assets/microsoft.png'
import Form from '../../Components/Form'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useNavigate} from 'react-router-dom'
import { auth as authorization } from '../../Firebase/Firebase'
import useAuthStore from '../../Store/authStore'

const Auth = () => {
  const [user,error,loading] = useAuthState(authorization)
  const auth = useAuthStore(state => state.user)
  const navigate = useNavigate()
  console.log('user ',user)
  console.log('authUser ',auth)
  if(auth){
   
    navigate('/')
    return
  }
  return (
    <Container maxW={'container.md'} padding={'0'}>
      <Flex minH="100vh" justifyContent={"center"} alignItems={"center"} px={4}>
        <Box display={{
          base:"none",md:"block"
        }}>
          <Image src={Img} h={650} aly='phone'/>
        </Box>
        <VStack spacing={4} align={'stretch'}>
          <Form />
          <Box textAlign={'cente'}>
            <Flex>
              <Image src={Img1} h={'10'}/>
              <Image src={img2} h={'10'}/>
            </Flex>
          </Box>
        </VStack>
      </Flex>
    </Container>
  )
}

export default Auth
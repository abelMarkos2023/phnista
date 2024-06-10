import React from 'react'
import Logo from '../assets/logo.png'
import {Flex,Container,Text,Button,Image} from "@chakra-ui/react"
import useAuthStore from '../Store/authStore'
import { Link } from 'react-router-dom'
import useLogout from '../Hooks/useLogout'
const Navbar = () => {
    const {user,logout} = useAuthStore()
    const {logout:logUserOut} = useLogout()

  return (
    <Container maxW={'container.lg'}>
        <Flex justifyContent={'space-between'} alignItems={'center'} py={8} px={0} w={'full'} >
          <Flex alignItems={'center'} >
            <Image h={10} src={Logo} />
          </Flex>
          
          <Flex alignItems={'center'} gap={2}>
                {
                    !user ? (
                        <>
                        <Link to ='/auth'>
                        <Button colorScheme={'blue'} variant={'outline'} >Login</Button>
                      </Link>
                      <Link to={'/auth'}></Link>
                      <Button colorScheme={'blue'} variant={'outline'} ml={2}>Sign Up</Button>
                      </>
                    ) : (
                        <>
                        <Text>{user.displayName ? user.displayName : user.email}</Text>
                        <Button onClick={() => {
                          logUserOut()
                          logout()
                        }}>
                            Logout
                        </Button>
                        </>
                    )
                }
            
            
          </Flex>
        </Flex>

    </Container>
  )
}

export default Navbar
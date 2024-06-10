import React from 'react'
import {Flex,Box} from "@chakra-ui/react"
import {useLocation} from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import useLogout from '../Hooks/useLogout'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../Firebase/Firebase'
import Navbar from '../Components/Navbar'


const PageLayout = ({children}) => {
  const [error,user,loading] = useAuthState(auth)
  const {logout} = useLogout()

  const {pathname} = useLocation()
  const isAuth = !user 
  return (
    <Flex>
      <Box w={{
        base:"5rem",
        md:"15rem",
      }}>
        
         <Sidebar />
        
      </Box>
      <Box flex={1} w={{base:"calc(100% - 5rem)",md:"calc(100% - 15rem)"}}>
        <Navbar />
        {
          children
        }
      </Box>
    </Flex>
  )
}

export default PageLayout
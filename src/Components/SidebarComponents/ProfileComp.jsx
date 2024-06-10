import React from 'react'
import {Box,Image,Flex,Link,Tooltip,Avatar,Button
} from "@chakra-ui/react"
import useAuthStore from '../../Store/authStore'

import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from '../../assets/constants'
import {Link as RouterLink} from 'react-router-dom'
const ProfileComp = () => {
    const {user} = useAuthStore()
  return (
    <Tooltip
                    hasArrow
                    placement='right'
                    label={'Profile'}
                    
                    openDelay={400}
                    display={{base:"block",md:"none"}}
                    >
                        <Link as={RouterLink} to={`/profile/${user?.userName}`}
                        display={'flex'}
                        alignItems={'center'}
                        gap={4}
                        _hover={{
                            bgColor:"whiteAlpha.300",

                        }}
                        p={2}
                        borderRadius={6}
                        >
                            <Avatar size={'sm'} src={user?.profilePic}/>
                            <Box display={{base:"none",md:"block"}}>
                                Profile
                            </Box>
                        </Link>
                    </Tooltip>
  )
}

export default ProfileComp
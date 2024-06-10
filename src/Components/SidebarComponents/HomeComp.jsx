import React from 'react'
import {Box,Image,Link,Flex,Tooltip,Avatar,Button
} from "@chakra-ui/react"
import {Link as RouterLink} from 'react-router-dom'
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from '../../assets/constants'
import { AiFillHome } from 'react-icons/ai'
const HomeComp = () => {
  return (
    <Tooltip
                    hasArrow
                    placement='right'
                    label={'home'}
                    
                    openDelay={400}
                    display={{base:"block",md:"none"}}
                    >
                        <Link
                        as={RouterLink}
                        display={'flex'}
                        alignItems={'center'}
                        to='/'
                        gap={4}
                        _hover={{
                            bgColor:"whiteAlpha.300",

                        }}
                        p={2}
                        borderRadius={6}
                        >
                            <AiFillHome size={30}/>
                            <Box display={{base:"none",md:"block"}}>
                                Home
                            </Box>
                        </Link>
                    </Tooltip>
  )
}

export default HomeComp
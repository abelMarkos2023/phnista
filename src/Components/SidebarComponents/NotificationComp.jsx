import React from 'react'
import {Box,Image,Link,Flex,Tooltip,Avatar,Button
} from "@chakra-ui/react"
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from '../../assets/constants'
const NotificationComp = () => {
  return (
    <Tooltip
    hasArrow
    placement='right'
    label={'Notification'}
   
    openDelay={400}
    display={{base:"block",md:"none"}}
    >
        <Link
        display={'flex'}
        alignItems={'center'}
        gap={4}
        _hover={{
            bgColor:"whiteAlpha.300",

        }}
        p={2}
        borderRadius={6}
        >
            <NotificationsLogo />
            <Box display={{base:"none",md:"block"}}>
                Notifications
            </Box>
        </Link>
    </Tooltip>
  )
}

export default NotificationComp
import React from 'react'
import {Flex,Avatar,VStack,Text} from "@chakra-ui/react"
import useGetUserById from '../Hooks/useGetUserById'

import {formatDistanceToNow} from 'date-fns'
const Comment = ({name,img,comment}) => {

  const {user} = useGetUserById(comment.createdBy)
  return (
    <Flex alignItems={'flex-start'} gap={2}>
                      <Avatar size='sm'  src={user.profilePic}/>
                      <Flex direction={'column'} flex={1} gap={0.2} w={'full'}>
                      <Text fontWeight={'bold'} color={'whiteAlpha.800'} fontSize={14}>{user.userName}</Text>
                      <Text px={2} fontSize={12} fontWeight={'bold'} flex={1} color={'gray.300'}>{
                      formatDistanceToNow(new Date(comment.createdAt),{addSuffix:true})
                    }</Text>
                      <Text fontSize={16}>{comment.comment}</Text>
                      </Flex>
                      
                    </Flex>
  )
}

export default Comment
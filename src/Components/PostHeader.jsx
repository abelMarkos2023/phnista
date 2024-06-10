import React from 'react'
import {Flex,Avatar,VStack,Box,Text,Button} from "@chakra-ui/react"
import Img from '../assets/img3.png'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import useFollowAndUnfollow from '../Hooks/useFollowAndUnfollow'
import useAuthStore from '../Store/authStore'
const PostHeader = ({avatar,username,item}) => {
  const {user} = useAuthStore()
  const fou = user?.following.includes(item.createdBy) ? "Unfollow" : 'Follow'
  const {updating,followToggler} = useFollowAndUnfollow(item.createdBy,fou)
  return (
<Flex justifyContent={'space-between'} alignItems={'center'} mb={4} w={'full'}>
<Flex gap={2} alignItems={'center'}>
<Link to={`/profile/${username}`}>

    <Avatar size={'sm'} objectFit={'cover'} borderRadius={'50%'} src={avatar}/>
    </Link>

    <VStack gap={0.3} alignItems={'flex-start'}>
    <Text fontSize={17}>
      <Link to={`/profile/${username}`}>
      {username}
      </Link>
      
      </Text>
    <Text fontSize={10} fontWeight={'bold'} textAlign={'left'}>

      {
        
        formatDistanceToNow(new Date(item.createdAt),{addSuffix:true})
      }
    </Text>
    </VStack>
</Flex>
<Box cursor={'pointer'}>
  {
    item.createdBy !== user.uid && (
      <Button 
      fontSize={'14'}
      color={'blue.500'}
      isLoading={updating}
      transition={'all 200ms ease-in'}
      onClick={() => followToggler()}
      _hover={{
          color:"white"
      }}
      >{fou}</Button>
    )
  }
{/*  */}
</Box>
</Flex>
)
}

export default PostHeader
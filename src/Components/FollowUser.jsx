import React from 'react'
import {Flex,Avatar,VStack,Text,Button} from '@chakra-ui/react'
import { Link,useNavigate } from 'react-router-dom';
import useAuthStore from '../Store/authStore'
import useFollowAndUnfollow from '../Hooks/useFollowAndUnfollow';


const FollowUser = ({image,username,followers,link,id,onClick}) => {
  
  const {user:logedInUser} = useAuthStore()

  const followOrUnfollow = logedInUser?.following.includes(id) ? 'Unfollow' : 'Follow'

  const {isFollowing,updating,followToggler} = useFollowAndUnfollow(id,followOrUnfollow)
  const navigate = useNavigate()

  const handleClick = id => {
    onClick(username)
    setTimeout(() => {
        navigate(`/profile/${username}`)
    }, 3000);
}
  return (
    <Flex alignItems={'center'} w={'full'} justifyContent={'space-between'} py={1}>
    <Flex alignItems={'flex-start'} gap={2}>
    <Avatar src={image} as={Link} to={link}/>
    <VStack gap={1}>
        <Text as={Link} onClick={handleClick}  to={link} fontSize={15} color={'white.300'}>
            {username}
        </Text>
        <Text fontSize={11} color={'gray.300'}>{followers} Followers</Text>
    </VStack>
    </Flex>
    <Button as={Link} to='/' bgColor={'transparent'} isLoading={updating} onClick={() => followToggler()}>{followOrUnfollow}</Button>
</Flex>
  )
}

export default FollowUser
import React from 'react'
import {Box,Flex,VStack,Avatar,Text,Button} from '@chakra-ui/react'
import Img1 from '../assets/img1.png';
import Img2 from '../assets/img2.png';
import Img3 from '../assets/img3.png';
import Img4 from '../assets/img4.png';
import { Link } from 'react-router-dom';
import FollowUser from './FollowUser';
import useAuthStore from '../Store/authStore';
import useLogout from '../Hooks/useLogout';
import useGetSuggestedUser from '../Hooks/useGetSuggestedUser';
import suggestedUserStore from '../Store/suggestedUserStore';

const SuggestedUsers = () => {
  const {loading:sLoading,sugestedUsers} = useGetSuggestedUser()
  //const {sugestedUsers} = useGetSuggestedUser()
  const {logout,loading} = useLogout()
  const {user} = useAuthStore()

  const handleLogout = () => {
    logout()
  }
  if(sLoading) return null;
  return (
    <VStack gap={6} w={'full'} display={'flex'} position={'sticky'} top={10}>
        <Flex w={'full'} alignItems={'center'} gap={2} >
          <Link to={`/profile/${user?.uid}`}>
          <Avatar size={'sm'} objectFit={'cover'} borderRadius={'50%'} src={user?.profilePic}/>

          </Link>
            <Link flex={1} to={`/profile/${user?.userName}`}>
            <Text  bgColor={'transparent'}>{user?.userName}</Text>
            </Link>
            <Button isLoading={loading} onClick={() => handleLogout()}>Logout</Button>
        </Flex>
        <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'}>
            <Text fontSize={16}>Suggested For You</Text>
            <Text as={Link} to='/'>See All</Text>
        </Flex>
    <Box w={'full'} display={'flex'} flexDirection={'column'} gap={0.2}>
        {
          sugestedUsers.map(user => (
            <FollowUser key={user.uid} image={user.profilePic} username={user.userName} link={`/profile/${user.userName}`} id={user.uid} followers={user.followers.length}/>

          ))
        }
    {/* <FollowUser image={Img3} username='Chris Doe' link='/' followers='12534'/>
    <FollowUser image={Img4} username='Jane Doe' link='/' followers='12304'/> */}
    </Box>

    <Text>&copy; 2024 Develoed By Abel Markos</Text>
    </VStack>
  )
}

export default SuggestedUsers
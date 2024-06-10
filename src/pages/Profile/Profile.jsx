import React, { useState } from 'react'
import {VStack,Box,Flex,Text,Button,Avatar,Link,Container,SkeletonCircle,Skeleton,useDisclosure} from '@chakra-ui/react'

import Img1 from '../../assets/img1.png'
import { GiPostStamp } from 'react-icons/gi'
import { BiSave } from 'react-icons/bi'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import ProfilePosts from '../../Components/ProfilePosts'
import { useSearchParams,useParams } from 'react-router-dom'
import useGetUserProfileByUserName from '../../Hooks/useGetUserProfileByUserName'
import useAuthStore from '../../Store/authStore'
import EditProfile from './EditProfile'
import useFollowAndUnfollow from '../../Hooks/useFollowAndUnfollow'
import { useUserProfile } from '../../Store/userProfileStore'
import { usePostStore } from '../../Store/usePostStore'
const Profile = () => {
  const [tap,setTap] = useState('posts')
  const [follow,setFollow] = useState(false)
  const {username} = useParams()
  const {user:logedInUser} = useAuthStore()
  const {loading,userProfile} = useGetUserProfileByUserName(username)
  const {userProfile:profileUser} = useUserProfile()
  const {isOpen,onOpen,onClose} = useDisclosure()
 const {posts}= usePostStore()

  
  const followOrUnfollow = logedInUser?.following.includes(userProfile?.uid) ? 'Unfollow' : 'Follow'
  const {isFollowing,updating,followToggler} = useFollowAndUnfollow(userProfile?.uid,followOrUnfollow)

  return loading ? <ProfilePageSkeleton /> : (
    <Container maxW={'container.lg'}>
    <Flex flexDirection={'column'} gap={4} justifyContent={'center'} alignItems={'center'}>
      <Flex gap={8} direction={{base:'column',md:'row'}} alignItems={'flex-start'} w={'full'} borderBottom={'1px solid gray' } p={{base:4,md:20}}>
        <Avatar src={userProfile?.profilePic} size={{base:'xl',md:'2xl'}}/>
        <Flex direction={'column'} w={'full'} gap={4}>
          <Flex gap={6} alignSelf={'flex-start'}>
            <Text fontSize={{base:18,md:20}}>{profileUser?.userName}</Text>
            {logedInUser.uid == userProfile.uid ?( <Button bgColor={'white'} color={'black'} onClick={onOpen}>Edit Profile</Button>) :(
              <Button isLoading={updating} onClick={() => {
                  followToggler()
                  setFollow(!follow)
              }} bgColor={'blue.500'} _hover={{bgColor:"blue.600"}} color={'white'}>{followOrUnfollow}</Button>
            )
}
          </Flex>
          <Flex w={'full'} gap={3}>
            <Text>
              {posts.length} Posts
            </Text>
            <Text>{profileUser?.followers.length} Follower</Text>
            <Text>{profileUser?.following.length} following</Text>
          </Flex>
          <Text>{profileUser?.bio}</Text>
        </Flex>
      </Flex>
    </Flex>
    <Flex w='full' justifyContent='center' alignItems={'center'}>
    <Flex alignItems={'center'} gap={4}>
      <Box fontSize={'20px'} fontWeight={'500'} onClick={() => setTap('posts')} cursor='pointer' py={2} borderTop={tap === 'posts' && '3px solid white'} display='flex' alignItems={'center'} gap={2}>
        <GiPostStamp size={18}/>
        <Text>Posts</Text>
      </Box>
      <Box fontSize={'20px'} fontWeight={'500'} onClick={() => setTap('saved')} cursor='pointer' py={2} borderTop={tap === 'saved' && '3px solid white'} display='flex' alignItems={'center'} gap={2}>
        <BiSave size={18}/>
        <Text>Saved</Text>
      </Box>
      <Box fontSize={'20px'} fontWeight={'500'} onClick={() => setTap('likes')} cursor='pointer' py={2} borderTop={tap === 'likes' && '3px solid white'} display='flex' alignItems={'center'} gap={2}>
        <MdFavoriteBorder size={18}/>
        <Text>Likes</Text>
      </Box>
    </Flex>
    </Flex>
    <ProfilePosts />
    {
      isOpen && <EditProfile isOpen={isOpen} onClose={onClose} userProfile={userProfile}/>
    }
    </Container>
  )
}

const ProfilePageSkeleton = () => (
  <Flex
  gap={{base:4,sm:10}}
  justifyContent={'center'}
  alignItems={'center'}
  direction={{base:'column',md:"row"}}
  py={10}

  >
    <SkeletonCircle size={'24'} />
    <VStack>
      <Skeleton h={'10px'} w={'200px'}/>
      <Skeleton h={'10px'} w={'120px'}/>
    </VStack>
  </Flex>
)

export default Profile
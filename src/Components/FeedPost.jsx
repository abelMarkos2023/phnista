import React from 'react'
import {Box,Image} from '@chakra-ui/react'
import Img from '../assets/img1.png'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import useGetUserById from '../Hooks/useGetUserById'
const FeedPost = ({item}) => {
  const {user} = useGetUserById(item?.createdBy)
  return (
    <Box my={8}>

    <PostHeader avatar={user.profilePic} username={user.userName} item={item}/>

    <Box my={2}>
        <Image src={item?.imageURL} width={'full'} objectFit={'cover'}/>
    </Box>
  <PostFooter username={user?.userName} isFeed={true} item={item} id ={item.id} />
    </Box>
  )
}

export default FeedPost
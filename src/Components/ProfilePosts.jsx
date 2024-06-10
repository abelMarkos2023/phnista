import React,{useEffect, useState} from 'react'
import {Grid,Box,VStack,Skeleton} from "@chakra-ui/react"


import Img1 from '../assets/img1.png'
import Img2 from '../assets/img2.png'
import Img4 from '../assets/img4.png'
import Img3 from '../assets/img3.png'
import Post from './Post'
import useGetPosts from '../Hooks/useGetPosts'
import {usePostStore} from '../Store/usePostStore'

const ProfilePosts = () => {
    const {posts,loading} = useGetPosts()
   const {posts:profilePost} = usePostStore()
    
  return (
    <Grid templateColumns={{
        base:"repeat(1,1fr)",
        md:"repeat(2,1fr)",
        lg:"repeat(3,1fr)",
        "2xl":"repeat(4,1fr)"
      }} gap={10}>
        {
            loading && [1,2,3,4,5].map(idx => (
                <VStack>
                    <Skeleton w={'full'}>
                        <Box h='300px'></Box>
                    </Skeleton>
                </VStack>
            ))
        }
        {
            !loading && profilePost.map(item => (
                <Post key={item.id} image={item.imageURL} item={item}/>
            ))
        }
    </Grid>
  )
}

export default ProfilePosts
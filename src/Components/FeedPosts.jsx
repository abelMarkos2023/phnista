import React, { useState } from 'react'
import {Container,Flex,Skeleton,SkeletonCircle,VStack} from '@chakra-ui/react'
import FeedPost from './FeedPost'

import { useEffect } from 'react'
import useGetFeed from '../Hooks/useGetFeed'
import { FeedStore } from '../Store/FeedStore'



const FeedPosts = () => {
  const {loading,posts} = useGetFeed()
  const {feed} = FeedStore()
  
  return (
    <Container maxW={'container.sm'} py={10} px={2}>

      <VStack gap={4} w={'full'}>
      {loading && [0,1,2,3,4,5].map(item => (
        <VStack gap={2} w={'full'} key={item}>
          <Flex gap={2} w={'full'} alignItems={'flex-start'}>
          <SkeletonCircle size={16}/>
          <VStack flex={1} w={'full'} gap={2} alignItems={'flex-start'}>
            <Skeleton h={'10px'} w={'200px'}/>
            <Skeleton h={'10px'} w={'120px'}/>
            <Skeleton w='full' h='400px'/>
          </VStack>
          <Skeleton w='40px' h='10px'/>
        </Flex>
        </VStack>
      ))}
      </VStack>
      {!loading && feed.map(item => (
        <FeedPost key={item.id} item={item} />

      ))}
        

    </Container>
  )
}

export default FeedPosts
import React from 'react'
import {Container,Box,Flex} from '@chakra-ui/react'
import FeedPosts from '../../Components/FeedPosts'
import SuggestedUsers from '../../Components/SuggestedUsers'
const Home = () => {

  return (
    <Container maxW={'container.xl'}>
      <Flex gap={10} py={10} px={0} w={'full'} >
        <Box  flex={3}>
          <FeedPosts />
        </Box>
        <Box flex={2} mr={1} w={'full'} display={{
          base:"none",lg:"block"
        }}>
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  )
}

export default Home
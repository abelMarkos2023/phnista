import React, { useRef } from 'react'

import {Box,Image,Link,Flex,Tooltip,Avatar,Button,Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    Heading,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    useColorModeValue,
    Stack
} from "@chakra-ui/react"

import {useNavigate} from 'react-router-dom'
import useAuthStore from '../../Store/authStore'

import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from '../../assets/constants'
import useGetSearchedUser from '../../Hooks/useGetSearchedUser'
import FollowUser from '../FollowUser'

const SearchComp = () => {
    const {isOpen,onOpen,onClose} = useDisclosure()
    const searchRef = useRef('')
    const navigate = useNavigate()
    const {loading:loadingUser,getUserInfo,user:searchedUser} = useGetSearchedUser()

    const handleModal = () => {
        onOpen()
        console.log('opeening modal')
    }


    const handleSearchUser = () => {
    getUserInfo(searchRef.current.value)
    console.log(searchedUser)
    searchRef.current.value = ''
}

const handleClick = id => {
    onClose()
    setTimeout(() => {
        navigate(`/profile/${id}`)
    }, 3000);
}
  return (
    <>
    <Tooltip
                    hasArrow
                    placement='right'
                    label={'Search'}
                    
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
                            <SearchLogo />
                            <Box display={{base:"none",md:"block"}} onClick = {handleModal}>
                                Search
                            </Box>
                        </Link>
                    </Tooltip>


<Modal isCentered={true} size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay  bg='none'
        backdropFilter='auto'
        backdropInvert='80%'
        backdropBlur='2px'/>
        <ModalContent>

        <ModalCloseButton />
        <ModalBody bg={useColorModeValue('gray.50', 'gray.800')}>
        <Flex
        //minH={'100vh'}
        align={'center'}
        justify={'center'}
        w={'full'}

        >
        <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
        User Search
        </Heading>
        <FormControl id="userName">

   <FormLabel htmlFor='image'  w="full" cursor={'pointer'}
   display={'inline-block'} p={2} borderRadius={5} bg={'gray.500'} textAlign={'center'}
   >Search User By userName</FormLabel>
   <Input type='text' 
   ref={searchRef}
   placeholder='User Name..'
   />
 
</FormControl>




<Stack spacing={6} direction={['column', 'row']}>
<Button
 bg={'red.400'}
 color={'white'}
 w="full"
 onClick={onClose}
 _hover={{
   bg: 'red.500',
 }}>
 Cancel
</Button>
<Button
 bg={'blue.400'}
 color={'white'}
 w="full"
 onClick={handleSearchUser}
 isLoading={loadingUser}
 _hover={{
   bg: 'blue.500',
 }}>
 Submit
</Button>
</Stack>
</Stack>
</Flex>
{searchedUser && <Flex>
    <FollowUser  image={searchedUser.profilePic} username={searchedUser.userName} followers={searchedUser.followers.length} id={searchedUser.uid} link={`/profile/${searchedUser.userName}`}/>
</Flex>}

</ModalBody>
</ModalContent>
</Modal>
</>
  )
}

export default SearchComp
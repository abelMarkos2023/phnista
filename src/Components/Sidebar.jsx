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
import Logo from '../assets/logo.png'
import { Link as RouterLink,useNavigate } from 'react-router-dom'
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from '../assets/constants'
import { AiFillHome } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'
import { BiLogOut } from 'react-icons/bi'
import useLogout from '../Hooks/useLogout'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../Firebase/Firebase'
import useAuthStore from '../Store/authStore'
import useGetSearchedUser from '../Hooks/useGetSearchedUser'
import HomeComp from './SidebarComponents/HomeComp'
import NotificationComp from './SidebarComponents/NotificationComp'
import SearchComp from './SidebarComponents/SearchComp'
import ProfileComp from './SidebarComponents/ProfileComp'
import CreatePostComp from './SidebarComponents/CreatePostComp'
const Sidebar = () => {
    const {error,user,loading} = useAuthState(auth)
    const {user:authUser} = useAuthStore()
    const {isOpen,onOpen,onClose} = useDisclosure()
    const searchRef = useRef('')
    const navigate = useNavigate()
    const {logout} = useAuthStore()
    const {logout:logUserOut} = useLogout()
    const {loading:loadingUser,getUserInfo,user:searchedUser} = useGetSearchedUser(searchRef.current.value)

        const handleModal = () => {
            onOpen()
            console.log('opeening modal')
        }
    

    const handleSearchUser = () => {
        getUserInfo()
        console.log(searchedUser)
    }
    const logoutUser = () => {
        logout()
       logUserOut()
       navigate('/auth')
    }
    if(!authUser){
        return null
    }
  return (
    <>
    <Box
    h={"100vh"}
    borderRight={"1px solid"}
    borderColor={"alphaWhite.300"}
    px={{base:2,md:4}}
    py={8}
    position={'sticky'}
    left={0}
    top={0}
    >
       <Flex direction="column" w={'full'} h={'full'} gap={10}>
       <Link to='/' as={RouterLink} pl={2} display={{base:"none",md:"block"}} cursor={'pointer'}>
        <InstagramLogo/>
        </Link>
        <Link to='/' as={RouterLink} pl={2} display={{base:"block",md:"none"}} cursor={'pointer'}>
        <InstagramMobileLogo />
        </Link>
        <Flex direction={'column'} gap={4} justifyContent={{
            base:"center",md:"flex-start"
        }} cursor={'pointer'} my={2} flex={1}>
            <HomeComp />
            <NotificationComp />
            <SearchComp />
            
            <CreatePostComp />
            <ProfileComp />
        </Flex>

        <Tooltip
                    hasArrow
                    placement='right'
                    label='Logout'
                    
                    openDelay={400}
                    display={{base:"block",md:"none"}}
                    >
                        <Flex
                        alignItems={'center'}
                        gap={4}
                        _hover={{
                            bgColor:"whiteAlpha.300",

                        }}
                        p={2}
                        borderRadius={6}
                        >
                            <BiLogOut size={25}/>
                            <Box as={Button} isLoading={loading} onClick={logoutUser} display={{base:"none",md:"block"}}>
                                Logout
                            </Box>
                        </Flex>
                    </Tooltip>

       </Flex>
    </Box>

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
   >Change Icon</FormLabel>
   <Input type='file' 
   ref={searchRef}
   id='image'
   opacity={0}
   accept='image/*'
   onChange={e => handleFileSelection(e)}
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
</ModalBody>
</ModalContent>
</Modal>
</>
  )
}

export default Sidebar
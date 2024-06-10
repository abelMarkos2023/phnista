import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    Modal,
    ModalOverlay,
ModalContent,
ModalCloseButton,
ModalBody
  } from '@chakra-ui/react';
  import { SmallCloseIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import usePreviewImage from '../../Hooks/usePreviewImage';
import useUpdateprofile from '../../Hooks/useUpdateProfile';
import {useNavigate} from 'react-router-dom'
import useToast from '../../Hooks/useToast';

  
  export default function EditProfile({isOpen,onClose,userProfile}) {
   const [inputs,setInputs] = useState(userProfile)
   const {editProfile,isLoading} = useUpdateprofile()
   const {showToast} = useToast()
   const picRef = useRef(null)
   const {handleFileSelection,selectedFile} = usePreviewImage()
   const navigate = useNavigate()
   const handleEditProfile = async() => {
   try {
    await editProfile(inputs,selectedFile)
    showToast("Success",'Profile Updated Successfully','success')
    onClose()
   } catch (error) {
    showToast('Error',error.message,'error')
   }
    //navigate('/profile/'+ userProfile.uid)

   }

    return (
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
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={selectedFile ?? userProfile.profilePic}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <FormLabel htmlFor='image'  w="full" cursor={'pointer'}
                display={'inline-block'} p={2} borderRadius={5} bg={'gray.500'} textAlign={'center'}
                >Change Icon</FormLabel>
                <Input type='file' 
                ref={picRef}
                id='image'
                opacity={0}
                accept='image/*'
                onChange={e => handleFileSelection(e)}
                />
              </Center>
            </Stack>
          </FormControl>
          <Flex w={'full'} gap={1}>
          <FormControl id="userName" isRequired>
            
            <FormLabel>User name</FormLabel>
            <Input
              value={inputs.userName}
              name='userName'
              onChange={e => setInputs({...inputs,[e.target.name]:e.target.value})}
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl id="fullName" isRequired>
            <FormLabel>Full name</FormLabel>
            <Input
              value={inputs.fullName}
              name='fullName'
              onChange={e => setInputs({...inputs,[e.target.name]:e.target.value})}
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
            </Flex>
           
          <FormControl id="bio" isRequired>
            <FormLabel>User Bio</FormLabel>
            <Input
              value={inputs.bio}
              name='bio'
              onChange={e => setInputs({...inputs,[e.target.name]:e.target.value})}
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          {/* <Flex w={'full'} gap={1}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
             value={inputs.email}
             name='email'
              onChange={e => setInputs({...inputs,[e.target.name]:e.target.value})}
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
            name='password'
            onChange={e => setInputs({...inputs,[e.target.name]:e.target.value})}
              placeholder="password"
              _placeholder={{ color: 'gray.500' }}
              type="password"
            />
          </FormControl>
          </Flex> */}
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
              onClick={handleEditProfile}
              isLoading={isLoading}
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
    );
  }
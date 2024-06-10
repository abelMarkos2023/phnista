import React from 'react'
import {useToast as Toaster} from '@chakra-ui/react'
const useToast = () => {
    const toast = Toaster()
    const showToast = (title,description,status) => {
        toast({
            title,
            description,
            status,
            isClosable:true,
            duration:4000
        })
    }
  return {showToast}
}

export default useToast
import React, { useState } from 'react'
import useToast from './useToast'

const usePreviewImage = () => {
  const [selectedFile,setSelectedFile] = useState(null)
  const maxFileSizeInByte = 2 * 1024 * 1024;
  const {showToast} = useToast()
  const handleFileSelection = e => {
    const file = e.target.files[0];
    if(file && file.type.startsWith('image/')){
        if(file.size > maxFileSizeInByte){
            showToast('Error','File Size Exceeds 2MB','error')
            return;
        }
        else{
            const reader = new FileReader()

            reader.readAsDataURL(file)

            reader.onloadend = () => {
                setSelectedFile(reader.result)
            }
        }
    }
    else{
        showToast("Error",'Please Select an Image File','error')
    }
  }

  return {
    handleFileSelection,selectedFile,setSelectedFile
  }
}

export default usePreviewImage
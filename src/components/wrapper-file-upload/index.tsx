import React from 'react'
import { useDropzone } from 'react-dropzone'

interface TProps {
  children: React.ReactNode
  uploadFunc: (file: File) => void
  objectAcceptFile?: Record<string, string[]>
}

const WrapperFileUpload = (props: TProps) => {
  const { children, uploadFunc, objectAcceptFile } = props

  const { getRootProps, getInputProps } = useDropzone({
    accept: objectAcceptFile ? objectAcceptFile : {},
    onDrop: acceptedFiles => {
      uploadFunc(acceptedFiles[0])
    }
  })

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      {children}
    </div>
  )
}

export default WrapperFileUpload

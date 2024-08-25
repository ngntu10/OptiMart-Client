import { ModalProps, styled, Modal, Box } from '@mui/material'
import React from 'react'

interface TCustomModal extends ModalProps {
}

const StyleModal = styled(Modal)<ModalProps>(({ theme }) => ({
  zIndex: 1300
}))

const CustomModal = (props: TCustomModal) => {
  const { children, open, onClose } = props

  return (
    <StyleModal open={open} onClose={onClose} aria-labelledby='modal-modal-title'>
      <Box
        sx={{
          height: '100%',
          width: '100vw'
        }}
      >
        <Box sx={{ maxHeight: '100vh', overflow: 'auto' }}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box sx={{ margin: '40px 0' }}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </StyleModal>
  )
}

export default CustomModal

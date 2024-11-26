import { Box, Modal } from '@mui/material'

import { TModalProps } from '@/types/modal'

type TModalComponentProps = TModalProps

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 4,
  p: 4,
}

export const ModalComponent = (props: TModalComponentProps) => {
  const { width = 400, height = 400, open, onClose, children } = props

  return (
    <Modal {...{ open, onClose }}>
      <Box sx={{ ...style, height, width, backgroundColor: 'white' }}>
        {children}
      </Box>
    </Modal>
  )
}

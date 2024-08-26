// ** React

// ** Mui
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Typography,
  styled,
  useTheme
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import Icon from 'src/components/Icon'

interface TConfirmationDialog {
  handleClose: () => void
  open: boolean
  title: string
  description: string
  handleConfirm: () => void
  handleCancel: () => void
}

const CustomStyleContent = styled(DialogContentText)(() => ({
  padding: '10px 20px'
}))

const StyledDialog = styled(Dialog)(() => ({
  '.MuiPaper-root.MuiPaper-elevation': {
    width: '400px'
  }
}))

const ConfirmationDialog = (props: TConfirmationDialog) => {
  // ** Props
  const { open, handleClose, title, description, handleCancel, handleConfirm } = props

  // ** translate
  const { t } = useTranslation()

  // ** theme
  const theme = useTheme()

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Icon icon='ep:warning' fontSize={80} color={theme.palette.warning.main} />
      </Box>
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Typography variant='h4' sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </DialogTitle>

      <CustomStyleContent>
        <DialogContentText sx={{ textAlign: 'center', marginBottom: '20px' }}>{description}</DialogContentText>
      </CustomStyleContent>
      <DialogActions>
        <Button variant='contained' onClick={handleConfirm}>
          {t('confirm')}
        </Button>
        <Button color='error' variant='outlined' onClick={handleCancel} autoFocus>
          {t('cancel')}
        </Button>
      </DialogActions>
    </StyledDialog>
  )
}

export default ConfirmationDialog

import { MouseEvent, useState } from 'react'
// Mui Imports
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import { Badge, Box, IconButton, Menu, Typography, TypographyProps, styled } from '@mui/material'
// ** Components
import { NotificationsType } from 'src/views/layouts/components/notification-dropdown'
import Icon from 'src/components/Icon'
// ** Third party
import { useTranslation } from 'react-i18next'
import { AppDispatch } from 'src/stores'
import { useDispatch } from 'react-redux'
import { deleteNotificationAsync, markReadNotificationAsync } from 'src/stores/notification/action'
import { formatDate } from 'src/utils/date'
import { CONTEXT_NOTIFICATION } from 'src/configs/notification'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>({
  fontWeight: 500,
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})
// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})
// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))
type TProps = {
  notification: NotificationsType
  handleDropdownClose: () => void
}
const NotificationItem = (props: TProps) => {
  // ** Props
  const { notification, handleDropdownClose } = props
  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const optionsOpen = Boolean(anchorEl)
  // ** Hooks
  const { t } = useTranslation()
  const router = useRouter()
  // ** Redux
  const dispatch: AppDispatch = useDispatch()
  const mapTitle = {
    Cancel_order: `${t('Cancel_order')}`,
    Create_order: `${t('Create_order')}`,
    Wait_payment: `${t('Wait_payment_order')}`,
    Wait_delivery: `${t('Wait_delivery_order')}`,
    Done_order: `${t('Done_order')}`,
    Is_delivered: `${t('Is_delivered')}`,
    Is_paid: `${t('Is_paid')}`,
    Payment_vn_pay_success: `${t('Payment_vn_pay_success')}`,
    Payment_vn_pay_error: `${t('Payment_vn_pay_error')}`
  }
  // ** Handles
  const handleOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleMarkNotification = () => {
    dispatch(markReadNotificationAsync(notification.id))
    handleOptionsClose()
  }

  const handleDeleteNotification = () => {
    dispatch(deleteNotificationAsync(notification.id))
    handleOptionsClose()
  }
  const handleNavigateDetail = (type: string) => {
    switch (type) {
      case CONTEXT_NOTIFICATION.ORDER: {
        handleDropdownClose()
        router.push(`${ROUTE_CONFIG.MY_ORDER}/${notification.referenceId}`)
        break
      }
    }
  }

  return (
    <MenuItem disableRipple disableTouchRipple>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{ mr: 4, ml: 2.5, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
          <MenuItemTitle onClick={() => handleNavigateDetail(notification.context)}>
            {/* {(mapTitle as any)[notification.title]} */}
            {notification.title}
          </MenuItemTitle>
          <MenuItemSubtitle variant='body2'>{notification.body}</MenuItemSubtitle>
          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
            {formatDate(notification.createdAt, { dateStyle: 'medium' })}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
          {notification.isRead ? (
            <>
              <Badge sx={{}} color='success' overlap='circular' variant='dot' />
              <Typography>Read</Typography>
            </>
          ) : (
            <>
              <Badge sx={{}} color='error' overlap='circular' variant='dot' />
              <Typography>Unread</Typography>
            </>
          )}
          <>
            <IconButton onClick={(event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}>
              <Icon icon='pepicons-pencil:dots-y'></Icon>
            </IconButton>
            <Menu
              keepMounted
              anchorEl={anchorEl}
              open={optionsOpen}
              onClose={handleOptionsClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem sx={{ '& svg': { mr: 2 }, border: 'none !important' }} onClick={handleMarkNotification}>
                <Icon icon='gg:read' fontSize={20} />
                {t('Mark read')}
              </MenuItem>
              <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleDeleteNotification}>
                <Icon icon='mdi:delete-outline' fontSize={20} />
                {t('Delete')}
              </MenuItem>
            </Menu>
          </>
        </Box>
      </Box>
    </MenuItem>
  )
}
export default NotificationItem

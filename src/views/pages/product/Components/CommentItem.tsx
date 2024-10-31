// ** React
import { useTranslation } from 'react-i18next'
import { MouseEvent, useEffect, useState } from 'react'
// ** Next Imports
import { useRouter } from 'next/router'

// ** Mui
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material'

// ** Utils
import { toFullName } from 'src/utils'
import { getTimePast } from 'src/utils/date'

// ** Components
import CommentInput from 'src/views/pages/product/Components/CommentInput'
import { TCommentItemProduct } from 'src/types/comment'
import ConfirmationDialog from 'src/components/confirmation-dialog'
import Icon from 'src/components/Icon'

import { ROUTE_CONFIG } from 'src/configs/route'
// ** Redux
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'
// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
// ** Services
import { deleteMyCommentAsync, replyCommentAsync, updateMyCommentAsync } from 'src/stores/comment/actions'
interface TProps {
  item: TCommentItemProduct
}

const CommentItem = ({ item }: TProps) => {
  const [isReply, setIsReply] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openDeleteComment, setOpenDeleteComment] = useState(false)
  const [editComment, setEditComment] = useState(false)

  const optionsOpen = Boolean(anchorEl)

  const handleOptionsClose = () => {
    setAnchorEl(null)
  }

  // ** Hooks
  const { user } = useAuth()
  const { t, i18n } = useTranslation()
  const router = useRouter()

  // ** Redux
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isSuccessDelete, isSuccessEdit } = useSelector((state: RootState) => state.comments)
  const handleCancelReply = () => {
    setIsReply(false)
    if (editComment) {
      setEditComment(false)
    }
  }

  const handleCloseConfirmDeleteComment = () => {
    setOpenDeleteComment(false)
  }
  const handleDeleteComment = () => {
    dispatch(deleteMyCommentAsync(item.id))
  }
  useEffect(() => {
    if (isSuccessDelete) {
      handleCloseConfirmDeleteComment()
    }
  }, [isSuccessDelete])
  useEffect(() => {
    if (isSuccessEdit) {
      setEditComment(false)
    }
  }, [isSuccessEdit])
  const handleReply = (comment: string, isEdit: boolean, itemComment?: TCommentItemProduct) => {
    if (comment) {
      if (user) {
        if (isEdit) {
          dispatch(
            updateMyCommentAsync({
              id: itemComment?.id || '',
              content: comment
            })
          )
        } else {
          dispatch(
            replyCommentAsync({
              product: itemComment?.product?.id || '',
              user: user?.id,
              content: comment,
              parent: itemComment?.parent ? itemComment?.parent : itemComment?.id || ''
            })
          )
        }
        setIsReply(false)
      } else {
        router.replace({
          pathname: ROUTE_CONFIG.LOGIN,
          query: { returnUrl: router.asPath }
        })
      }
    }
  }

  return (
    <>
      <ConfirmationDialog
        open={openDeleteComment}
        handleClose={handleCloseConfirmDeleteComment}
        handleCancel={handleCloseConfirmDeleteComment}
        handleConfirm={handleDeleteComment}
        title={t('Title_delete_comment')}
        description={t('Confirm_delete_comment')}
      />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, width: '100%' }}>
          <Avatar src={item.user?.avatar} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography>
                    {toFullName(
                      item?.user?.lastName || '',
                      item?.user?.middleName || '',
                      item?.user?.firstName || '',
                      i18n.language
                    )}
                  </Typography>
                  {/* <Typography color='secondary'>{getTimePast(new Date(item.createdAt), t)}</Typography> */}
                </Box>
              </Box>
              {editComment ? (
                <Box sx={{ width: '100%' }}>
                  <CommentInput isEdit={editComment} onCancel={handleCancelReply} item={item} onApply={handleReply} />
                </Box>
              ) : (
                <Typography>{item?.content}</Typography>
              )}
            </Box>
            {item?.user?.id === user?.id && (
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
                  <MenuItem
                    sx={{ '& svg': { mr: 2 } }}
                    onClick={() => {
                      setEditComment(true)
                      handleOptionsClose()
                    }}
                  >
                    <Icon icon='tabler:edit' fontSize={20} />
                    {t('Edit')}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOpenDeleteComment(true)
                      handleOptionsClose()
                    }}
                    sx={{ '& svg': { mr: 2 } }}
                  >
                    <Icon icon='mdi:delete-outline' fontSize={20} />
                    {t('Delete')}
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Box>
        {!editComment && (
          <Box sx={{ display: 'flex', gap: 1, ml: '55px' }}>
            <Button
              variant='text'
              sx={{ mt: 1, height: '30px', backgroundColor: 'transparent !important' }}
              onClick={() => setIsReply(true)}
            >
              {t('Reply')}
            </Button>
          </Box>
        )}
        {isReply && (
          <Box sx={{ ml: '80px', mt: -2 }}>
            <CommentInput onCancel={handleCancelReply} item={item} onApply={handleReply} />
          </Box>
        )}
      </Box>
    </>
  )
}

export default CommentItem

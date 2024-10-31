// ** React
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// ** Mui
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Avatar, Box, Rating, Tooltip } from '@mui/material'
/// ** Components
import Icon from 'src/components/Icon'
// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
// ** Others
import { toFullName } from 'src/utils'
// ** Types
import { TReviewItem } from 'src/types/reviews'
// ** Utils
import { getTimePast } from 'src/utils/date'
import { useAuth } from 'src/hooks/useAuth'
import ConfirmationDialog from 'src/components/confirmation-dialog'
import { deleteMyReviewAsync } from 'src/stores/reviews/actions'
import EditReview from './EditReview'
interface TCardReview {
    item: TReviewItem
}
const StyleCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    boxShadow: theme.shadows[4],
    padding: 20,
    backgroundColor: theme.palette.background.default
}))
const CardReview = (props: TCardReview) => {
    // ** Props
    const { item } = props
    // ** Hooks
    const { i18n, t } = useTranslation()
    const { user } = useAuth()
    const dispatch: AppDispatch = useDispatch()
    const {
        reviews,
        isSuccessEdit,
        isErrorEdit,
        isLoading,
        messageErrorEdit,
        isErrorDelete,
        isSuccessDelete,
        messageErrorDelete,
        typeError,
    } = useSelector((state: RootState) => state.reviews)
    // ** State
    const [openEdit, setOpenEdit] = useState({
        open: false,
        id: ''
    })
    const [openDeleteReview, setOpenDeleteReview] = useState({
        open: false,
        id: ''
    })
    const handleDeleteReview = () => {
        dispatch(deleteMyReviewAsync(openDeleteReview.id))
    }
    const handleCloseEdit = () => {
        setOpenEdit({
            open: false,
            id: ''
        })
    }
    const handleCloseConfirmDeleteReview = () => {
        setOpenDeleteReview({
            open: false,
            id: ''
        })
    }
    useEffect(() => {
        if (isSuccessEdit) {
            handleCloseEdit()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessEdit, isErrorEdit, messageErrorEdit, typeError])
    useEffect(() => {
        if (isSuccessDelete) {
            handleCloseConfirmDeleteReview()
        }
    }, [isSuccessDelete, isErrorDelete, messageErrorDelete])
    return (
        <>
            <ConfirmationDialog
                open={openDeleteReview.open}
                handleClose={handleCloseConfirmDeleteReview}
                handleCancel={handleCloseConfirmDeleteReview}
                handleConfirm={handleDeleteReview}
                title={t('Title_delete_review')}
                description={t('Confirm_delete_review')}
            />
            <EditReview open={openEdit.open} onClose={handleCloseEdit} idReview={openEdit.id} />
            <StyleCard sx={{ width: '100%' }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar src={item.user.avatar} />
                    <Box sx={{ flexDirection: "column" }}>
                        <Typography>
                            {toFullName(
                                item?.user?.lastName || '',
                                item?.user?.middleName || '',
                                item?.user?.firstName || '',
                                i18n.language
                            )}
                        </Typography>
                        <Box sx={{ display: "flex", alignContent: "center", gap: 1 }}>
                            <Rating
                                name='read-only'
                                sx={{ fontSize: '16px', mt: 1 }}
                                defaultValue={item?.star}
                                precision={0.5}
                                readOnly
                            />
                            <Typography>{getTimePast((item.updatedAt as any), t)}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box mt={1}>
                    <Typography>{item.content}</Typography>
                </Box>
                {user?.id == item?.user?.id && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }} mt={1}>
                        <Tooltip title={t('Edit')}>
                            <IconButton onClick={() => setOpenEdit({ id: item.id, open: true })}>
                                <Icon icon='tabler:edit' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t('Delete')} onClick={() => setOpenDeleteReview({
                            id: item.id,
                            open: true
                        })}>
                            <IconButton>
                                <Icon icon='mdi:delete-outline' />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            </StyleCard>
        </>
    )
}
export default CardReview
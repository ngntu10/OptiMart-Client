// ** React
import { useTranslation } from "react-i18next"
import { MouseEvent, useState } from "react";

// ** Mui
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Typography } from "@mui/material"

// ** Utils
import { toFullName } from "src/utils";
import { getTimePast } from "src/utils/date";

// ** Components
import CommentInput from "src/views/pages/product/Components/CommentInput";
import { TCommentItemProduct } from "src/types/comment";
import { useAuth } from "src/hooks/useAuth";
import { useDispatch } from "react-redux";
import { replyCommentAsync } from "src/stores/comment/actions";
import { useRouter } from "next/router";
import { ROUTE_CONFIG } from "src/configs/route";
import { AppDispatch } from "src/stores";
import Icon from "src/components/Icon";

interface TProps {
    item: TCommentItemProduct
}

const CommentItem = ({ item }: TProps) => {
    const [isReply, setIsReply] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const optionsOpen = Boolean(anchorEl)
    const handleOptionsClose = () => {
        setAnchorEl(null)
    }

    // ** Hooks
    const { user } = useAuth()
    const { t, i18n } = useTranslation()
    const dispatch: AppDispatch = useDispatch()
    const router = useRouter()

    const handleCancelReply = () => {
        setIsReply(false)
    }

    const handleReply = (comment: string, itemComment?: TCommentItemProduct) => {
        if (comment) {
            if (user) {
                dispatch(replyCommentAsync({
                    product: itemComment?.product?.id || "",
                    user: user?.id,
                    content: comment,
                    parent: itemComment?.parent ? itemComment?.parent : itemComment?.id || ""
                }))
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
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                <Avatar src={item.user?.avatar} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                    <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography>
                                    {toFullName(
                                        item?.user?.lastName || '',
                                        item?.user?.middleName || '',
                                        item?.user?.firstName || '',
                                        i18n.language
                                    )}
                                </Typography>
                                {/* <Typography color="secondary">{getTimePast(new Date(item.createdAt), t)}</Typography> */}
                            </Box>
                        </Box>
                        <Typography>{item?.content}</Typography>
                    </Box>
                    <IconButton onClick={(event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}>
                        <Icon icon="pepicons-pencil:dots-y"></Icon>
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
                        >
                            <Icon icon='tabler:edit' fontSize={20} />
                            {t('Edit')}
                        </MenuItem>
                        <MenuItem
                            sx={{ '& svg': { mr: 2 } }}
                        >
                            <Icon icon='mdi:delete-outline' fontSize={20} />
                            {t('Delete')}
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1, ml: "80px" }}>
                <Button variant="text" sx={{ mt: 1, height: "30px", backgroundColor: "transparent !important" }} onClick={() => setIsReply(true)}>
                    {t("Reply")}
                </Button>
            </Box>
            {isReply && (
                <Box sx={{ ml: "80px", mt: -2 }}>
                    <CommentInput onCancel={handleCancelReply} item={item} onApply={handleReply} />
                </Box>
            )}
        </Box>
    )

}

export default CommentItem
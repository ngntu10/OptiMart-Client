// ** React
import { useTranslation } from 'react-i18next'
import { ChangeEvent, useState } from 'react'
// ** Mui
import { Avatar, Box, Button, IconButton, styled } from '@mui/material'
// ** Components
import CustomTextField from 'src/components/text-field'
import Icon from 'src/components/Icon'
// ** Third party
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { TCommentItemProduct } from 'src/types/comment'
import { useAuth } from 'src/hooks/useAuth'
const StyleWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '12px',
  '.emoji': {
    top: '40px !important',
    transform: 'none !important',
    position: 'absolute !important',
    left: 'auto !important',
    zIndex: 2,
    '.EmojiPickerReact': {
      height: '400px !important',
      backgroundColor: `${theme.palette.background.default} !important`,
      border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`,
      boxShadow: theme.shadows[4],
      '.epr-search-container': {
        input: {
          backgroundColor: `${theme.palette.background.default} !important`,
          border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`
        }
      },
      '.epr-emoji-category-label': {
        backgroundColor: `${theme.palette.background.default} !important`,
        color: theme.palette.text.primary
      },
      '.epr_iogimd': {
        borderTop: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`
      }
    }
  }
}))
interface TCommentInput {
  onApply: (comment: string, item?: TCommentItemProduct) => void
  onCancel?: () => void
  item?: TCommentItemProduct
}
const CommentInput = (props: TCommentInput) => {
  const [inputComment, setInputComment] = useState('')
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const { user } = useAuth()
  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setInputComment(prevInput => prevInput + emojiObject.emoji)
    // setIsVisible(false);
  }
  const handleCancel = () => {
    setIsFocus(false)
    setInputComment('')
    if (props?.onCancel) {
      props?.onCancel()
    }
  }
  const handleApply = () => {
    props.onApply(inputComment, props?.item)
    setIsFocus(false)
    setInputComment('')
  }
  return (
    <StyleWrapper>
      <Avatar src={user?.imageUrl || ''} sx={{ height: '40px !important', width: '40px !important', mt: 4 }} />
      <Box sx={{ flex: 1 }}>
        <CustomTextField
          fullWidth
          value={inputComment}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputComment(e.target.value)
          }}
          placeholder={t('Comment...')}
          onFocus={() => {
            setIsFocus(true)
          }}
          sx={{
            '.MuiInputBase-root': {
              borderRadius: '0px',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              boxShadow: 'none !important'
            }
          }}
        />
        {isFocus && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
            <Box sx={{ position: 'relative' }}>
              <IconButton onClick={() => setIsVisible(!isVisible)}>
                <Icon fontSize={30} icon='fluent:emoji-laugh-20-regular'></Icon>
              </IconButton>
              {isVisible ? (
                <div className='emoji'>
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              ) : (
                ''
              )}
            </Box>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Button color='secondary' variant='outlined' onClick={handleCancel}>
                {t('Cancel')}
              </Button>
              <Button variant='contained' onClick={handleApply}>
                {t('Comment')}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </StyleWrapper>
  )
}
export default CommentInput

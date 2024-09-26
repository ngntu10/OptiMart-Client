import * as React from 'react'
import { useTranslation } from 'react-i18next'
// ** Mui
import { styled, useTheme } from '@mui/material/styles'
import { Box, BoxProps, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
// ** Config
import { FILTER_REVIEW_PRODUCT } from 'src/configs/product'
interface TFilterProduct {
  handleFilterProduct: (value: string) => void
}
const StyleFilterProduct = styled(Box)<BoxProps>(({ theme }) => ({
  padding: '10px',
  border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`,
  borderRadius: '15px'
}))
const FilterProduct = (props: TFilterProduct) => {
  // ** Props
  const { handleFilterProduct } = props
  // ** Hooks
  const { t } = useTranslation()
  const theme = useTheme()
  const listReviewProducts = FILTER_REVIEW_PRODUCT()
  const onChangeFilterReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterProduct(e.target.value)
  }
  return (
    <StyleFilterProduct sx={{ width: '100%' }}>
      <FormControl>
        <FormLabel sx={{ color: theme.palette.primary.main, fontWeight: 600 }} id='radio-group-review'>
          {t('Review')}
        </FormLabel>
        <RadioGroup onChange={onChangeFilterReview} aria-labelledby='radio-group-review' name='radio-reviews-group'>
          {listReviewProducts.map(review => {
            return <FormControlLabel key={review.value} value={review.value} control={<Radio />} label={review.label} />
          })}
        </RadioGroup>
      </FormControl>
    </StyleFilterProduct>
  )
}
export default FilterProduct

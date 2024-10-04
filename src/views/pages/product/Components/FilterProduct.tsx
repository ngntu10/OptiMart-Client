import * as React from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { styled, useTheme } from '@mui/material/styles'
import {
  Box,
  BoxProps,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tooltip
} from '@mui/material'

// ** Config
import { FILTER_REVIEW_PRODUCT } from 'src/configs/product'
import Icon from 'src/components/Icon'

interface TFilterProduct {
  handleFilterProduct: (value: string, type: string) => void
  optionCities: { label: string; value: string }[]
  locationSelected: string
  reviewSelected: string
  handleReset: () => void
}

const StyleFilterProduct = styled(Box)<BoxProps>(({ theme }) => ({
  padding: '10px',
  border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`,
  borderRadius: '15px',
  backgroundColor: theme.palette.background.paper
}))

const FilterProduct = (props: TFilterProduct) => {
  // ** Props
  const { handleFilterProduct, optionCities, reviewSelected, locationSelected, handleReset } = props

  // ** Hooks
  const { t } = useTranslation()
  const theme = useTheme()
  const listReviewProducts = FILTER_REVIEW_PRODUCT()

  const onChangeFilter = (value: string, type: string) => {
    handleFilterProduct(value, type)
  }
  const handleResetFilter = () => {
    handleReset()
  }

  return (
    <StyleFilterProduct sx={{ width: '100%', padding: 4 }}>
      {Boolean(reviewSelected || locationSelected) && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Tooltip title={t('Delete_filter')}>
            <IconButton onClick={handleResetFilter}>
              <Icon icon='mdi:delete-outline' />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <Box>
        <FormControl>
          <FormLabel sx={{ color: theme.palette.primary.main, fontWeight: 600 }} id='radio-group-review'>
            {t('Review')}
          </FormLabel>
          <RadioGroup
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeFilter(e.target.value, 'review')}
            aria-labelledby='radio-group-review'
            name='radio-reviews-group'
          >
            {listReviewProducts.map(review => {
              return (
                <FormControlLabel
                  key={review.value}
                  value={review.value}
                  control={<Radio checked={reviewSelected === review.value} />}
                  label={review.label}
                />
              )
            })}
          </RadioGroup>
        </FormControl>
      </Box>
      <Box sx={{ mt: 2 }}>
        <FormControl>
          <FormLabel sx={{ color: theme.palette.primary.main, fontWeight: 600 }} id='radio-group-location'>
            {t('Location')}
          </FormLabel>
          <RadioGroup
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeFilter(e.target.value, 'location')}
            aria-labelledby='radio-group-locations'
            name='radio-locations-group'
          >
            {optionCities.map(city => {
              
            
              return (
                <FormControlLabel
                  key={city.value}
                  value={city.value}
                  control={<Radio checked={locationSelected == city.value} />}
                  label={city.label}
                />
              )
            })}
          </RadioGroup>
        </FormControl>
      </Box>
    </StyleFilterProduct>
  )
}
export default FilterProduct

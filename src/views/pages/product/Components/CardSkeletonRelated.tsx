import { Box, Card, Skeleton, styled } from '@mui/material'
const StyleCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  boxShadow: theme.shadows[4],
  '.MuiCardMedia-root.MuiCardMedia-media': {
    objectFit: 'contain'
  }
}))
const CardSkeletonRelated = () => {
  return (
    <StyleCard sx={{ width: '100%' }}>
      <Skeleton variant='rounded' width='100%' height={210} />
      <Box sx={{ padding: '8px 12px' }}>
        <Skeleton variant='text' width='100%' height={60} />
        <Skeleton variant='text' width='50%' height={40} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Skeleton variant='text' width='30%' height={40} />
          <Skeleton variant='text' width='30px' height={40} />
        </Box>
      </Box>
    </StyleCard>
  )
}
export default CardSkeletonRelated

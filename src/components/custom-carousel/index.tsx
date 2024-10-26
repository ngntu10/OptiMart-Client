import { styled } from '@mui/material'
import React from 'react'
import Carousel, { CarouselProps } from 'react-multi-carousel'
interface TProps extends CarouselProps {
  children: React.ReactNode
}
const StyledCarousel = styled(Carousel)(({ theme }) => ({
  '.react-multiple-carousel__arrow': {
    background: `${theme.palette.primary.main} !important`
  },
  '.react-multi-carousel-dot': {
    button: {
      borderColor: `${theme.palette.primary.main} !important`
    },
    '&.react-multi-carousel-dot--active': {
      button: {
        background: `${theme.palette.primary.main} !important`
      }
    },
    },
}))

// class="react-multi-carousel-track "
const CustomCarousel = (props: TProps) => {
  const { responsive: responsiveProps, ...rests } = props
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }
  return (
    <StyledCarousel responsive={responsiveProps || responsive} {...rests}>
      {props.children}
    </StyledCarousel>
  )
}
export default CustomCarousel

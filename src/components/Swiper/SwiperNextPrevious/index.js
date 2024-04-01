import {useSwiper} from 'swiper/react'

const SwiperButtonPrevious = ({className}) => {
    const swiper = useSwiper()

    return <div
        onClick={() => swiper.slidePrev()}
        className={className}
    >
        <img src='/images/icon-chevron-left-white.svg' alt='White left swiper chevron' />
    </div>
}

export default SwiperButtonPrevious

import {useSwiper} from 'swiper/react'

const SwiperButtonNext = ({className}) => {
    const swiper = useSwiper()

    return <div
        onClick={() => swiper.slideNext()}
        className={className}
    >
        <img src='/images/icon-chevron-right-white.svg' alt='White right swiper chevron' />
    </div>
}

export default SwiperButtonNext

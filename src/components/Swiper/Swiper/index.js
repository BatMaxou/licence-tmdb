import {Swiper as BaseSwiper, SwiperSlide} from 'swiper/react'
import 'swiper/scss'

import styles from './Swiper.module.scss'
import cn from '../../../utils/classnames'
import SwiperButtonPrevious from '../SwiperNextPrevious'
import SwiperButtonNext from '../SwiperNextButton'

const Swiper = ({collection, uniqueAttr, renderItem, className}) => {
    if (!uniqueAttr) {
        uniqueAttr = element => element.id
    }

    return <BaseSwiper
        slidesPerView={'auto'}
        className={cn(styles.swiper, className)}
    >
        {collection.map(element => <SwiperSlide key={uniqueAttr(element)} className={styles.slide}>
            {renderItem && renderItem(element)}
        </SwiperSlide>)}

        <SwiperButtonPrevious className={styles.swiperPrev} />
        <SwiperButtonNext className={styles.swiperNext} />
    </BaseSwiper>
}

export default Swiper

import {Swiper as BaseSwiper, SwiperSlide} from 'swiper/react'
import {Scrollbar} from 'swiper/modules';
import 'swiper/scss'
import 'swiper/scss/scrollbar';

import styles from './Swiper.module.scss'
import cn from '../../../utils/classnames'
import SwiperButtonPrevious from '../SwiperNextPrevious'
import SwiperButtonNext from '../SwiperNextButton'

const Swiper = ({collection, uniqueAttr, renderItem, className}) => {
    if (!uniqueAttr) {
        uniqueAttr = element => element.id
    }

    return <BaseSwiper
        modules={[Scrollbar]}
        draggable={true}
        slidesPerView={'auto'}
        scrollbar={{
            draggable: true,
            horizontalClass: styles.swiperScrollbar,
            dragClass: styles.swiperDrag
        }}
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

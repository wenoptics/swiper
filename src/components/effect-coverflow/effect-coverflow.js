import $ from '../../utils/dom';
import Support from '../../utils/support';
import Utils from '../../utils/utils';

const Coverflow = {
  updateTtTranslate() {
    const swiper = this;
    swiper.coverflowEffect.transitToTranslate(swiper.ttTranslateValue);
    return swiper.ttTranslateValue;
  },
  transitToTranslate(progress) { // progress range: 0-1
    const swiper = this;
    const {
      width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid,
    } = swiper;
    const params = swiper.params.coverflowEffect;
    const isHorizontal = swiper.isHorizontal();
    const transform = swiper.translate;
    const center = isHorizontal ? -transform + (swiperWidth / 2) : -transform + (swiperHeight / 2);
    const rotate = isHorizontal ? params.rotate : -params.rotate;
    const translate = params.depth;
    const opacityDuration = swiper.params.coverflowEffect.transit.duration.opacity;
    const opacityInterval = (1 - opacityDuration) / swiper.params.slidesPerView;
    const scaleDuration = swiper.params.coverflowEffect.transit.duration.scale;
    const scaleInterval = (1 - scaleDuration) / swiper.params.slidesPerView;
    // Each slide offset from center
    for (let i = 0, length = slides.length; i < length; i += 1) {
      const $slideEl = slides.eq(i);
      const slideSize = slidesSizesGrid[i];

      // `slideOffset` is fix according to the order a slide
      const slideOffset = $slideEl[0].swiperSlideOffset;
      // slideOffset -= (1 - progress) * (slideOffset - slides.eq(0)[0].swiperSlideOffset);
      // $slideEl.attr('slideOffset', slideOffset);

      const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;
      // $slideEl.attr('offsetMultiplier', offsetMultiplier);

      let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;

      // Apply progress
      rotateX *= progress;
      rotateY *= progress;

      // var rotateZ = 0
      let translateZ = -translate * Math.abs(offsetMultiplier);

      let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
      let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;
      translateY *= progress;
      translateX *= progress;

      // Fix for ultra small values
      if (Math.abs(translateX) < 0.001) translateX = 0;
      if (Math.abs(translateY) < 0.001) translateY = 0;
      if (Math.abs(translateZ) < 0.001) translateZ = 0;
      if (Math.abs(rotateY) < 0.001) rotateY = 0;
      if (Math.abs(rotateX) < 0.001) rotateX = 0;

      // Add `scale` variations for animation effects - wenop
      let scale = 1;
      if (!(Math.round(offsetMultiplier) === 0 && swiper.params.coverflowEffect.transit.omitActiveSlide.scale)) {
        // offsetMultiplier as delays
        scale = (progress - scaleInterval * Math.abs(offsetMultiplier)) / scaleDuration;
        scale = Math.min(scale, 1);
        scale = Math.max(scale, 0);
      }

      const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale},${scale})`;

      $slideEl.transform(slideTransform);
      $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

      // Add `opacity` variations to allow fade effects - wenop
      if (!(Math.round(offsetMultiplier) === 0 && swiper.params.coverflowEffect.transit.omitActiveSlide.opacity)) {
        // `opacity` without progress
        let opacity = 1 - Math.abs(offsetMultiplier) / (swiper.params.slidesPerView + 1);

        // Apply progress
        // offsetMultiplier as delays
        opacity *= (progress - opacityInterval * Math.abs(offsetMultiplier)) / opacityDuration;

        $slideEl[0].style.opacity = opacity;
      }

      if (params.slideShadows) {
        // Set shadows
        let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
        if ($shadowBeforeEl.length === 0) {
          $shadowBeforeEl = $(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
          $slideEl.append($shadowBeforeEl);
        }
        if ($shadowAfterEl.length === 0) {
          $shadowAfterEl = $(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
          $slideEl.append($shadowAfterEl);
        }
        if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
        if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
      }
    }

    // Set correct perspective for IE10
    if (Support.pointerEvents || Support.prefixedPointerEvents) {
      const ws = $wrapperEl[0].style;
      ws.perspectiveOrigin = `${center}px 50%`;
    }

    swiper.ttTranslateValue = progress;
  },
  setTranslate() {
    const swiper = this;
    swiper.coverflowEffect.transitToTranslate(1);
  },
  setTransition(duration) {
    const swiper = this;
    swiper.slides
      .transition(duration)
      .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
      .transition(duration);
  },
};

export default {
  name: 'effect-coverflow',
  params: {
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
      transit: {
        omitActiveSlide: {
          scale: true,
          opacity: true,
        },
        duration: {
          scale: 0.5,
          opacity: 0.7,
        },
      },
    },
  },
  ttTranslateValue: 1,
  create() {
    const swiper = this;
    Utils.extend(swiper, {
      coverflowEffect: {
        setTranslate: Coverflow.setTranslate.bind(swiper),
        setTransition: Coverflow.setTransition.bind(swiper),
      },
    });
    Utils.extend(swiper, {
      coverflowEffect: {
        transitToTranslate: Coverflow.transitToTranslate.bind(swiper),
        updateTtTranslate: Coverflow.updateTtTranslate.bind(swiper),
      },
    });
  },
  on: {
    beforeInit() {
      const swiper = this;
      if (swiper.params.effect !== 'coverflow') return;

      swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
    },
    setTranslate() {
      const swiper = this;
      if (swiper.params.effect !== 'coverflow') return;
      swiper.coverflowEffect.setTranslate();
    },
    setTransition(duration) {
      const swiper = this;
      if (swiper.params.effect !== 'coverflow') return;
      swiper.coverflowEffect.setTransition(duration);
    },
  },
};

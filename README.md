# Swiper Custom Build

[wenop] Custom build for plugin dev purpose. 

## In this variation

[`effect-coverflows`](src/components/effect-coverflow/effect-coverflow.js) are supported custom transitions to a transition state.

#### Way 1:
 
To set a transition progress, call `swiper.transitToTranslate(progressVal)`. `progressVal` is range from 0 to 1

#### Way 2:

Or assign progress value to `swiper.ttTranslateValue`, and call `swiper.coverflowEffect.updateTtTranslate()`. 
 Which works well with value binding

 ### Corresponding settings:
 
```js
coverflowEffect: {
  rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
    
    // new 
    transit: {
      omitActiveSlide: {
        scale: true,
        opacity: true,
      },
      duration: {
        scale: 0.5,
        opacity: 0.7
      }
    }
}
```


### Test Example

See [`245-effect-pileflow.html`](demos/245-effect-pileflow.html)

---

Swiper
==========

[![Greenkeeper badge](https://badges.greenkeeper.io/nolimits4web/Swiper.svg)](https://greenkeeper.io/)

Swiper - is the free and most modern mobile touch slider with hardware accelerated transitions and amazing native behavior. It is intended to be used in mobile websites, mobile web apps, and mobile native/hybrid apps. Designed mostly for iOS, but also works great on latest Android, Windows Phone 8 and modern Desktop browsers.

Swiper is not compatible with all platforms, it is a modern touch slider which is focused only on modern apps/platforms to bring the best experience and simplicity.

# Getting Started
  * [Getting Started Guide](http://www.idangero.us/swiper/get-started/)
  * [API](http://www.idangero.us/swiper/api/)
  * [Demos](http://www.idangero.us/swiper/demos/)
  * [Forum](http://www.idangero.us/swiper/forum/)

# Dist / Build

On production use files (JS and CSS) only from `dist/` folder, there will be the most stable versions, `build/` folder is only for development purpose.

### Development Build

Swiper uses `gulp` to build a development (build) and production (dist) versions.

First you need to have `gulp-cli` which you should install globally.

```
$ npm install --global gulp
```

Then install all dependencies, in repo's root:

```
$ npm install
```

And build development version of Swiper:
```
$ npm run build:dev
```

The result is available in `build/` folder.

### Production Build

```
$ npm run build:prod
```

Production version will available in `dist/` folder.

# Contributing

All changes should be committed to `src/` files only. Before you open an issue please review the [contributing](https://github.com/nolimits4web/Swiper/blob/master/CONTRIBUTING.md) guideline.

Swiper 3.x
==========

If you are still using Swiper 3.x.x, you may find it in [Swiper3 Branch](https://github.com/nolimits4web/Swiper/tree/Swiper3)
* [Download Latest Swiper 3.4.2](https://github.com/nolimits4web/Swiper/archive/v3.4.2.zip)
* [Source Files](https://github.com/nolimits4web/Swiper/tree/Swiper3/src)
* [API](https://github.com/nolimits4web/Swiper/blob/Swiper3/API.md)

Swiper 2.x
==========

If you are still using Swiper 2.x.x or you need old browsers support, you may find it in [Swiper2 Branch](https://github.com/nolimits4web/Swiper/tree/Swiper2)
* [Download Latest Swiper 2.7.6](https://github.com/nolimits4web/Swiper/archive/v2.7.6.zip)
* [Source Files](https://github.com/nolimits4web/Swiper/tree/Swiper2/src)
* [API](https://github.com/nolimits4web/Swiper/blob/Swiper2/API.md)

<template>
    <transition-group
            :css="false"
            :tag="tag"
            :appear="appear"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave"
    >
        <slot></slot>
    </transition-group>
</template>

<script>
    import anime from 'animejs/lib/anime.es.js'

    export default {
        name: "SlideUpTransition",

        props: {
            tag: {
                type: String,
                default: "div"
            },
            appear:{
                type:Boolean,
                default:false
            }
        },

        methods: {
            beforeEnter: function (el) {
                el.style.opacity = 0
                el.style.transform = "translateY(50px)"
            },
            enter: function (el, done) {
                const delay = el.dataset.index * 150
                anime({
                    targets: el,
                    opacity: 1,
                    translateY: 0,
                    delay,
                    easing: 'easeInCubic',
                    complete: done
                })
            },
            leave: function (el, done) {
                const delay = el.dataset.index * 150
                anime({
                    targets: el,
                    opacity: 0,
                    delay,
                    translateY: 50,
                    complete: done
                })
            }
        },
    }
</script>

<style scoped>

</style>

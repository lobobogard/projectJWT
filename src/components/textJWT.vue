<template lang="">
  <div class="q-mt-xl">
    <div class="letra text-center">
      <div class="gallery-text">
        <x-sign>-- NOV.11.2021 --</x-sign>
        <x-sign>A LITTLE CURIOSITY IS THE START OF AN ENTIRE CAREER</x-sign>
        <x-sign><label> BY LUIS PULIDO </label></x-sign>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    addEffect () {
      const signs = document.querySelectorAll('x-sign')
      const randomIn = (min, max) => (
        Math.floor(Math.random() * (max - min + 1) + min)
      )

      const mixupInterval = (els) => {
        const ms = randomIn(2000, 4000)
        els.style.setProperty('--interval', `${ms}ms`)
      }

      signs.forEach(el => {
        mixupInterval(el)
        el.addEventListener('webkitAnimationIteration', () => {
          mixupInterval(el)
        })
      })
    }
  },
  mounted () {
    this.addEffect()
  }
})
</script>

<style lang="css" scoped>
  .fondo {
    background-color: #020202
  }

  .letra{
    color: white;
  }
 .img {
  opacity: 0.3;
 }

.gallery-text{
  position: relative;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/*efecto*/
x-sign {
  --interval: 1s;
  display: block;
  text-shadow:
    0 0 10px var(--color1),
    0 0 20px var(--color2),
    0 0 40px var(--color3),
    0 0 80px var(--color4);
  will-change: filter, color;
  filter: saturate(60%);
  animation: flicker steps(100) var(--interval) 1s infinite;
}

x-sign {
  color: tomato;
  --color1: orangered;
  --color2: firebrick;
  --color3: maroon;
  --color4: darkred;
  font-family: Permanent Marker;
}

@keyframes flicker {
  50% {
    color: white;
    filter: saturate(200%) hue-rotate(20deg);
  }
}

</style>

<template>
  <div class="relative">
    <div class="h-full" @mouseenter="toggle" @mouseleave="toggle">
      <slot />
    </div>
    <div v-show="isShown" :class="classes"><span v-html="text"></span></div>
  </div>
</template>

<script>
export default {
  props: {
    text: String
  },
  data () {
    return {
      isShown: false
    }
  },
  computed: {
    classes () {
      return [
        'bg-gray-600',
        'bg-opacity-80',
        'rounded-sm',
        'text-white',
        'text-xs',
        'whitespace-nowrap',
        'p-2',
        'absolute',
        'margin-top-auto',
      ]
    }
  },
  methods: {
    toggle () {
        this.isShown = !this.isShown
    }
  }
}
</script>

<style scoped>

.bg-gray-600 {
  background-color: #6c757d !important;
}

.bg-opacity-80 {
  background-color: rgba(108, 117, 125, 0.8) !important;
}

.rounded-sm {
    border-radius: 0.3rem !important;
}

.text-white {
    color: #fff !important;
}

.text-xs {
    font-size: 0.75rem !important;
}

.whitespace-nowrap {
    white-space: nowrap !important;
}

.p-2 {
    padding: 0.5rem !important;
}

.absolute {
    position: absolute !important;
}

.margin-top-auto {
    margin-top: auto !important;
}

</style>
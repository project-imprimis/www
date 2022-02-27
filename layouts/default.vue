<template>
  <div>
    <section class="main-content columns">
      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  },
  head () {
    return {
      title: this.$t('title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('description') }
      ],
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    }
  }
}
</script>

<style lang="scss">

  #__layout,
  #__layout > div,
  #__layout > div > section,
  #__layout > div > section > div {
    min-height: 100vh;
  }

  //:root {
    //background: #222A2C;
  //}

</style>

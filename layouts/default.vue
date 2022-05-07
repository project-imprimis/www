<template>
  <div id="main">
    <nuxt />
    <footer class="footer">
      <div class="content has-text-centered">
        <p>&#169; {{ currentYear }} Team Imprimis</p>
      </div>
    </footer>
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
  },

  computed: {
    currentYear () {
      return new Date().getFullYear()
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

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
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500&display=swap');

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
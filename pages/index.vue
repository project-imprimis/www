<template>
  <section class="hero">
    <div class="hero-body has-text-centered">
      <h1 class="title">Imprimis.</h1>
      <h2 class="subtitle">Coming to a dimension near you.<br/>Soon...</h2>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";

  h1.title {
    font-size: 3rem;
    text-shadow:
      6px 2px 0px transparentize(#000, 0.7),
      -6px -2px 0px transparentize(#000, 0.5);
  }

  h2.subtitle {
    text-shadow:
      4px 1px 0px transparentize($primary, 0.7),
      -4px -1px 0px transparentize(adjust-hue($primary, 180deg), 0.5);
    font-weight: bold;
    font-size: 1.5rem;
  }

  section.hero {
    min-height: 100%;
    display: flex;
    justify-content: center;

    .hero-body {
      flex-grow: 0;
    }
  }

</style>

<script>
import Card from '~/components/Card'

export default {
  name: 'HomePage',

  components: {
    Card
  }
}
</script>

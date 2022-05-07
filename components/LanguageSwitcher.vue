<template>
  <div class="lang-menu">
    <div class="selected-lang">
      {{ currentLocale.flag }} {{ currentLocale.name }}
    </div>
    <ul>
      <li
        v-for="locale in availableLocales"
        :key="locale.code"
        @click.prevent.stop="$i18n.setLocale(locale.code)"
      >
        <a href="#">{{ locale.flag }} {{ locale.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LanguageSwitcher',

  computed: {
    // Return all the available locales except the current locale.
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },

    // Return the current locale code, iso, file, name, and flag.
    currentLocale () {
      return this.$i18n.localeProperties
    }

  }
}
</script>

<style lang="scss" scoped>
// Language menu button styling.

.lang-menu {
    // Move menu to the right.
    margin-left: auto;
    // Make menu and title flush.
    margin-bottom: 1.5rem;
    // Center menu text.
    width: 100px;
    font-weight: bold;
    // Make the hover menu appear below the centered of button.
    // Without this the hover menu will not be centered properly.
    position: relative;

    .selected-lang {
        // Add space between menu item and hover menu.
        line-height: 2;
        // Show cursor icon when hovering over menu button.
        cursor: pointer;
    }

    ul {
        // Hide the hover menu until menu button is hovered.
        display: none;

        // background-color: #495d62;
        border: 1px solid #f8f8f8;
        // Make hover menu borders round.
        border-radius: 5px;
        // Add a faint shadow to the hover menu borders.
        box-shadow: 0px 1px 10px rgba(0,0,0,0.2);

        // These three attributes make the hover menu be centered.
        position: absolute;
        right: 0px;
        width: 125px;

        li {
            // Vertically space out list items.
            display: flex;

            a {
                // Make empty space clickable, otherwise only text will be
                // clickable.
                width: 125px;
                // Space out the items in the list; they are too tight.
                padding: 5px 10px;
            }
        }
    }

    ul li:hover {
        // Make the list item background white when hovered.
        background-color: #f2f2f2;
    }

    &:hover ul {
        // Display menu button.
        display: block;
    }
}
</style>

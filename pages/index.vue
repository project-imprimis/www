<template>
  <div>
    <div id="showcase">
      <div id="logo-overlay" class="is-flex is-align-items-center">
        <img id="logo" src="~/assets/img/icon.png" alt="Imprimis Logo">
        <h1 class="title bw-text-effect is-size-1">
          {{ $t("header_title") }}
        </h1>
        <language-switcher />
      </div>
      <div id="bottom-overlay" class="is-flex is-align-items-center">
        <h2 class="slogan rgb-text-effect">
          {{ $t('tagline') }}
        </h2>
      </div>
    </div>
    <div class="section">
      <div class="container content is-medium" v-html="$t('text_1')" />
    </div>
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-three-fifths">
            <client-only>
              <carousel :per-page="1" :autoplay="true" :autoplay-timeout="5000" pagination-color="#646464" pagination-active-color="#dbdbdb">
                <slide v-for="i in 5" :key="i">
                  <img :src="require(`~/assets/img/screenshots/${i}.png`)" :alt="`Screenshot ${i}`">
                </slide>
              </carousel>
            </client-only>
          </div>
          <div class="column content is-medium" v-html="$t('text_2')" />
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <h1 class="title has-text-centered rgb-text-effect is-size-1 mb-6">
          {{ $t('download_section_header') }}
        </h1>
        <div v-if="release" class="columns is-desktop">
          <div class="column is-half-desktop is-full-tablet">
            <div>
              <div class="block release-header">
                <div class="is-size-4">
                  {{ release["name"] }}
                </div>
                <div>{{ $t('download_latest_release', { reltime: $dayjs(release["timestamp"]).fromNow() }) }}</div>
              </div>
              <div
                class="changelog content block"
                v-html="release['changelog']"
              />
            </div>
          </div>
          <div class="column is-half-desktop is-full-tablet">
            <div class="block os-section">
              <h3 class="title is-size-3 os-header">
                {{ $t('download_linux_header') }}
              </h3>
              <div class="is-flex is-justify-content-right is-align-items-center block download-link mb-4">
                <div class="mr-5 has-text-right">
                  <div>{{ $t('download_linux_snap_line_1') }}</div>
                  <div>{{ $t('download_linux_snap_line_2') }}</div>
                </div>
                <a href="https://snapcraft.io/imprimis-game" class="snap-link download-button" target="_blank">
                  <img alt="Get it from the Snap Store" class="snap-button" src="~/assets/img/snap-button.svg">
                </a>
              </div>
              <div class="is-flex is-justify-content-right is-align-items-center block download-link">
                <div class="mr-5 has-text-right">
                  <div>{{ $t('download_linux_zip_line_1') }}</div>
                  <div>
                    {{ release["files"]["linux"]["name"] }}&nbsp;&bull;&nbsp;{{ release["files"]["linux"]["size"] }}
                  </div>
                </div>
                <a class="button is-large is-primary download-button" :href="release['files']['linux']['download_url']">
                  <fa-icon icon="download" />
                  <span class="ml-3">{{ $t('download_button_text') }}</span>
                </a>
              </div>
            </div>
            <div class="block os-section">
              <h3 class="title is-size-3 os-header">
                {{ $t('download_windows_header') }}
              </h3>
              <div class="is-flex is-justify-content-right is-align-items-center block download-link">
                <div class="mr-5 has-text-right">
                  <div>{{ $t('download_windows_zip_line_1') }}</div>
                  <div>
                    {{ release["files"]["windows"]["name"] }}&nbsp;&bull;&nbsp;{{ release["files"]["windows"]["size"] }}
                  </div>
                </div>
                <a class="button is-large is-primary download-button" :href="release['files']['windows']['download_url']">
                  <fa-icon icon="download" />
                  <span class="ml-3">{{ $t('download_button_text') }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="columns">
          {{ $t('download_loading_text') }}
        </div>
      </div>
      <div class="section links">
        <div class="container mt-4">
          <h1 class="title has-text-centered rgb-text-effect is-size-1">
            {{ $t('join_us_section_header') }}
          </h1>
          <div class="is-flex is-justify-content-space-evenly pt-5">
            <div class="block is-flex is-align-items-center is-flex-direction-column m-4">
              <div class="mb-3 is-size-5 join-us-label">
                {{ $t('join_us_github_label') }}
              </div>
              <a class="button huge-button is-primary" href="https://github.com/project-imprimis/imprimis" target="_blank">
                <span class="icon">
                  <fa-icon :icon="['fab', 'github']" />
                </span>
              </a>
            </div>
            <div class="block is-flex is-align-items-center is-flex-direction-column m-4">
              <div class="mb-3 is-size-5 join-us-label">
                {{ $t('join_us_discord_label') }}
              </div>
              <a class="button huge-button is-primary" href="https://discord.gg/e5hbJpTESq" target="_blank">
                <span class="icon">
                  <fa-icon :icon="['fab', 'discord']" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked'

export default {
  name: 'HomePage',

  data () {
    return {
      release: null
    }
  },

  mounted () {
    this.$dayjs.locale(this.$i18n.locale)
    this.$axios
      .$get('https://api.github.com/repos/project-imprimis/imprimis/releases')
      .then((data) => {
        const release = data[0]
        const rel = {}
        rel.timestamp = release.published_at
        rel.name = release.name
        rel.changelog = marked.parse(release.body) // render markdown in description (from a trusted source)
        rel.prerelease = release.prerelease

        for (const asset of release.assets) {
          if (
            asset.name === 'imprimis-linux.zip' ||
            asset.name === 'imprimis-windows.zip'
          ) {
            const file = {}
            file.name = asset.name
            file.download_url = asset.browser_download_url
            file.size = `${Math.round(
              parseInt(asset.size) / (1024 * 1024)
            )}\xA0MiB` // \xa0 = nbsp

            if (typeof rel.files === 'undefined') { rel.files = {} }

            if (asset.name === 'imprimis-linux.zip') { rel.files.linux = file } else if (asset.name === 'imprimis-windows.zip') { rel.files.windows = file }
          }
        }

        this.release = rel
      })
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";

.bw-text-effect {
  text-shadow: 6px 2px 0px transparentize(#000, 0.7),
    -6px -2px 0px transparentize(#000, 0.5);
}

.rgb-text-effect {
  text-shadow: 4px 1px 0px transparentize($primary, 0.7),
    -4px -1px 0px transparentize(adjust-hue($primary, 180deg), 0.5);
  font-weight: bold;
}

#showcase {
  position: relative;
  height: 60vh;
  background: url("~/assets/img/header.png");
  background-position: center;
  background-size: cover;
  box-shadow: rgba(0, 0, 0, 0.1) 40px 4px 10px;
}

#logo {
  height: 125px;
  margin-right: 18px;
  filter: opacity(80%) drop-shadow(6px 2px 0px rgba(0, 0, 0, 0.3))
    drop-shadow(-6px -2px 0px rgba(0, 0, 0, 0.5));

  @include mobile {
    height: 100px;
    margin-bottom: 10px;
    margin-right: 12px;
  }

}

#logo-overlay {
  position: absolute;
  z-index: 10;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
  padding: 40px;
  padding-left: 60px;

  @include mobile {
    justify-content: center;
    flex-wrap: wrap;
    padding: 30px;
  }

  .title {
    @include mobile {
      font-size: 2rem !important;
    }
  }
}

#bottom-overlay {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.65));
  padding: 25px;
  padding-right: 60px;
  text-align: right;

  .slogan {
    width: 100%;
    font-size: 1.75rem;
    @include mobile {
       font-size: 1.5rem;
    }
  }

  @include mobile {
    padding: 20px;
    text-align: center;
  }
}

.changelog {
  border-top: 2px #495d62 solid;
  padding-top: 24px;
  display: inline-block;
}

.download-link {
  @include fullhd {
    margin-right: 10%;
  }

  @include mobile {
    flex-wrap: wrap;
    justify-content: center !important;
  }

  .has-text-right {
    @include mobile {
      text-align: center !important;
      flex: 1 0 auto;
    }
  }

  .download-button {
    @include mobile {
      margin-top: 12px;
    }
  }

  .mr-5 {
    @include mobile {
      margin-right: 0 !important;
    }
  }
}

.snap-link {
  margin-right: 4px;
  user-select: none;
  flex: 0 0 auto;
}

.huge-button {
  font-size: 2rem;
}

.snap-button {
  width: 182px;
}

.os-header {
  @include mobile {
    text-align: center;
  }
}

.os-section {
  @include mobile {
    margin-bottom: 3rem !important;
  }
}

.join-us-label {
  @include mobile {
    text-align: center;
  }
}

// patch icons that are broken in static build for some reason
svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: inline-block;
  display: inline-block;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -.125em;
}

</style>

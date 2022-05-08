//  A "safe" replacement for the v-html directive. The HTML code is sanitized
//  with DOMPurify before being interpreted.
import Vue from 'vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'

Vue.use(VueDOMPurifyHTML)

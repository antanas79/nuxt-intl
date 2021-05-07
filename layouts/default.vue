<template>
  <v-app>
    <v-main>
      <v-card class="mx-auto overflow-hidden" height="100%" width="100%">
        <v-system-bar color="red"></v-system-bar>
        <NavBar />
        <v-system-bar color="gray" height="40" class="justify-center">
          <SvgRender name="pay-later" smallIcon />
          <span class="text-caption" v-html="$t('BOTTOM_BAR')"></span>
        </v-system-bar>
        <v-card-text>
          <v-scroll-x-transition :hide-on-leave="true">
            <Nuxt />
          </v-scroll-x-transition>
        </v-card-text>
        <v-divider></v-divider>
        <PaymentSection />
        <Footer />
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {
  async asyncData({ context, store, params, payload }) {
    this.payloadData = payload
    this.contextData = context
    this.storeData = store
  },
  data: () => ({
    payloadData: null,
    contextData: null,
    storeData: null,
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>
<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  min-height: 100vh;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

//style overrides
#app .currency-selection {
  max-width: 160px;
}
#app .currency-selection .v-input__slot {
  padding-left: 0;
}
.md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
.no-uppercase {
  text-transform: none !important;
}
</style>

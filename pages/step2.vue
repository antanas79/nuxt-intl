<template>
  <div class="container">
    <div class="mb-3 upper">
      <LanguageInput/>
      <h6 class="title">{{ $t('message') }}</h6>
      <nuxt-link :to="localePath('step1')">Step 1</nuxt-link>
      <nuxt-link :to="localePath('step2')">Step 2</nuxt-link>
      <nuxt-link :to="localePath('step3')">Step 3</nuxt-link>
    </div>
    <div class="cards">
         <v-card
        class="mx-auto"
        max-width="344"
        v-for="item of [1,2,3]"
        v-bind:data="item"
        v-bind:key="item"
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        ></v-img>

        <v-card-title>
          Top western road trips
        </v-card-title>

        <v-card-subtitle>
          1,000 miles of wonder
        </v-card-subtitle>

        <v-card-actions>
          <v-btn
            color="orange lighten-2"
            text
          >
            Explore
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            icon
            @click="show = !show"
          >
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </div>
    <div class="steps">
<v-stepper
      class="mt-12"
      non-linear
      value="3"
    >
      <v-stepper-header>
        <v-stepper-step
          complete
          editable
          step="1"
        >
          Select campaign settings
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          complete
          editable
          step="2"
        >
          Create an ad group
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          complete
          editable
          step="3"
        >
          Create an ad
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>
    </div>
  </div>

</template>



<script lang="ts">
 export default {
    data: () => ({
      show: false,
    }),
  }
</script>

<style lang="scss" scoped >
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  >div.upper {
    display: flex;
    margin-bottom: 50px;
  }
  > div.cards {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  div.steps {
    width: 100%;
    margin-top:30px;
  }
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

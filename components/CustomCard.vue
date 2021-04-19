<template>
<div>
  <div v-for="item of [1,2,3]"  
        v-bind:data="item"
        v-bind:key="item">
        <div>
        <v-system-bar v-if="item==1" color="red"></v-system-bar>
        <v-system-bar v-else ></v-system-bar>
        <v-card
          class="mx-auto"
          max-width="344"
  
        >
      

          <v-card-title>
            Top western road trips
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions class="d-flex justify-center align-end ">
            <v-btn
              color="primary lighten-2"
              class=""
              text
              outlined
            >
              Select
            </v-btn>
          </v-card-actions>
        </v-card>
        </div>
  </div>
</div>
  
</template>

<style lang="scss" scoped>
 div:not(.v-card) > {
    width: 100%;
    display: flex;
    div >  {
    display: flex;
    justify-content: space-evenly;
    }

    .v-card {
      width:320px;
    }
  }
</style>

<script lang="ts">
   export default {}
</script>
<template>
  <v-row justify="center">
    <v-btn color="primary" dark @click.stop="dialog = true"> {{ btnOpenText }}</v-btn>
    <v-dialog v-model="dialog" max-width="550">
      <v-card>
        <div>
          <v-card-title class="headline">
            <div class="d-flex">
              <SvgRender v-if="iconTitleName" :name="iconName" smallIcon />
              {{ title }}
            </div>
          </v-card-title>
        </div>
        <v-card-text class="pb-0">
          <p v-if="schemaText">{{ schemaText }}</p>
          <div v-if="iconSchemaName" class="d-flex gray pa-3 d-flex justify-space-between">
            <SvgRender :name="iconSchemaName" />
            <ul class="schema-text d-flex flex-column justify-center blue--text pr-5">
              <li v-for="item in schemaSteps" :key="item.id">{{ item.name }}</li>
            </ul>
            <!--   <v-divider vertical class=""></v-divider> -->
          </div>
          <p v-if="mainTextTop" class="mb-0">{{ mainTextTop }}</p>
          <div v-if="pricesList" class="prices-list">
            <p class="mb-1" v-for="item in pricesList" :key="item.id">{{ item.name }}</p>
          </div>
          <div v-if="squareList" class="squere-list">
            <p class="mb-1" v-for="item in squareList" :key="item.id">{{ item.name }}</p>
          </div>
          <ol v-if="orderedList" class="ordered-list">
            <li class="mb-1" v-for="item in orderedList" :key="item.id">{{ item.name }}</li>
          </ol>
          <p v-if="bottomText" class="mb-0">{{ bottomText }}</p>
          <div v-if="captionText1" class="">
            <p>{{ captionText1 }}</p>
            <p>{{ captionText2 }}</p>
            <p>{{ captionText3 }}</p>
          </div>
        </v-card-text>
        <v-card-actions v-if="btnClose || btnChat">
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="dialog = false"> Chat now </v-btn>
          <v-btn color="blue" text @click="dialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
  props: {
    btnOpenText: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    iconTitleName: {
      type: String,
      required: false,
    },
    iconSchemaName: {
      type: String,
      required: false,
    },
    schemaSteps: {
      type: Array,
      required: false,
    },
    mainTextTop: {
      type: String,
      required: false,
    },
    pricesList: {
      type: Array,
      required: false,
    },
    squareList: {
      type: Array,
      required: false,
    },
    orderedList: {
      type: Array,
      required: false,
    },
    bottomText: {
      type: String,
      required: false,
    },
    captionText1: {
      type: String,
      required: false,
    },
    captionText2: {
      type: String,
      required: false,
    },
    captionText3: {
      type: String,
      required: false,
    },
    btnClose: {
      type: String,
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.squere-list {
  list-style: square;
}
</style>

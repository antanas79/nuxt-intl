<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <div color="red lighten-2" class="flex flex-column" dark v-bind="attrs" v-on="on"><slot /></div>
      </template>
      <Card
        :buttonClassName="'blue-grey lighten-5'"
        buttonText="CLOSE"
        @dialog-card-toggled="onDialogCardToggled"
        eventName="dialog-card-toggled"
        :card="{ title: 'INFO TITLE' }"
        :hasButton="true"
        :maxWidth="maxWidth"
        :cols="cols"
      >
        SOME PRODUCT ADDITIONAL INFO
      </Card>
      <!-- <v-card>
        <v-card-title class="headline grey lighten-2"> Privacy Policy </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> I accept </v-btn>
        </v-card-actions>
      </v-card> -->
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
  props: {
    maxWidth: {
      type: Number,
      required: true,
      default: 560,
    },
    cols: {
      type: Number,
      required: true,
      default: 12,
    },
  },
  methods: {
    onDialogCardToggled: function (event) {
      this.dialog = !this.dialog
    },
  },
}
</script>
<template>
  <div class="text-center">
    <v-dialog v-model="dialog" :width="width">
      <template v-slot:activator="{ on, attrs }">
        <div color="red lighten-2" class="flex flex-column" dark v-bind="attrs" v-on="on"><slot /></div>
      </template>
      <v-card>
        <component :is="notificationName" @closeDialog="onDialogCardToggled"></component>
      </v-card>
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
    width: {
      type: Number,
      required: false,
    },
    notificationName: {
      type: String,
      required: true,
    },
  },
  methods: {
    onDialogCardToggled: function (event) {
      this.dialog = !this.dialog
    },
  },
}
</script>

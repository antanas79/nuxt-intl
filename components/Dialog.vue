<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <div color="red lighten-2" class="flex flex-column" dark v-bind="attrs" v-on="on"><slot /></div>
      </template>
      <Card :cols="cols" :maxWidth="600">
        <component :is="notificationName"></component>
      </Card>
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

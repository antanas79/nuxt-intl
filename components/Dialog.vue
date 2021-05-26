<template>
  <div :class="['text-center', className]">
    <v-dialog
      v-model="dialog"
      :width="width"
      class="dialog"
      :transition="$vuetify.breakpoint.xsOnly ? 'dialog-bottom-transition' : ''"
      :content-class="contentClass"
    >
      <template v-slot:activator="{ on, attrs }">
        <div color="red lighten-2" class="flex flex-column" dark v-bind="attrs" v-on="on"><slot /></div>
      </template>
      <v-card>
        <component :is="notificationName" @closeDialog="onDialogCardToggled" :data="data"></component>
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
      type: [Number, String],
      required: false,
    },
    notificationName: {
      type: String,
      required: true,
    },
    data: {
      type: [Object, Array],
      required: false,
    },
    className: {
      type: String,
      required: false,
    },
    contentClass: {
      type: String,
      required: false,
    },
  },
  methods: {
    onDialogCardToggled: function (event) {
      this.dialog = !this.dialog
    },
  },
}
</script>
<style scoped></style>

<template>
  <div>
    <v-card-title class="mb-6 d-flex justify-start blue"> Some title </v-card-title>
    <v-card-subtitle class="text-subtitle-1 pt-3 pb-0"> Some text </v-card-subtitle>
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
      required: false,
      default: 560,
    },
    // cols: {
    //   type: Number,
    //   required: true,
    //   default: 12,
    // },
  },
  methods: {
    // onDialogCardToggled: function (event) {
    //   this.dialog = !this.dialog
    // },
  },
}
</script>
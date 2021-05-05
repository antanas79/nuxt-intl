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
        :card="{ title: 'INFO_TITLE', subtitle: 'SOME_SUBTITLE' }"
        :hasButton="true"
        :titleClass="'blue'"
        :maxWidth="maxWidth"
        :dialogClass="'no-pointer-events'"
        :cols="cols"
      >
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
  },
  methods: {
    onDialogCardToggled: function (event) {
      this.dialog = !this.dialog
    },
  },
}
</script>
<template>
  <v-select
    :value="selectedValue"
    :items="selectorData"
    :item-text="itemText"
    :label="isLabel"
    hide-details
    flat
    solo
    :key="isKey"
    return-object
    single-line
    @input="$emit('changeSelection', $event)"
    :class="[{ 'currency-selection': currencyClass }, 'default']"
  >
    <template v-slot:selection="{ item }">
      <SvgRender :flag="flag" payment :name="item.path" />
      {{ item.currency }}
    </template>
    <template v-slot:item="{ item }"> <SvgRender :flag="flag" payment :name="item.path" />{{ item.currency }} </template>
  </v-select>
</template>

<script>
export default {
  props: {
    selectorData: {
      type: Array,
      required: true,
    },
    selectedValue: {
      type: null,
      required: false,
    },
    isKey: {
      type: Number,
      require: true,
    },
    flag: {
      type: Boolean,
      require: false,
    },
    itemText: {
      type: String,
      required: true,
    },
    currencyClass: {
      type: Boolean,
      required: false,
    },
    isLabel: {
      type: String,
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
#app {
  .currency-selection {
    max-width: 160px;
  }
  .currency-selection .v-input__slot {
    padding-left: 0;
  }
}
</style>

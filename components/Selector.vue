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
      <SvgRender :flag="flag" payment :name="item.path" class="d-none d-sm-block" />
      {{ item.currency }}
    </template>
    <template v-slot:item="{ item }"> <SvgRender :flag="flag" payment :name="item.path" class="d-none d-sm-block" />{{ item.currency }} </template>
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
    max-width: 110px;
  }

  @media all and (min-width: 320px) and (max-width: 575px) {
    .currency-selection {
      max-width: 60px;
    }
  }
}
</style>

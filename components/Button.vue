<template>
  <NuxtLink :class="nuxtLinkClassName" :to="localePath({ path: link })" v-if="isNuxtLink">
    <v-btn :disabled="isDisabled" :text="isText" :outlined="isOutlined" :color="color" :rounded="isRounded" :small="isSmall" :class="buttonClassName"
      >{{ $t(buttonText) }} <slot />
    </v-btn>
  </NuxtLink>

  <a :class="anchorClassName" :disabled="isDisabled" :href="link" v-else-if="isAnchor">
    <v-btn :disabled="isDisabled" :text="isText" :outlined="isOutlined" :color="color" :rounded="isRounded" :small="isSmall" :class="buttonClassName"
      >{{ $t(buttonText) }} <slot />
    </v-btn>
  </a>
  <v-btn
    :disabled="isDisabled"
    :text="isText"
    :outlined="isOutlined"
    :color="color"
    :rounded="isRounded"
    :small="isSmall"
    :class="buttonClassName"
    @click="$emit(eventName, payload)"
    v-else-if="isButton"
    >{{ $t(buttonText) }} <slot />
  </v-btn>
</template>


<script lang="ts">
export default {
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
    isRounded: {
      type: Boolean,
      required: false,
      default: true,
    },
    isOutlined: {
      type: Boolean,
      required: false,
      default: false,
    },
    isText: {
      type: Boolean,
      required: false,
      default: false,
    },
    isNuxtLink: {
      type: Boolean,
      required: false,
      default: false,
    },
    isAnchor: {
      type: Boolean,
      required: false,
      default: false,
    },
    link: {
      type: String,
      required: false,
    },
    isSmall: {
      type: Boolean,
      required: false,
      default: false,
    },
    buttonClassName: {
      type: String,
      required: false,
      default: 'dark--text',
    },
    anchorClassName: {
      type: String,
      required: false,
    },
    nuxtLinkClassName: {
      type: String,
      required: false,
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    isButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    eventName: {
      type: String,
      required: false,
    },
    payload: {
      type: Object,
      required: false,
    },
  },
  // computed: {},
}
</script>

<style lang="scss">
.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>

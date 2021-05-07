<template>
  <div
    v-if="name"
    :class="{
      'payment-cards': payment,
      'current-flag': flag,
      'small-icon': smallIcon,
      'team-logo': teamLogo,
      'money-back': moneyBack,
      'microsoft-gold ': moneyBackGuarantee,
      'money-back-guarantee ml-10': microsoftGold,
    }"
    v-html="src"
  ></div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    payment: {
      type: Boolean,
      required: false,
    },
    flag: {
      type: Boolean,
      required: false,
    },
    smallIcon: {
      type: Boolean,
      required: false,
    },
    teamLogo: {
      type: Boolean,
      required: false,
    },
    moneyBack: {
      type: Boolean,
      required: false,
    },
    moneyBackGuarantee: {
      type: Boolean,
      required: false,
    },
    microsoftGold: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    src() {
      const src = require(`~/assets/sprite/svg/${this.name}.svg?raw`)
      return src
    },
  },
}
</script>
<style lang="scss" scoped>
.money-back {
  width: 30px;
  height: 40px;
}
.team-logo {
  width: 100px;
  height: 120px;
}
.payment-cards {
  height: 35px;
  width: 60px;
  margin: 0 2px;
  &:first-child {
    margin-left: 0;
  }
}
.money-back-guarantee {
  height: 120px;
  width: 134px;
}
.microsoft-gold {
  height: 70px;
  width: 150px;
}
.current-flag {
  height: 35px;
  width: 35px;
}
.small-icon {
  width: 15px;
  height: 15px;
}
</style>

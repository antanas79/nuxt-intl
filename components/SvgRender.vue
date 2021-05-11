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
    :title="title"
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
    title: {
      type: String,
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

.team-logo ::v-deep {
  width: 100px;
  height: 120px;
  fill: #969696;
  .blue {
    transition: fill 0.1s linear 0.2s;
  }
  .green {
    transition: fill 0.1s linear 0s;
  }
  .yellow {
    transition: fill 0.1s linear 0.1s;
  }
  .red {
    transition: fill 0.1s linear 0.3s;
  }
  :hover .blue {
    fill: #8bb8e2;
  }
  :hover .green {
    fill: #54b846;
  }
  :hover .red {
    fill: #ee6c4a;
  }
  :hover .yellow {
    fill: #ffd938;
  }
}

.payment-cards ::v-deep {
  height: 35px;
  width: 60px;
  margin: 0 2px;
  &:first-child {
    margin-left: 0;
  }
}
.money-back-guarantee ::v-deep {
  height: 120px;
  width: 134px;
  fill: #969696;
  transition: fill 0.15s ease-in-out;
  :hover.white {
    fill: #ffff;
  }
}
.microsoft-gold ::v-deep {
  height: 70px;
  width: 150px;
  fill: #969696;
  .gold {
    transition: fill 0.15s ease-in-out;
  }
  .black {
    transition: fill 0.15s ease-in-out;
  }
  :hover .gold {
    fill: #dac061;
  }
  :hover .black {
    fill: #000;
  }
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

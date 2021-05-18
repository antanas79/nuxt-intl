<template>
  <div
    v-if="name"
    :class="[
      {
        'current-flag': flag,
        'small-icon': smallIcon,
      },
      className,
    ]"
    v-html="src"
    :title="$t(title)"
  ></div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    flag: {
      type: Boolean,
      required: false,
    },
    smallIcon: {
      type: Boolean,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    className: {
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
<style lang="scss">
.svg-gray {
  fill: #8c8c8c;
}
.svg-light-gray {
  fill: #f6f6f6;
}
.svg-light-gray-overlaps {
  fill: #aaaaaa;
}
.svg-dark-gray {
  fill: #4f4f4f;
}
.svg-white {
  fill: #ffff;
}
#money-back {
  width: 30px;
  height: 40px;
}
#team-logo {
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
  &:hover .blue {
    fill: #8bb8e2;
  }
  &:hover .green {
    fill: #54b846;
  }
  &:hover .red {
    fill: #ee6c4a;
  }
  &:hover .yellow {
    fill: #ffd938;
  }
}
.payment-margin {
  margin: 0 2px;
  &:first-child {
    margin-left: 0;
  }
  .payment-card {
    height: 35px;
    width: 60px;
  }
  #visa {
    path {
      transition: fill 0.15s ease-in-out;
    }
    &:hover .blue {
      fill: #265697;
    }
    &:hover .orange {
      fill: #d97b16;
    }
  }
  #american-express {
    path {
      transition: fill 0.15s ease-in-out;
    }
    &:hover .blue {
      fill: #016fd0;
    }
  }
  #master-card {
    path {
      transition: fill 0.15s ease-in-out;
    }
    &:hover .red {
      fill: #eb001b;
    }
    &:hover .red-orange-overlaps {
      fill: #ff5f00;
    }
    &:hover .orange {
      fill: #f79e1b;
    }
  }
  #discover-network {
    path {
      transition: fill 0.15s ease-in-out;
    }
    &:hover .orange {
      fill: #d97b16;
    }
  }
  #wire-transfer {
    path {
      transition: fill 0.15s ease-in-out;
    }
    &:hover .light-blue {
      fill: #00afd8;
    }
    &:hover .blue {
      fill: #006e90;
    }
    &:hover .green {
      fill: #d97b16;
    }
  }
  #purchase-order {
    path {
      transition: fill 0.15s ease-in-out;
    }
    &:hover .blue {
      fill: #3d5aa2;
    }
  }
  #money-order {
    path {
      transition: fill 0.15s ease-in-out;
    }
    &:hover .green {
      fill: #72a551;
    }
  }
  #check-card {
    path {
      transition: fill 0.15s ease-in-out;
    }
    &:hover .blue {
      fill: #3d5aa2;
    }
  }
  #pay-pal {
    path {
      transition: fill 0.15s ease-in-out;
    }
    &:hover .light-blue {
      fill: #107db0;
    }
    &:hover .dark-blue {
      fill: #1b557d;
    }
  }
  #pay-later {
    path {
      transition: fill 0.15s ease-in-out;
    }
    &:hover .blue {
      fill: #3d5aa2;
    }
    &:hover .green {
      fill: #72a551;
    }
  }
}
#money-back-guarantee {
  height: 120px;
  width: 134px;
  fill: #969696;
  path {
    transition: fill 0.15s ease-in-out;
  }
  &:hover .inner {
    fill: #969696;
    opacity: 0.8;
  }
}
#microsoft-gold {
  height: 70px;
  width: 150px;
  fill: #969696;
  .gold {
    transition: fill 0.15s ease-in-out;
  }
  .black {
    transition: fill 0.15s ease-in-out;
  }
  &:hover .gold {
    fill: #dac061;
  }
  &:hover .black {
    fill: #000;
  }
}
.current-flag {
  height: 35px;
  width: 35px;
}
.small-icon {
  display: flex;

  svg {
    margin-top: 2px;
    width: 15px;
    height: 15px;
    min-width: 15px;
    min-height: 15px;
  }
}
#pay-later-schema {
  width: 220px;
}

@media (max-width: 360px) {
  #money-back-guarantee {
    width: 110px;
  }
  #microsoft-gold {
    width: 130px;
  }
}
</style>

<template>
  <div>
    <div class="d-flex flex-md-row flex-column upgrade-support-container">
      <div class="lifetime-license px-0 pl-md-3 pr-md-4">
        <v-card-title class="headline pb-6 text-h5"> {{ $t(upgradeSupportData.lifetimeLicenseTitle) }}</v-card-title>
        <v-card-text class="pb-0 text-subtitle-2">
          <p class="">{{ $t(upgradeSupportData.lifetimeLicenseSubtitle) }}</p>
          <ul class="list-lifetime-license">
            <li class="pb-4" v-for="item in upgradeSupportData.listLifetimeLicense" :key="'A' + item.id">{{ $t(item.name) }}</li>
          </ul>
        </v-card-text>
      </div>
      <v-divider vertical class="my-5 d-md-block d-none"></v-divider>
      <v-divider class="d-block d-md-none mx-5"></v-divider>
      <div class="purchase-upgrade-container d-flex flex-column px-0 pl-md-3 pr-md-4">
        <v-card-title class="headline pb-6 text-h5">{{ $t(upgradeSupportData.purchaseUpgradeTitle) }} </v-card-title>
        <v-card-text class="pb-0 card-text-block flex-grow-1 d-flex flex-column justify-space-between">
          <div>
            <ul class="list-purchase-upgrade text-subtitle-2">
              <li class="pb-4" v-for="item in upgradeSupportData.purchaseUpgradeList" :key="'B' + item.id">{{ $t(item.name) }}</li>
            </ul>
            <p class="text-caption pt-2">{{ $t(upgradeSupportData.purchaseUpgradeCaption1) }}</p>
          </div>
          <div class="caption-block justify-space-between">
            <div class="">
              <Link link="/">
                <p class="text-caption mb-0">{{ $t(upgradeSupportData.purchaseUpgradeCaption2) }}</p>
              </Link>
              <p class="text-caption">{{ $t(upgradeSupportData.purchaseUpgradeCaption3) }}</p>
            </div>
          </div>
        </v-card-text>
      </div>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <Button buttonClassName="text-subtitle-1" color="blue" isText :buttonText="payLaterData.buttonChatNow"></Button>
      <Button
        buttonClassName="text-subtitle-1"
        color="blue"
        isText
        :buttonText="payLaterData.buttonClose"
        eventName="closeDialog"
        @closeDialog="$emit('closeDialog')"
      ></Button>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    upgradeSupportData: {
      type: Object,
      default: () => ({
        lifetimeLicenseTitle: 'NOTIFICATION_LIFETIME_LICENSE_BENEFITS_TITLE',
        lifetimeLicenseSubtitle: 'NOTIFICATION_LIFETIME_LICENSE_BENEFITS_SUBTITLE',
        lifetimeLicenseist: [
          { id: 1, name: 'NOTIFICATION_LIFETIME_LICENSE_BENEFITS_LIST_TEXT_1' },
          { id: 2, name: 'NOTIFICATION_LIFETIME_LICENSE_BENEFITS_LIST_TEXT_2' },
          { id: 3, name: 'NOTIFICATION_LIFETIME_LICENSE_BENEFITS_LIST_TEXT_3' },
          { id: 4, name: 'NOTIFICATION_LIFETIME_LICENSE_BENEFITS_LIST_TEXT_4' },
          { id: 5, name: 'NOTIFICATION_LIFETIME_LICENSE_BENEFITS_LIST_TEXT_5' },
          { id: 6, name: 'NOTIFICATION_LIFETIME_LICENSE_BENEFITS_LIST_TEXT_6' },
        ],
        purchaseUpgradeTitle: 'NOTIFICATION_PURCHASE_UPGRADE_TITLE',
        purchaseUpgradeList: [
          { id: 1, name: 'NOTIFICATION_PURCHASE_UPGRADE_LIST_TEXT_1' },
          { id: 2, name: 'NOTIFICATION_PURCHASE_UPGRADE_LIST_TEXT_2' },
          { id: 3, name: 'NOTIFICATION_PURCHASE_UPGRADE_LIST_TEXT_3' },
          { id: 4, name: 'NOTIFICATION_PURCHASE_UPGRADE_LIST_TEXT_4' },
        ],
        purchaseUpgradeCaption1: 'NOTIFICATION_PURCHASE_UPGRADE_CAPTION_TEXT_1',
        purchaseUpgradeCaption2: 'NOTIFICATION_PURCHASE_UPGRADE_CAPTION_TEXT_2',
        purchaseUpgradeCaption3: 'NOTIFICATION_PURCHASE_UPGRADE_CAPTION_TEXT_3',
        buttonChatNow: 'NOTIFICATION_BUTTON_CHAT_NOW',
        buttonClose: 'NOTIFICATION_BUTTON_CLOSE',
      }),
    },
  },
}
</script>

<style lang="scss" scoped>
.headline {
  word-break: normal;
}
.lifetime-license {
  max-width: 550px;
  flex: 1;
  .list-lifetime-license {
    li {
      list-style: disc;
    }
  }
}
.purchase-upgrade-container {
  flex: 1;
  max-width: 450px;
  .list-purchase-upgrade {
    li {
      list-style: decimal;
    }
  }
}
@media (max-width: 767px) {
  .lifetime-license {
    max-width: 100%;
  }
  .purchase-upgrade-container {
    flex: 1;
    max-width: 100%;
  }
}
</style>

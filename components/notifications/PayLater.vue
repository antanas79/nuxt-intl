<template>
  <div>
    <v-card-title class="headline">
      <div class="d-flex">
        <SvgRender name="pay-later" smallIcon />
        Pay Later
      </div>
    </v-card-title>
    <v-card-text class="pb-0">
      <p>Pay with 2-weeks installments, without price increase.</p>
      <div class="d-flex gray pa-3 d-flex justify-space-between">
        <SvgRender name="pay-later-schema" />
        <ul class="schema-text d-flex flex-column justify-center blue--text pr-5">
          <li>NO FEES</li>
          <li>NO APPROVAL NEEDED</li>
          <li>NO PRICE INCREASE</li>
        </ul>
        <!--   <v-divider vertical class=""></v-divider> -->
      </div>
      <p class="mb-0">Your order is divided into multiple bi-weekly payments according to the total order sum:</p>
      <div class="prices-block">
        <p class="mb-1">$20.00 - $29.99 - <b>2 payments</b></p>
        <p class="mb-1">$20.00 - $29.99 - <b>2 payments</b></p>
        <p class="mb-1">$20.00 - $29.99 - <b>2 payments</b></p>
        <p class="mb-1">$20.00 - $29.99 - <b>2 payments</b></p>
        <p class="mb-1">$20.00 - $29.99 - <b>2 payments</b></p>
      </div>
      <p class="mb-0">
        <b>If Easy Pay method is selected, you will be charged each 2 weeks</b> You will then be receiving bi-weekly billing statements with payment due and a
        remaining balance of your order
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue" text @click="dialog = false"> chat now </v-btn>
      <v-btn color="blue" text @click="dialog = false"> Close </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: 'PayLater',
}
</script>

<style lang="scss" scoped></style>

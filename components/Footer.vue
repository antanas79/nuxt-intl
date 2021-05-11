<template>
  <div class="pt-10 gray">
    <Layout>
      <v-row class="footer-content">
        <v-col xl="4" lg="4" md="4" sm="6" cols="12" class="col-logo-container d-flex">
          <SvgRender name="team-logo" teamLogo :title="$t(footerData.teamLogoTitle)" />
          <div class="pl-3">
            <p v-for="(item, index) in footerData.corporationInformation" :key="index" :class="`${index === 0 && 'font-weight-bold'} pb-2`">{{ item }}</p>
          </div>
        </v-col>
        <v-col xl="4" lg="4" md="3" sm="6" cols="12" class="col-numbers d-flex justify-md-start">
          <div>
            <p v-for="(item, index) in footerData.contacts" :key="'C' + index" class="pb-2">
              <span class="font-weight-bold">{{ item.name }}</span>
              <a :href="`tel:` + item.number" class="link-underline">{{ item.number }}</a>
            </p>
          </div>
        </v-col>
        <v-col xl="4" lg="4" md="5" sm="12" cols="12" class="input-arrow-container d-flex justify-space-between flex-md-column align-md-end">
          <div class="input-arrow">
            <p class="label mb-2" v-html="$t(footerData.footerInputLabel)"></p>
            <v-text-field :placeholder="$t(footerData.footerInputPlaceholder)" v-model="email" rounded filled flat solo>
              <template slot="append">
                <v-icon class="arrow-btn">mdi-arrow-right</v-icon>
              </template></v-text-field
            >
          </div>
          <div class="buttons-block d-flex justify-md-end align-center pb-0 pb-md-10">
            <v-btn v-for="(item, index) in footerData.buttons" :key="'B' + index" :class="`${index === 1 && 'mx-2'}`" text elevation rounded
              ><NuxtLink :to="item.innerLink" :title="$t(item.title)" class="black--text">{{ $t(item.name) }}</NuxtLink></v-btn
            >
          </div></v-col
        >
        <v-col class="pb-5 footer-bottom">
          <p class="pb-3">
            Copyright {{ date() }}
            {{ $t(footerData.footerBottomTopText) }}
          </p>
          <p>
            {{ $t(footerData.footerBottomMainText) }}
          </p>
        </v-col>
      </v-row>
    </Layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      date: () => new Date().getFullYear(),
    }
  },
  props: {
    footerData: {
      type: Object,
      default: () => ({
        corporationInformation: ['4Team Corporation', '5645 Coral Ridge Dr #211', 'Coral Springs', 'FL 33076, USA'],
        buttons: [
          {
            id: 1,
            name: 'FOOTER_BUTTON_NAME_1',
            innerLink: '/about',
            title: 'FOOTER_BUTTON_TITLE_1',
          },
          {
            id: 2,
            name: 'FOOTER_BUTTON_NAME_2',
            innerLink: '/privacy',
            title: 'FOOTER_BUTTON_TITLE_2',
          },
          {
            id: 3,
            name: 'FOOTER_BUTTON_NAME_3',
            innerLink: '/terms',
            title: 'FOOTER_BUTTON_TITLE_3',
          },
        ],
        contacts: [
          {
            id: 1,
            name: 'USA',
            number: '+1 (954) 796-8161',
          },
          {
            id: 2,
            name: 'UK',
            number: '+44 20 3371 8464',
          },
          {
            id: 3,
            name: 'Canada',
            number: '+1 647 477-3340',
          },
          {
            id: 4,
            name: 'France',
            number: '+33 1 86 26 42',
          },
          {
            id: 5,
            name: 'Skype',
            number: 'teamcorporation',
          },
          {
            id: 6,
            name: 'Fax',
            number: '+1 (954) 780-3795',
          },
        ],
        footerBottomTopText: 'FOOTER_BOTTOM_COPYRIGHT',
        footerBottomMainText: 'FOOTER_BOTTOM_MAIN_TEXT',
        footerInputLabel: 'FOOTER_INPUT_LABEL',
        footerInputPlaceholder: 'FOOTER_INPUT_PLACEHOLDER',
        teamLogoTitle: 'TEAM_LOGO_ICON_TITLE',
      }),
    },
  },
  computed: {
    show() {
      console.log(this.email)
    },
  },
}
</script>

<style lang="scss" scoped>
.input-arrow {
  width: 100%;
}
.flexItems {
  display: flex;
}
.label {
  padding-left: 24px;
}
.arrow-btn {
  cursor: pointer;
}
a {
  text-decoration: none;
}
p {
  margin: 0;
}
.footer-bottom {
  max-width: 70%;
  font-size: 0.7rem;
}
@media (max-width: 960px) {
  .col-numbers {
    justify-content: flex-end;
  }
}
@media (max-width: 768px) {
  .label {
    padding-left: 0;
  }
  .footer-content {
    display: flex;
    flex-direction: column;
  }
  .col-numbers {
    justify-content: start;
  }
  .input-arrow-container {
    flex-direction: column;
  }
  .buttons-block {
    justify-content: flex-start;
  }
  .footer-bottom {
    max-width: 100%;
  }
}
</style>

<template>
  <div class="pt-10 gray">
    <Layout>
      <v-row class="footer-content">
        <v-col xl="4" lg="4" md="6" sm="12" cols="12" class="col-logo-container d-flex">
          <Link :isExternal="footerData.teamLogo.isExternal" :link="footerData.teamLogo.link" :title="footerData.teamLogo.title" className="align-self-start">
            <SvgRender name="team-logo" className="team-logo"
          /></Link>
          <div class="pl-3">
            <p v-for="(item, index) in footerData.corporationInformation" :key="index" :class="`${index === 0 && 'font-weight-bold'} pb-2`">{{ item }}</p>
          </div>
        </v-col>
        <v-col xl="4" lg="4" md="6" sm="12" cols="12" class="d-flex justify-lg-start justify-md-end">
          <div>
            <p v-for="(item, index) in footerData.contacts" :key="'C' + index" class="pb-2">
              <span class="font-weight-bold">{{ item.name }}</span>
              <a :href="`tel:` + item.number" class="link-underline">{{ item.number }}</a>
            </p>
          </div>
        </v-col>
        <v-col xl="4" lg="4" md="12" sm="12" cols="12" class="d-flex flex-lg-column flex-md-row flex-column justify-space-between">
          <div class="input-arrow">
            <p class="label mb-2 text-no-wrap" v-html="$t(footerData.footerInputLabel)"></p>

            <v-form v-model="isFormValid" class="email-form">
              <v-text-field
                :placeholder="$t(footerData.footerInputPlaceholder)"
                v-model="email"
                rounded
                filled
                flat
                solo
                outlined
                :success="!!email"
                :rules="rules"
              >
                <template #message="{ message }">
                  {{ $t(message) }}
                </template>
                <template v-if="!isFormValid && !!email" slot="append">
                  <v-icon class="red--text">mdi-alert-circle </v-icon>
                </template>
                <template v-if="isFormValid && !!email" slot="append">
                  <v-icon class="green--text">mdi-check-circle</v-icon>
                </template>
                <template slot="append">
                  <v-btn icon color="arrow-btn">
                    <v-icon>mdi-arrow-right</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </v-form>
          </div>
          <div class="d-flex justify-md-end justify-start align-center pb-0 pb-lg-10 flex-wrap">
            <Button
              v-for="(item, index) in footerData.buttons"
              :key="'B' + index"
              :class="`${index === 1 && 'mx-2'}`"
              isText
              :isAnchor="item.isExternal"
              :isNuxtLink="!item.isExternal"
              :link="item.innerLink"
              :title="$t(item.title)"
              :buttonText="item.name"
            >
            </Button>
          </div>
        </v-col>
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
      isFormValid: false,
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
            isExternal: false,
            name: 'FOOTER_BUTTON_NAME_1',
            link: '/about',
            title: 'FOOTER_BUTTON_TITLE_1',
          },
          {
            id: 2,
            isExternal: false,
            name: 'FOOTER_BUTTON_NAME_2',
            link: '/privacy',
            title: 'FOOTER_BUTTON_TITLE_2',
          },
          {
            id: 3,
            isExternal: false,
            name: 'FOOTER_BUTTON_NAME_3',
            link: '/terms',
            title: 'FOOTER_BUTTON_TITLE_3',
          },
        ],
        contacts: [
          {
            id: 1,
            name: 'USA:',
            number: '+1 (954) 796-8161',
          },
          {
            id: 2,
            name: 'UK:',
            number: '+44 20 3371 8464',
          },
          {
            id: 3,
            name: 'Canada:',
            number: '+1 647 477-3340',
          },
          {
            id: 4,
            name: 'France:',
            number: '+33 1 86 26 42',
          },
          {
            id: 5,
            name: 'Skype:',
            number: 'teamcorporation',
          },
          {
            id: 6,
            name: 'Fax:',
            number: '+1 (954) 780-3795',
          },
        ],
        footerBottomTopText: 'FOOTER_BOTTOM_COPYRIGHT',
        footerBottomMainText: 'FOOTER_BOTTOM_MAIN_TEXT',
        footerInputLabel: 'FOOTER_INPUT_LABEL',
        footerInputPlaceholder: 'FOOTER_INPUT_PLACEHOLDER',
        teamLogo: {
          title: 'ICON_TEAM_LOGO_TITLE',
          isExternal: true,
          link: 'http://www.4team.biz',
        },
        validation: {
          required: 'VALIDATION_REQUIRED',
          emailInvalid: 'VALIDATION_EMAIL_INVALID',
        },
      }),
    },
  },
  computed: {
    show() {
      console.log(this.email)
    },
    rules() {
      return this.$i18n.locale
        ? [
            (value) => !!value || this.footerData.validation.required,
            (value) => {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return pattern.test(value) || this.footerData.validation.emailInvalid
            },
          ]
        : []
    },
  },
}
</script>

<style lang="scss" scoped>
.input-arrow ::v-deep {
  width: 100%;
  max-width: 380px;
  .v-text-field__details {
    padding-left: 24px;
  }
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

@media (max-width: 767px) {
  .footer-bottom {
    max-width: 100%;
  }
  .label {
    padding-left: 0;
  }
}
</style>

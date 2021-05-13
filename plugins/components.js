// // import Vue from 'vue'
// // import BaseIcon from '../components/BaseIcon'

// // const components = { BaseIcon }

// // Object.entries(components).forEach(([name, component]) => {
// //     Vue.component(name, component)
// // })
// import Vue from 'vue'
// import upperFirst from 'lodash/upperFirst'
// import camelCase from 'lodash/camelCase'

// const requireComponent = require.context(
//     '~/components/global',
//     false,
//     /Base[A-Z]\w+\.(vue|js)$/
// )

// requireComponent.keys().forEach((fileName) => {
//     const componentConfig = requireComponent(fileName)
//     const componentName = upperFirst(
//         camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
//     )

//     Vue.component(componentName, componentConfig.default || componentConfig)
// })
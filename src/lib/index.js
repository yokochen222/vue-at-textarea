import atTextarea from '../components/atTextarea'

const AtTextarea = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component(atTextarea.name, atTextarea)
  }
}

export default AtTextarea
import VueAtTextarea from './components/atTextarea'

const atTextarea = {
  install: function (Vue) {
    Vue.component(VueAtTextarea.name, VueAtTextarea)
  }
}

// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(atTextarea)
}

export {
  VueAtTextarea
}

export default atTextarea
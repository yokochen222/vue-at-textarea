import atTextarea from '../components/atTextarea'

const AtTextarea = {
  install: function (Vue) {
    Vue.component(atTextarea.name, atTextarea)
  }
}

// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(atTextarea)
}


export default AtTextarea
export default {
  namespaced: true,
  state: {
    departOption: null
  },
  mutations: {
    setDepartOption (state, data) {
      console.dir(data)
      console.dir(state)
      console.dir('1')
      state.departOption = data
      localStorage.setItem('departOption_sel', JSON.stringify(data))
    }
  },
  getters: {
    getDepartOption: (state) => {
      console.dir('2')
      const cache = localStorage.getItem('departOption_sel')
      let cacheData = null
      if (cache) {
        cacheData = JSON.parse(cache)
      }
      if (state.departOption) {
        return state.departOption
      } else {
        return cacheData
      }
    }
  },
  actions: {
    departOption (context, param) {
      console.dir(param)
      let tmp = []
      for (let item of param) {
        tmp.push({
          name: item.name,
          value: item.id
        })
      }
      console.dir(tmp)
      context.commit('setDepartOption', tmp)
    }
  }
}

export default {
  namespaced: true,
  state: {
    positionOption: null
  },
  mutations: {
    setPositionOption (state, data) {
      console.dir(data)
      console.dir(state)
      console.dir('1')
      state.positionOption = data
      localStorage.setItem('positionOption_sel', JSON.stringify(data))
    }
  },
  getters: {
    getPositionOption: (state) => {
      console.dir('2')
      const cache = localStorage.getItem('positionOption_sel')
      let cacheData = null
      if (cache) {
        cacheData = JSON.parse(cache)
      }
      if (state.positionOption) {
        return state.positionOption
      } else {
        return cacheData
      }
    }
  },
  actions: {
    PositonOption (context, param) {
      console.dir(param)
      let tmp = []
      for (let item of param) {
        tmp.push({
          name: item.name,
          value: item.id
        })
      }
      console.dir(tmp)
      context.commit('setPositionOption', tmp)
    }
  }
}

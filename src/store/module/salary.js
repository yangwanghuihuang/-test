export default {
  namespaced: true,
  state: {
    salaryOption: null
  },
  mutations: {
    setSalaryOption (state, data) {
      console.dir(data)
      console.dir(state)
      console.dir('1')
      state.salaryOption = data
      localStorage.setItem('salaryOption_sel', JSON.stringify(data))
    }
  },
  getters: {
    getSalaryOption: (state) => {
      console.dir('2')
      const cache = localStorage.getItem('salaryOption_sel')
      let cacheData = null
      if (cache) {
        cacheData = JSON.parse(cache)
      }
      if (state.salaryOption) {
        return state.salaryOption
      } else {
        return cacheData
      }
    }
  },
  actions: {
    salaryOption (context, param) {
      console.dir(param)
      let tmp = []
      for (let item of param) {
        tmp.push({
          name: item.name,
          value: item.id
        })
      }
      console.dir(tmp)
      context.commit('setSalaryOption', tmp)
    }
  }
}

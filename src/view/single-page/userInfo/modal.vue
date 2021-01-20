<template>
  <section class="modal">
    <Modal v-model="modal1" :title="title" @on-ok="ok" @on-cancel="cancel">
      <p>{{filename}}</p>
    </Modal>
  </section>
</template>

<script>
export default {
  name: 'modal',
  props: {
    filename: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      modal1: true
    }
  },
  components: {},
  watch: {},
  mounted () { },
  methods: {
    ok () {
      this.$emit('success', '1')
    },
    cancel () {
      this.$emit('success', '1')
    }
  }
}
</script>

<style scoped lang="less">
</style>

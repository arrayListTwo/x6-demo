<template>
  <el-progress type="dashboard" :percentage="percentage" :width="80">
    <template #default="{ percentage }">
      <span class="percentage-value">{{ percentage }}</span>
    </template>
  </el-progress>
</template>

<script>

export default {
  name: 'ProgressNode',
  inject: ['getNode'],
  data () {
    return {
      percentage: 80
    }
  },
  mounted () {
    const node = this.getNode()
    console.log('node: ', node)
    this.percentage = node.getData().progress
    node.on('change:data', ({ current }) => {
      const { progress } = current
      this.percentage = progress
    })
  }
}
</script>

<style scoped lang="scss">

</style>

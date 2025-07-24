<template>
  <div class="x6-vue">
    <h2>x6-vue</h2>
    <div id="container"></div>
  </div>
</template>

<script>
import { Graph } from '@antv/x6'
import { register } from '@antv/x6-vue-shape'
import ProgressNode from '@/components/ProgressNode.vue'

register({
  shape: 'custom-vue-node',
  width: 100,
  height: 100,
  component: ProgressNode
})

export default {
  name: 'x6-vue',
  mounted () {
    const graph = new Graph({
      container: document.getElementById('container'),
      width: 800,
      height: 600,
      background: {
        color: '#F2F7FA'
      }
    })
    const node = graph.addNode({
      shape: 'custom-vue-node',
      x: 100,
      y: 60,
      data: {
        progress: 60
      }
    })

    setInterval(() => {
      const { progress } = node.getData()
      node.setData({
        progress: (progress + 10) % 100
      })
    }, 2000)
  }
}
</script>

<style scoped lang="scss">

</style>

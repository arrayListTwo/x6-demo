<template>
  <div class="about-wrapper">
    <div class="graph-wrapper">
      <div class="app-content" id="container"></div>
    </div>
    <div class="btn-group">
      <button @click="exportGraphData">导出</button>
    </div>
  </div>
</template>

<script>
import { Graph } from '@antv/x6'
import { Snapline } from '@antv/x6-plugin-snapline'

export default {
  name: 'About',
  data () {
    return {
      msg: 'This is an about page',
      graph: null
    }
  },
  mounted () {
    const graphData = {
      nodes: [
        {
          id: 'node1',
          shape: 'rect',
          x: 40,
          y: 40,
          width: 100,
          height: 40,
          label: 'hello node1',
          attrs: {
            // body 是选择器名称，选中的是 rect 元素
            body: {
              stroke: '#8f8f8f',
              strokeWidth: 1,
              fill: '#fff',
              rx: 6,
              ry: 6
            }
          }
        },
        {
          id: 'node2',
          shape: 'rect',
          x: 160,
          y: 180,
          width: 100,
          height: 40,
          label: 'world node2',
          attrs: {
            body: {
              stroke: '#8f8f8f',
              strokeWidth: 1,
              fill: '#fff',
              rx: 6,
              ry: 6
            }
          }
        }
      ],
      edges: [
        {
          shape: 'edge',
          source: 'node1',
          target: 'node2',
          label: 'x6',
          attrs: {
            // line 是选择器名称，选中的边的 path 元素
            line: {
              stroke: '#8f8f8f',
              strokeWidth: 1
            }
          }
        }
      ]
    }

    this.graph = new Graph({
      container: document.getElementById('container'),
      width: 800,
      height: 600,
      background: {
        color: '#F2F7FA'
      }
    })

    // 添加 Snipline 插件
    this.graph.use(new Snapline({
      enabled: true
    }))
    // 渲染元素
    this.graph.fromJSON(graphData)
    // 局中显示
    this.graph.centerContent()
  },
  methods: {
    exportGraphData () {
      console.log(JSON.stringify(this.graph.toJSON(), 2))
    }
  }
}
</script>

<style lang="sass" scoped>
.about-wrapper
  display: flex
  flex-direction: column
  width: 100%
  height: 100%
  font-family: sans-serif

  .graph-wrapper
    display: flex
    flex-direction: column
    align-items: center

    .app-content
      height: 280px
      border-radius: 5px
      box-shadow: 0 12px 5px -10px rgb(0 0 0 / 10%), 0 0 4px 0 rgb(0 0 0 / 10%)
  .btn-group
    margin-top: 8px
</style>

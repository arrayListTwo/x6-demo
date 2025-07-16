<template>
  <div class="about-wrapper">
    <div class="graph-wrapper" style="width:100%; height:100%">
      <div class="app-content" id="container"></div>
    </div>
    <div class="btn-group">
      <button @click="addNode">添加节点</button>
      <button @click="getNodeProp">节点prop()</button>
      <button @click="setProp">更改prop</button>
      <button @click="setAttr">更改attr</button>
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
      graph: null,
      node: null
    }
  },
  mounted () {
    // 自定义节点
    Graph.registerNode('custom-node', {
      inherit: 'rect', // 继承自 rect 节点
      width: 100,
      height: 40,
      markup: [
        {
          tagName: 'rect', // 标签名称
          selector: 'body' // 选择器名称
        },
        {
          tagName: 'image',
          selector: 'img'
        },
        {
          tagName: 'text',
          selector: 'label'
        }
      ],
      attrs: {
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6
        },
        img: {
          'xlink:href': 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
          width: 16,
          height: 16,
          x: 12,
          y: 12
        }
      }
    })

    // 自定义节点连接桩
    Graph.registerNode('custom-node-with-port', {
      inherit: 'rect',
      width: 100,
      height: 40,
      attrs: {
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6
        }
      },
      ports: {
        groups: {
          top: {
            position: 'top',
            attrs: {
              circle: {
                magnet: true,
                stroke: '#e11616',
                r: 5
              }
            }
          },
          bottom: {
            position: 'bottom',
            attrs: {
              circle: {
                magnet: true,
                stroke: '#78dc1a',
                r: 5
              }
            }
          }
        }
      }
    }, true)

    /* const graphData = {
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
    } */

    this.graph = new Graph({
      container: document.getElementById('container'),
      autoResize: true,
      width: 800,
      height: 600,
      background: {
        color: '#F2F7FA'
      },
      grid: {
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#eee', // 主网格线颜色
            thickness: 1 // 主网格线宽度
          },
          {
            color: '#ddd', // 次网格线颜色
            thickness: 1, // 次网格线宽度
            factor: 4 // 主次网格线间隔
          }
        ]
      },
      panning: true,
      mousewheel: true,
      connecting: {
        router: 'orth',
        connector: 'rounded',
        allowLoop: false,
        allowBlank: false,
        allowMulti: false,
        createEdge () {
          return this.createEdge({
            attrs: {
              line: {
                stroke: '#8f8f8f',
                strokeWidth: 1
              }
            }
          })
        },
        /*  validateMagnet ({ magnet }) {
          console.log('magnet: ', magnet)
          // 节点上方的连接桩无法创建连线
          return magnet.getAttribute('port-group') !== 'top'
        },
        validateConnection ({
          sourceCell,
          targetCell,
          sourceMagnet,
          targetMagnet
        }) {
          // 不能连接自身
          if (sourceCell === targetCell) {
            return false
          }

          // 只能从 bottom 连接桩开始连接，连接到 top 连接桩
          if (
            !sourceMagnet ||
            sourceMagnet.getAttribute('port-group') === 'top'
          ) {
            return false
          }
          if (
            !targetMagnet ||
            targetMagnet.getAttribute('port-group') !== 'top'
          ) {
            return false
          }
          // 不能重复连线
          const edges = this.getEdges()
          const portId = targetMagnet.getAttribute('port')
          if (edges.find((edge) => edge.getTargetPortId() === portId)) {
            return false
          }

          return true
        }, */
        highlighting: {
          // 连接桩可以被连接时在连接桩外围围渲染一个包围框
          magnetAvailable: {
            name: 'stroke',
            args: {
              attrs: {
                fill: '#fff',
                stroke: '#A4DEB1',
                strokeWidth: 4
              }
            }
          },
          // 连接桩吸附连线时在连接桩外围围渲染一个包围框
          magnetAdsorbed: {
            name: 'stroke',
            args: {
              attrs: {
                fill: '#fff',
                stroke: '#31d0c6',
                strokeWidth: 4
              }
            }
          }
        }
      },
      embedding: {
        enabled: true,
        findParent ({ node }) {
          // 获取移动节点的包围盒
          const bbox = node.getBBox()
          console.log('bbox: ', bbox)
          // 找到 data 中配置 { parent: true } 的节点，并且移动节点和找到的节点包围盒相交时，返回 true
          console.log('this.getNodes(): ', this.getNodes())
          return this.getNodes().filter((node) => {
            const data = node.getData()
            if (data && data.parent) {
              const targetBBox = node.getBBox()
              console.log('targetBBox: ', targetBBox)
              console.log('intersect: ', bbox.isIntersectWithRect(targetBBox))
              return bbox.isIntersectWithRect(targetBBox)
            }
            return false
          })
        }
      }
    })

    // 添加 Snipline 插件
    this.graph.use(new Snapline({
      enabled: true
    }))

    const source = this.graph.addNode({
      shape: 'custom-node-with-port',
      x: 40,
      y: 40,
      width: 300,
      height: 100,
      label: 'hello',
      ports: {
        items: [
          {
            id: 'port1',
            group: 'top',
            label: {
              position: 'right'
            },
            attrs: {
              text: {
                text: 'hello'
              }
            }
          },
          {
            id: 'port2',
            group: 'bottom'
          },
          {
            id: 'port3',
            group: 'top'
          },
          {
            id: 'port4',
            group: 'bottom'
          }
        ]
      },
      data: {
        parent: true
      }
    })

    /*  const target = this.graph.addNode({
      shape: 'custom-node',
      x: 160,
      y: 180,
      label: 'world'
    }) */

    const target = this.graph.addNode({
      shape: 'custom-node-with-port',
      x: 160,
      y: 180,
      label: 'world',
      ports: {
        items: [
          {
            id: '2port1',
            group: 'top'
          }
        ]
      }
    })

    this.graph.addEdge({
      shape: 'edge',
      source,
      target,
      attrs: {
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          sourceMarker: {
            tagName: 'path',
            d: 'M 20 -10 0 0 20 10 Z'
          },
          targetMarker: {
            tagName: 'path',
            d: 'M 20 -10 0 0 20 10 Z',
            fill: 'yellow',
            stroke: 'red',
            strokeWidth: 2
          }
        }
      },
      tools: ['source-arrowhead', 'target-arrowhead']
    })
    // 渲染元素
    // this.graph.fromJSON(graphData)
    this.graph.on('cell:click', ({ e, x, y, cell, view }) => {
      console.log('cell:click: ', cell)
    })
    this.graph.on('node:click', ({ e, x, y, node, view }) => {
      console.log('node:click: ', node)
    })
    this.graph.on('edge:click', ({ e, x, y, edge, view }) => {
      console.log('edge:click: ', edge)
    })
    this.graph.on('blank:click', ({ e, x, y }) => {
      console.log('blank:click: ', e)
    })
    // 局中显示
    this.graph.centerContent()
    // 自动缩放以适应内容
    // this.graph.zoomToFit({ maxScale: 1 })
  },
  methods: {
    addNode () {
      this.node = this.graph.addNode({
        shape: 'rect',
        x: 100,
        y: 40,
        width: 100,
        height: 40,
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
      })
    },
    getNodeProp () {
      console.log(this.node.prop())
    },
    setProp () {
      // this.node.prop('label', 'new label')
      this.node.prop('size', { width: 120, height: 50 })
    },
    setAttr () {
      this.node.attr('body/fill', '#000')
    },
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

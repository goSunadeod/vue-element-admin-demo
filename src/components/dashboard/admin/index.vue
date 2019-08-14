<template>
  <div class="dashboard-admin">
    <div class="text-center">dashboard admin（动态组件</div>
    <el-button style="margin-left: 5%" @click="handleAdd">新增</el-button>
    <div class="dashboard-admin-wrapper">
      <ul class="line">
        <li class="item"
            @contextmenu.prevent="openList(item, $event)"
            v-for="(item, index) in list"
            :key="item.id">
          {{item.name}}
          <i class="el-icon-close" @click="handleDelete(index)"></i>
        </li>
      </ul>
      右击上面的模块试试
    </div>
    <div>
      <p>斐波那契求和30：通过axios返回</p>
      <b>{{number}}</b>
    </div>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="closeSelf">Close</li>
      <li @click="closeOthers">Close Others</li>
      <li @click="closeAll">Close All</li>
    </ul>
  </div>
</template>

<script>
import utlMath from '@/utils/math'
import ExampleWorker from '@/utils/example.worker'
export default {
  name: 'dashboard',
  data() {
    return {
      list: [{
        id: +new Date(),
        name: utlMath.nextRndInt(1, 9)
      }],
      selectedTag: {},
      top: 0,
      left: 0,
      visible: false,
      number: '计算中。。'
    }
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    handleAdd() {
      const obj = {
        id: +new Date(),
        name: utlMath.nextRndInt(1, 9)
      }
      this.list.push(obj)
    },
    handleDelete(index) {
      this.list.splice(index, 1)
    },
    openList(tag, e) {
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const left = e.clientX - offsetLeft + 10 // 10: margin right
      this.left = left
      this.top = e.clientY - 22 - 30
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    closeSelf() {
      this.list = this.list.filter(item => item.id !== this.selectedTag.id)
    },
    closeOthers() {
      this.list = [
        {...this.selectedTag}
      ]
    },
    closeAll() {
      this.list = []
    },
    init() {
      this.worker = new ExampleWorker()
      console.log('worker 初始化')

      this.worker.onmessage = (event) => {
        this.number = event.data
        console.log('主线： 监听worker返回数据', event)
      }

      const message = { number: 30 }
      console.log('主线： 传递给worker 40', message)
      this.worker.postMessage(message)
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.worker.terminate()
  }
}
</script>

<style lang="scss" soped>
  .dashboard-admin {
    &-wrapper {
      width: 90%;
      margin: 15px auto 0;
      height: 150px;
      border: 1px solid #bfbfbf;
      box-sizing: border-box;
      .line {
        height: 40px;
        line-height: 40px;
        width: 100%;
        margin: 0;
        padding: 0;
        border-bottom: 1px solid #bfbfbf;
        white-space: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
        cursor: pointer;
        .item {
          position: relative;
          width: 70px;
          border: 1px solid #ff9499;
          box-sizing: border-box;
          line-height: 36px;
          text-align: center;
          display: inline-block;
          margin-right: 10px;
          &:last-of-type {
            margin-right: 0;
          }
        }
        .el-icon-close {
          font-size: 12px;
          position: absolute;
          top: 2px;
          right: 2px;
          cursor: pointer;
        }
      }
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 3000;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>

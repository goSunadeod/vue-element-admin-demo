<template>
    <div class="roomTable">
        <!-- 头部插槽，无任何样式及功能 -->
        <el-row style="padding: 10px 0" v-if="$slots.header">
            <slot name="header"></slot>
        </el-row>
        <div v-if="tableData.length > 0">
            <el-table
                    class="global-room-table"
                    :data="tableData"
                    :header-cell-style="{ background: '#EFEFEF', borderBottom: '1px solid #DDDDDD', borderRight: '1px solid #DDDDDD' }"
            >
                <el-table-column prop="floor" label="实际楼层" align="center" fixed="left" width="70">
                    <template slot-scope="scope">
                        <div>
                            <span>{{scope.row.floor+"F"}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="单元" align="center" fixed="left" width="70">
                    <el-table-column prop="floorName" label="销售楼层" align="center" fixed="left" width="70">
                        <template slot-scope="scope">
                            <div
                            >
                                <template v-if="canEdit">
                                    <el-input v-model="scope.row.floorName" maxlength="8"></el-input>
                                </template>
                                <template v-else>
                                    <span>{{ scope.row.floorName }}</span>
                                </template>
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                        v-for="unit of units"
                        :label="unit.saleName"
                        :key="unit.id"
                        align="center"
                >
                    <template slot="header" slot-scope="scope">
                        <div class="room-header">
                            <span style="display: none">{{scope.row}}</span>
                            <template v-if="canEdit">
                                <el-input
                                        v-model="unit.saleName"
                                        size="mini"
                                        placeholder="输入单元"
                                        style="padding:0"
                                />
                            </template>
                            <template v-else>
                                <span>{{ unit.saleName }}</span>
                            </template>
                        </div>
                    </template>
                    <el-table-column
                            v-for="door of unit.houseRoomUnitDoorDTOS"
                            :label="door.saleName"
                            :key="door.id"
                            align="center"
                            :width="door.colWidth"
                    >
                        <template slot="header">
                            <div class="room-header">
                                <template v-if="canEdit">
                                    <el-input
                                            v-model="door.saleName"
                                            size="mini"
                                            placeholder="输入户数"
                                            style="padding:0"
                                    />
                                </template>
                                <template v-else>
                                    <span>{{ door.saleName }}</span>
                                </template>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <room-cell
                                    :canEdit="canEdit"
                                    :room="scope.row.houseHolds[`${unit.no}-${door.no}`]"
                                    type="room"
                                    v-bind="$attrs"
                            ></room-cell>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
  import RoomCell from './RoomCell'
  export default {
    components: {RoomCell},
    props: {
      // 房间对象
      rooms: {
        type: Object,
        default: () => {}
      },
      // 房间表格是否可以编辑
      canEdit: {
        type: Boolean,
        default: () => false
      }
    },
    data() {
      return {
        tableData: [],
        units: [],

        // 房间详情页面的下拉列表对应数据
        viewList: {
          houseTypeName: '户型',
          productType: '产品类型',
          hardcoverOrBlank: '装修类型',
          priceMethodDesc: '计价方式',
          estimatedBuildingArea: '预测建筑面积',
          estimatedInsideArea: '预测套内面积',
          buildingArea: '实测建筑面积',
          insideArea: '实测套内面积',
          totalPrice: '标准总价',
          unitPrice: '标准单价'
        }
      }
    },
    methods: {
      handleRoomByFunc(func) {
        this.tableData.forEach((row, rowIndex) => {
          const rooms = row.houseHolds
          for (const [key, room] of Object.entries(rooms)) {
            func(room, key, rowIndex)
          }
        })
      },
      // 渲染表格数据
      // 拿到room数据的处理
      dealRoomData(blockData) {
        // 如果没有数据 返回
        if (
          !blockData.houseRoomFloorDTOS || !blockData.houseRoomFloorDTOS.length
          || !blockData.houseRoomUnitDTOS || !blockData.houseRoomUnitDTOS.length
          || !blockData.houseRoomInfoDTOS || !blockData.houseRoomInfoDTOS.length
        ) return
        this.tableData = []
        this.units = blockData.houseRoomUnitDTOS
        // 循环楼层数据
        blockData.houseRoomFloorDTOS.forEach((floor) => {
          // 对每一层楼定义一个数据
          const row = {
            floor: floor.no,
            floorName: floor.saleName,
            houseHolds: {}
          }
          // 遍历房间列表
          blockData.houseRoomInfoDTOS.forEach((room) => {
            // 如果房间的roomFloorId 等于楼层的id 则该房间是该层的
            if (floor.id === room.roomFloorId) {
              // ----------- unit start -----------
              // 找到与该房间匹配的单元数据
              const tableUnit = this.units.find(
                unit => unit.id === room.roomUnitId
              )
              // 找到与该房间匹配的单元door数据
              const tableUnitDoor = tableUnit.houseRoomUnitDoorDTOS.find(door => door.id == room.roomUnitDoorId)
              // ----------- unit end -----------

              const index = `${tableUnit.no}-${tableUnitDoor.no}`
              room.unitName = tableUnit.saleName
              room.doorName = tableUnitDoor.saleName
              room.floorName = floor.saleName
              room.floorNo = floor.no
              room.unitNo = tableUnit.no
              room.unitDoorNo = tableUnitDoor.no
              room.roomFloorNo = floor.no
              room.roomUnitDoorNo = tableUnitDoor.no
              room.roomUnitNo = tableUnit.no
              // houseHolds 的键名是单元-单元door 键值是对应的房间
              row.houseHolds[index] = room
            }
          })
          // 然后将该数据push到tableData中
          this.tableData.push(row)
        })
        this.setRoomIndex()
        // 获取合并的房间列表
        const selectedRooms = blockData.houseRoomInfoDTOS.filter(room => room.combined)
        const fields = []
        // 将合并的房间分组 放入fields数据里
        // TODO: zht 希望后端给出合并房间二维数组
        this.setCombineFlag(selectedRooms, fields)
        this.setCombineStatus(fields)
        this.calculateCellWidth([])
      },
      // 根据合并房间的状态，设置被合并的房间状态。
      setCombineStatus(fields) {
        // 遍历每个合并的房间
        fields.forEach((field) => {
          if (field.length) {
            const combineHouseId = field[0].combineHouseId
            const combineHouse = field.find(item => item.id == combineHouseId)
            // 非空判断
            if (combineHouse) {
              // combineHouseDeleted 用于标记合并后的房间是否被删除，防止背景色渲染错误
              combineHouse.combineHouseDeleted = combineHouse.deleted
              field.forEach((room) => {
                if (room.id != combineHouseId && combineHouse) {
                  room.houseStatus = combineHouse.houseStatus
                  room.combineHouseDeleted = combineHouse.deleted
                }
              })
            }
          }
        })
      },
      // 设置每个房间的colIndex列索引，记录房间在列中的相对位置，用于合并房间时，判断是否左右相邻
      setRoomIndex() {
        if (this.rooms && this.rooms.houseRoomUnitDTOS.length) {
          const colIndexMap = {}
          let count = 1
          // 遍历单元数据
          this.rooms.houseRoomUnitDTOS.forEach((unit) => {
            // 遍历单元中的单元door列表
            unit.houseRoomUnitDoorDTOS.forEach((unitDoor) => {
              const key = `${unit.no}-${unitDoor.no}`
              colIndexMap[key] = count++
            })
          })
          this.handleRoomByFunc((room, key, rowIndex) => {
            room.colIndex = colIndexMap[key]
            room.rowIndex = rowIndex
          })
        }
      },
      // 处理合并房间方法
      setCombineFlag(selectedRooms, fields = [], init = true) {
        const rooms = [
          ...selectedRooms
        ]
        // 将房间进行排序。防止因为点击顺序不一样造成的合并样式设置不成功的问题
        rooms.sort((a, b) => {
          if (a.rowIndex == b.rowIndex) {
            return a.colIndex - b.colIndex
          }
          return a.rowIndex - b.rowIndex
        })
        // BFS扫描所有选中的房间
        while (rooms.length > 0) {
          let room = rooms.shift()
          const field = []
          const queue = [room]
          if (room.added) continue // 如果房间被扫描过了，则跳过该房间
          while (queue.length > 0) {
            room = queue.shift()
            this.findNeighbor(room, rooms, queue, init)
            field.push(room)
          }
          fields.push(field)
        }
        selectedRooms.forEach((room) => {
          room.added = false
        })
      },
      findNeighbor(room, rooms, queue, init = true) {
        // TODO: 重复部分较多，有时间重构一下
        const up = rooms.find(
          other => room.rowIndex - 1 == other.rowIndex
            && room.colIndex == other.colIndex
            && (!init || room.combineHouseId == other.combineHouseId)
        )
        if (up) {
          if (!up.added) {
            queue.push(up)
          }
          up.added = true
        }
        const right = rooms.find(
          other => room.rowIndex == other.rowIndex
            && room.colIndex + 1 == other.colIndex
            && (!init || room.combineHouseId == other.combineHouseId)
        )
        if (right) {
          if (!right.added) {
            queue.push(right)
          }
          if (!room.isSelect && room.combineHouseId == right.combineHouseId) {
            this.$set(room, 'combinedRight', true)
          }
          if (room.isSelect) {
            this.$set(room, 'combinedRight', true)
          }
          right.added = true
        }
        const down = rooms.find(
          other => room.rowIndex + 1 == other.rowIndex
            && room.colIndex == other.colIndex
            && (!init || room.combineHouseId == other.combineHouseId)
        )
        if (down) {
          if (!down.added) {
            queue.push(down)
          }
          if (!room.isSelect && room.combineHouseId == down.combineHouseId) {
            this.$set(room, 'combinedBottom', true)
          }
          if (room.isSelect) {
            this.$set(room, 'combinedBottom', true)
          }
          down.added = true
        }
        const left = rooms.find(
          other => room.rowIndex == other.rowIndex
            && room.colIndex - 1 == other.colIndex
            && (!init || room.combineHouseId == other.combineHouseId)
        )
        if (left) {
          if (!left.added) {
            queue.push(left)
          }
          left.added = true
        }
      },
      sort() {
        this.tableData.reverse()
        this.tableData.forEach((row) => {
          this.changeRowRoomCombinedFlag(row)
        })
      },
      changeRowRoomCombinedFlag(row) {
        const households = row.houseHolds
        for (const room of Object.values(households)) {
          [room.combinedTop, room.combinedBottom] = [room.combinedBottom, room.combinedTop]
        }
      },
      calculateCellWidth(currView) {
        // 遍历单元数据
        this.units.forEach((unit) => {
          const doorList = unit.houseRoomUnitDoorDTOS
          // 遍历每个单元 单元door
          doorList.forEach((door) => {
            const roomIndex = `${unit.no}-${door.no}`
            const minWidth = 120
            let maxLength = minWidth
            if (currView && currView.length) {
              this.tableData.forEach((row) => {
                const room = row.houseHolds[roomIndex]
                if (room) {
                  currView.forEach((viewKey) => {
                    const labelLength = (`${this.viewList[viewKey]}:${room[viewKey] ? room[viewKey] : ''}`.length * 14) + 20
                    maxLength = Math.max(maxLength, labelLength)
                  })
                }
              })
            }
            // 给单元door 数据加入一个colwidth值
            this.$set(door, 'colWidth', maxLength)
          })
        })
        this.checkTableWidthGap()
      },
      checkTableWidthGap() {
        if (this.$attrs.currView && this.$attrs.currView.length) {
          return
        }
        this.$nextTick(() => {
          let tableDom = document.querySelector('.global-room-table')
          if (tableDom) {
            let totalCols = 0
            this.units.forEach((unit) => {
              unit.houseRoomUnitDoorDTOS.forEach(() => {
                totalCols++
              })
            })
            const tableWidth = tableDom.offsetWidth - 2
            const realFloorColWidth = 70
            const saleFloorColWidth = 70
            const totalShowAreaWidth = totalCols * 120 + realFloorColWidth + saleFloorColWidth
            const remainGapWidth = tableWidth - totalShowAreaWidth
            if (remainGapWidth < 120) {
              const newRoomsColsWidth = tableWidth - realFloorColWidth - saleFloorColWidth
              const eachColWidth = newRoomsColsWidth / totalCols
              this.units.forEach((unit) => {
                const doorList = unit.houseRoomUnitDoorDTOS
                doorList.forEach((door) => {
                  const tempWidth = eachColWidth
                  let newWidth
                  if (tempWidth < 120) {
                    newWidth = 120
                  } else {
                    newWidth = tempWidth.toFixed(0)
                  }
                  this.$set(door, 'colWidth', newWidth)
                })
              })
            }
          }
          tableDom = null
        })
      }
    },
    watch: {
      // 监测房间数据变化
      rooms: {
        immediate: true,
        deep: true,
        handler: function roomsWatcher(newV, oldV) {
          if (newV != oldV && typeof this.dealRoomData == 'function') {
            this.units = []
            this.dealRoomData(newV)
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    $border: 1px solid #DDDDDD;
    /deep/ .el-table th.is-hidden > *,
    /deep/ .el-table td.is-hidden > * {
        visibility: unset
    }
    /deep/ .el-table {
        border: none;
        border-left: $border;
        .room-header {
            width: 100%;
            height: 100%;
            min-height: 30px;
            line-height: 30px;
            display: flex;
            justify-content: center;
        }
    }
    /deep/ .el-table::before,
    /deep/ .el-table::after {
        background-color: unset;
    }
    /deep/ .el-table td {
        padding: 0;
    }
    /deep/ .el-table .cell {
        padding: 0;
        color: #222;
    }
    /deep/ .el-table--border td:first-child .cell,
    /deep/ .el-table--border th:first-child .cell {
        padding: 0;
    }
    /deep/ .el-table__body tr.hover-row > td {
        background-color: unset;
    }
    /deep/ .el-table__fixed-right::before,
    /deep/ .el-table__fixed::before {
        background: unset;
        height: 0px;
    }

    /deep/ .el-table tbody tr {
        height: unset;
    }
    /deep/ .color_list {
        text-align: right;
        font-size: 14px;
        height: 20px;
        span {
            display: inline-block;
            font-size: 14px;
            line-height: 20px;
            height: 20px;
            margin-left: 10px;
            i {
                display: inline-block;
                border: 1px solid #999;
                width: 14px;
                padding: 6px 0;
                vertical-align: middle;
                line-height: 20px;
                margin-top: -3px;
            }
        }
    }
</style>

<template>
  <div
   v-if="!room.deleted || room.combined"
  >
    <i v-if="room.combinedTop" class="combine-top combine-line"></i>
    <i v-if="room.combinedRight" class="combine-right combine-line"></i>
    <i v-if="room.combinedBottom" class="combine-bottom combine-line"></i>
    <i v-if="room.combinedLeft" class="combine-left combine-line"></i>
    <div :style="{ visibility: `${!room.deleted ? 'visible' : 'hidden'}`}" class="room-info">
      <i v-if="room.isSelect" class="checked"></i>
      <template v-if="canEdit">
        <el-input v-model="room.saleName"></el-input>
      </template>
      <template v-else>
        <div class="room-info__container">
          <span class="roomName">
            {{ room.saleName }}
          </span>
        </div>
      </template>
    </div>
  </div>
  <div v-else style="min-height: 44px;"></div>
</template>

<script>
export default {
  props: {
    canEdit: {
      type: Boolean,
      default: true
    },
    room: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ i.combine-top,
i.combine-right,
i.combine-bottom,
i.combine-left {
  display: block;
  position: absolute;
  z-index: 1;
  background: #fff;
}
/deep/ i.combine-top {
  left: 0;
  top: -2px;
  height: 2px;
  width: 100%;
}
/deep/ i.combine-right {
  right: -1px;
  top: 0px;
  width: 2px;
  height: 100%;
}
/deep/ i.combine-bottom {
  left: 0;
  bottom: -2px;
  height: 2px;
  width: 100%;
}
/deep/ i.combine-left {
  left: -1px;
  bottom: 0px;
  width: 2px;
  height: 100%;
}
/deep/ i.combine-line {
  background-color: #fff;
}
/deep/ i.checked {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 24px;
  height: 24px;
}
.room-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.room-info__container {
  display: flex;
  flex-direction: column;
  min-height: 44px;
  align-items: center;
  justify-content: center;
}
.roomName {
  display: flex;
  justify-content: center;
}
</style>

<template>
    <div>
        <room  ref="room"
               :canEdit="canEdit"
               :rooms="rooms"></room>
    </div>
</template>

<script>
import Room from './room'
import {getRoom} from '@/api/app-api'
export default {
  components: {Room},
  data() {
    return {
      rooms: {},
      canEdit: false
    }
  },
  methods: {
    init() {
      getRoom().then(res => {
        this.rooms = res.data
      })
    }
  },
  created() {
    this.init()
  }
}
</script>

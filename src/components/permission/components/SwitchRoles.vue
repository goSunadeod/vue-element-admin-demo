<template>
  <div>
    <div style="margin-bottom:15px;">
      Your roles: {{ roles }}
    </div>
    Switch roles:
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'roles'
    ]),
    switchRoles: {
      get() {
        return this.roles[0]
      },
      set(val) {
        this.changeRoles(val).then(() => {
          console.log('切换权限' + val)
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'changeRoles'
    ])
  }
}
</script>

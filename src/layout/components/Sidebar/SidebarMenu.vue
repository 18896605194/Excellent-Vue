<template>
  <el-menu :default-active="activeMenu" :unique-opened="true" router>
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
  <!-- 一级 menu 菜单 -->
</template>
<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'
const router = useRouter()
console.log(router.getRoutes())

const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
console.log(JSON.stringify(JSON.parse(JSON.stringify(routes.value))))
const route = useRoute()
// 计算高亮 menu 的方法
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>

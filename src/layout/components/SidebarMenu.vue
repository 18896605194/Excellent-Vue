<template>
  <!-- 一级 menu 菜单 -->
  <el-menu>
    <sidebar-item
      v-for="item in routes.value"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import { SidebarItem } from './SidebarItem.vue'
const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
console.log(JSON.stringify(routes.value))
</script>

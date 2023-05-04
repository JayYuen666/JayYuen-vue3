<template>
  <el-menu
    default-active="/"
    router
    class="el-menu-vertical-demo"
  >
    <el-menu-item v-for="item in routes" :key="JSON.stringify(item)" :index="item.path">
      <template #title>{{ item.name }}</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import routes from '@/router/modules/base.ts';
</script>

<style scoped>

</style>

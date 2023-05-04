<script setup lang="ts">
import { RouterView } from 'vue-router';
import 'dayjs/locale/zh-cn';
import { JayMenu } from '@/components/index.ts';
</script>

<template>
  <header>
    <img alt="Jay logo" src="@/assets/logo.png" width="80" height="80" />
    <div class="wrapper">
      <JayMenu />
    </div>
  </header>
  <RouterView class="flex-1 pad20" />
</template>

<style lang="less" scoped>
header {
  height: 100vh;
}
</style>

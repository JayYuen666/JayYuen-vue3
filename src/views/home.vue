<template>
  <div>
    <el-input v-model="inputValue" placeholder="Please input" />
    <SButton color="blue" round plain icon="search">搜索按钮</SButton>
    <SButton color="green" round plain icon="edit">编辑按钮</SButton>
    <SButton color="gray" round plain icon="check">成功按钮</SButton>
    <SButton color="yellow" round plain icon="message">提示按钮</SButton>
    <SButton color="red" round plain icon="delete">删除按钮</SButton>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import SButton from '@/components/SButton'
import { roundToFixed } from '@/utils/tools'
const inputValue = ref('')
watch(inputValue, async (newQuestion) => {
  console.log(roundToFixed(newQuestion));
})
</script>

<style lang="scss" scoped></style>

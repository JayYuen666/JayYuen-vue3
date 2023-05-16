<template>
  <div>
    <el-input v-model="inputValue" placeholder="Please input" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { roundToFixed } from '@/utils/tools'
const inputValue = ref('')
watch(inputValue, async (newQuestion) => {
  console.log(roundToFixed(newQuestion));
})
</script>

<style lang="scss" scoped></style>

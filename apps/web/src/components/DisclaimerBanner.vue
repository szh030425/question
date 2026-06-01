<template>
  <div class="disclaimer-box">
    <strong>重要提示</strong>
    <ul>
      <li v-for="(line, i) in lines" :key="i">{{ line }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  lines: string[];
}>();
</script>

<template>
    <div class="subheading">{{ text }}</div>
</template>

<script setup lang="ts">

defineProps({
  text: {
    type: String,
    default: "Section",
  },
});

</script>

<style>
.subheading {
  font-size: 16px;
  font-weight: 600;
  text-align: left;
}
</style>
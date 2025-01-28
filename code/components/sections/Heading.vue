<template>
  <div class="heading">
    {{ title }}
  </div>
</template>

<script setup lang="ts">

defineProps({
  title: {
    type: String,
    default: "Section",
  },
});

</script>

<style>
.heading {
  border-bottom: 2px solid #d1a398;
  font-family: "Source Serif Pro", serif;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 12px;
  margin-top: 12px;
}
</style>
<template>
  <n-card title="Banes" :bordered="false" size="small">
    <n-space vertical size="small">
      <n-input v-for="(bane, index) of character.banes" v-model:value="bane.name" placeholder="Bane" clearable @change="(value: string) => onChange(value, index)">
      </n-input>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { character } from "../../store/store";
import { onMounted, watch } from "vue";

onMounted(() => {
  if (character.banes.length === 0) character.banes.push({ name: "" });
})

const onChange = (value: string, index: number) => {
  if (value === "") character.banes.splice(index, 1);
};

watch(character, () => {
  if (character.banes.length === 0) character.banes.push({ name: "" });
  else if (character.banes[character.banes.length - 1].name.length > 0) character.banes.push({ name: "" });
})


</script>

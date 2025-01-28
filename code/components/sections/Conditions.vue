<template>
  <n-card title="Conditions" :bordered="false" size="small">
    <n-space vertical size="small">
      <n-input v-for="(condition, index) of character.status.conditions" v-model:value="condition.name" placeholder="Condition" clearable @change="(value: string) => onChange(value, index)">
      </n-input>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { character } from "../../store/store";
import { dots } from "../../constants/functions";
import { onMounted, watch } from "vue";

onMounted(() => {
  if (character.status.conditions.length === 0) character.status.conditions.push({ name: "" })
})

const onChange = (value: string, index: number) => {
  if (value === "") character.status.conditions.splice(index, 1);
};

watch(character, () => {
  if (character.status.conditions.length === 0) character.status.conditions.push({ name: "" })
  else if (character.status.conditions[character.status.conditions.length - 1].name.length > 0) character.status.conditions.push({ name: "" });
})


</script>

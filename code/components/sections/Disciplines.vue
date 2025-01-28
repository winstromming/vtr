<template>
  <n-card title="Disciplines" :bordered="false" size="small">
    <n-space vertical :size="0">
        <Dots :color="true" v-for="(discipline, index) of character.disciplines" is-editable placeholder="Discipline" :dots="discipline.dots"
          @update-dots="discipline.dots = $event" :label="discipline.name"
          @update-label="onUpdate($event, index)"></Dots>
    </n-space>
  </n-card> 
</template>

<script setup lang="ts">

import { onMounted, watch } from "vue";
import { character } from "../../store/store";
import Dots from "../common/Dots.vue";


onMounted(() => {
  if (character.disciplines.length === 0) character.disciplines.push({ name: "", dots: 0 })
})

const onUpdate = (value: string, index: number) => {
  character.disciplines[index].name = value;
  if (value === "") character.disciplines.splice(index, 1);
};


watch(character, () => {
  if (character.disciplines.length === 0) character.disciplines.push({ name: "", dots: 0 });
  else if (character.disciplines[character.disciplines.length - 1].name.length > 0) character.disciplines.push({ name: "", dots: 0 });
})

</script>

<style>
</style>
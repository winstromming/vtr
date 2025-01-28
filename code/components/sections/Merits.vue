<template>
  <n-card title="Merits" :bordered="false" size="small">
    <n-space vertical :size="0">
        <Dots :color="true" v-for="(merit, index) of character.merits" is-editable placeholder="Merit" :dots="merit.dots"
          @update-dots="merit.dots = $event" :label="merit.name"
          @update-label="onUpdate($event, index)"></Dots>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">

import { onMounted, watch } from "vue";
import { character } from "../../store/store";
import Dots from "../common/Dots.vue";


onMounted(() => {
  if (character.merits.length === 0) character.merits.push({ name: "", dots: 0 })
})

const onUpdate = (value: string, index: number) => {
  character.merits[index].name = value;
  if (value === "") character.merits.splice(index, 1);
};

watch(character, () => {
  if (character.merits.length === 0) character.merits.push({ name: "", dots: 0 });
  else if (character.merits[character.merits.length - 1].name.length > 0) character.merits.push({ name: "", dots: 0 });
})

</script>

<style>
</style>
<template>
  <n-card title="Rites, Miracles" :bordered="false" size="small">
    <n-space vertical :size="0">
        <Dots :color="true" v-for="(rite, index) of character.rites" is-editable placeholder="Rite or Miracle" :dots="rite.dots"
          @update-dots="rite.dots = $event" :label="rite.name"
          @update-label="onUpdate($event, index)"></Dots>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">

import { onMounted, watch } from "vue";
import { character } from "../../store/store";
import Dots from "../common/Dots.vue";


onMounted(() => {
  if (character.rites.length === 0) character.rites.push({ name: "", dots: 0 })
})

const onUpdate = (value: string, index: number) => {
  character.rites[index].name = value;
  if (value === "") character.rites.splice(index, 1);
};

watch(character, () => {
  if (character.rites.length === 0) character.rites.push({ name: "", dots: 0 });
  else if (character.rites[character.rites.length - 1].name.length > 0) character.rites.push({ name: "", dots: 0 });
})

</script>

<style>
</style>
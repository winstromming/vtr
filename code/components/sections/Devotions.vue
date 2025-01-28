<template>
  <n-card title="Devotions" :bordered="false" size="small">
    <n-space vertical :size="0">
        <Dots :color="true" v-for="(devotion, index) of character.devotions" is-editable placeholder="Devotion" :label="devotion.name"
          @update-label="onUpdate($event, index)"></Dots>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">

import { onMounted, watch } from "vue";
import { character } from "../../store/store";
import Dots from "../common/Dots.vue";


onMounted(() => {
  if (character.devotions.length === 0) character.devotions.push({ name: "" })
})

const onUpdate = (value: string, index: number) => {
  character.devotions[index].name = value;
  if (value === "") character.devotions.splice(index, 1);
};

watch(character, () => {
  if (character.devotions.length === 0) character.devotions.push({ name: "" });
  else if (character.devotions[character.devotions.length - 1].name.length > 0) character.devotions.push({ name: "" });
})

</script>

<style>
</style>
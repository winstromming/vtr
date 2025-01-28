<template>
  <n-card title="Touchstones" :bordered="false" size="small">
    <n-space vertical size="small">
      <n-input v-for="(touchstone, index) of character.traits.Touchstones" v-model:value="touchstone.name" :placeholder="merit(index)">
        <template #suffix>
          <n-text v-html="humanity(character.details.clan, index)"></n-text>
        </template>
      </n-input>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { character } from "../../store/store";
import { dots, humanity } from "../../constants/functions";
import { onMounted, watch } from "vue";

const merit = (num: number) => {
  return `Touchstone ${dots(num)}`;
}

onMounted(() => {
  if (character.traits.Touchstones.length === 0) character.traits.Touchstones.push({ name: "" })
})

watch(character, () => {
  if (character.traits.Touchstones.length === 0) character.traits.Touchstones.push({ name: "" });
  else if (character.traits.Touchstones.length === 1) {
    const lastOne = character.traits.Touchstones[character.traits.Touchstones.length - 1];
    if (lastOne.name.length > 0) character.traits.Touchstones.push({ name: "" });
  }
  else if (character.traits.Touchstones.length > 1) {
    const lastOne = character.traits.Touchstones[character.traits.Touchstones.length - 1];
    const lastTwo = character.traits.Touchstones[character.traits.Touchstones.length - 2];
    if (lastOne.name.length === 0 && lastTwo.name.length === 0) character.traits.Touchstones.splice(character.traits.Touchstones.length - 1, 1);
    if (lastOne.name.length > 0) character.traits.Touchstones.push({ name: "" });
  }
})


</script>

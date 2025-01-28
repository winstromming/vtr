<template>
  <n-card title="Traits" :bordered="false" size="small">
    <n-grid y-gap="6" x-gap="6" cols="2">
      <n-gi>
        <n-input-number v-model:value="character.traits.Size.modifier" :placeholder="character.traits.Size.base.toString()"
          :show-button="false">
          <template #prefix>
            <n-text strong>Size</n-text>
          </template>
        </n-input-number>
      </n-gi>
      <n-gi>
        <n-input-number v-model:value="character.traits.Defense.modifier"
          :placeholder="character.traits.Defense.base.toString()" :show-button="false">
          <template #prefix>
            <n-text strong>Defense</n-text>
          </template>
        </n-input-number>
      </n-gi>
      <n-gi>
        <n-input-number v-model:value="character.traits.Speed.modifier" :placeholder="character.traits.Speed.base.toString()"
          :show-button="false">
          <template #prefix>
            <n-text strong>Speed</n-text>
          </template>
        </n-input-number>
      </n-gi>
      <n-gi>
        <n-input-number v-model:value="character.traits.Initiative.modifier"
          :placeholder="character.traits.Initiative.base.toString()" :show-button="false">
          <template #prefix>
            <n-text strong>Initiative</n-text>
          </template>
        </n-input-number>
      </n-gi>
      <n-gi>
        <n-input-number v-model:value="character.traits.BloodPotency" placeholder="0"  :show-button="false">
          <template #prefix>
            <n-text strong>Potency</n-text>
          </template>
        </n-input-number>
      </n-gi>
      <n-gi>
        <n-input-number v-model:value="character.traits.Humanity" placeholder="0"  :show-button="false">
          <template #prefix>
            <n-text strong>Humanity</n-text>
          </template>
        </n-input-number>
      </n-gi>
    </n-grid>
  </n-card>
</template>

<script setup lang="ts">

import { character } from "../../store/store";
import { computed, watch } from "vue";

const size = computed(() => {
  let size = character.traits.Size.base ?? 0
  if (character.traits.Size.modifier && character.traits.Size.modifier > 0) size = character.traits.Size.modifier
  return size
})

const vigor = computed(() => {
  return character.disciplines.find(discipline => discipline.name.toLowerCase() === "vigor" || discipline.name.toLowerCase() === "vigour")?.dots ?? 0
})

watch(character, () => {
  character.traits.Speed.base = size.value + character.attributes.physical.Strength.dots + character.attributes.physical.Dexterity.dots + vigor.value;
});
watch(character, () => {
  character.traits.Defense.base = Math.min(character.attributes.physical.Dexterity.dots, character.attributes.mental.Wits.dots) + character.skills.physical.Athletics.dots
});
watch(character, () => {
  character.traits.Initiative.base = character.attributes.physical.Dexterity.dots + character.attributes.social.Composure.dots;
});

</script>

<style scoped></style>
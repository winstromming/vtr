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


const asWillpower = (num: number | null) => {
  return `${num ?? 0}/${maxWillpower.value}`
}
const asVitae = (num: number | null) => {
  return `${num ?? 0}/${maxVitae.value}`
}
const parse = (input: string) => {
  const nums = input.split("/")[0].replace(/[^0-9]+/g, '').trim()
  return nums === '' ? null : Number(nums)
}

const maxWillpower = computed(() => {
  return character.attributes.mental.Resolve.dots + character.attributes.social.Composure.dots;
});
const maxVitae = computed(() => {
  switch (character.traits.BloodPotency) {
    case 1:
      return 10;
    case 2:
      return 11;
    case 3:
      return 12;
    case 4:
      return 13;
    case 5:
      return 15;
    case 6:
      return 20;
    case 7:
      return 25;
    case 8:
      return 30;
    case 9:
      return 50;
    case 10:
      return 75;
    default:
      return 10;
  }
})

watch(character, () => {
  character.traits.Speed.base = character.attributes.physical.Strength.dots + character.attributes.physical.Dexterity.dots;
});
watch(character, () => {
  character.traits.Speed.base = character.attributes.physical.Strength.dots + character.attributes.physical.Dexterity.dots;
});
watch(character, () => {
  character.traits.Defense.base = Math.min(character.attributes.physical.Dexterity.dots, character.attributes.mental.Wits.dots) + character.skills.physical.Athletics.dots
});
watch(character, () => {
  character.traits.Initiative.base = character.attributes.physical.Dexterity.dots + character.attributes.social.Composure.dots;
});

</script>

<style scoped></style>
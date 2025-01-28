<template>
  <n-card title="Advancement" :bordered="false" size="small">
    <n-space vertical size="small">
      <n-input-number v-model:value="character.progress.Beats" placeholder="0" :format="formatBeats" :parse="parse" min="0" max="5">
      </n-input-number>
      <n-input-number v-model:value="character.progress.Experience" placeholder="0" :format="formatExperience" :parse="parse" min="0" max="10">
      </n-input-number>
      <n-input type="textarea" :autosize="{ minRows: 1 }" placeholder="1. Long Aspiration" v-model:value="character.traits.Aspirations.One" />
      <n-input type="textarea" :autosize="{ minRows: 1 }" placeholder="2. Short Aspiration" v-model:value="character.traits.Aspirations.Two" />
      <n-input type="textarea" :autosize="{ minRows: 1 }" placeholder="3. Group Aspiration" v-model:value="character.traits.Aspirations.Three" />
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { character } from "../../store/store";
import { computed, onMounted, watch } from "vue";
import { Clipboard } from "lucide-vue-next"

const formatBeats = (num: number | null) => {
  return `${num ?? 0} Beats`
}
const formatExperience = (num: number | null) => {
  return `${num ?? 0} Experience`
}
const parse = (input: string) => {
  const nums = input.replace(/[^0-9]+/g, '').trim()
  return nums === '' ? null : Number(nums)
}

watch(() => character.progress.Beats, () => {
  if (character.progress.Beats === 5) {
    character.progress.Beats -= 5
    character.progress.Experience += 1
  }
}, { immediate: true })

</script>
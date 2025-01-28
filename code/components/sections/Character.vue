<template>
  <n-card :bordered="false" size="small">
    <n-grid y-gap="12" x-gap="24" cols="1 600:3">
      <n-gi>
        <n-space vertical size="small">
          <n-input placeholder="Character" v-model:value="character.details.name" />
          <n-input placeholder="Concept" v-model:value="character.details.concept" />
        </n-space>
      </n-gi>
      <n-gi>
        <n-space vertical size="small">
          <n-input placeholder="Mask" v-model:value="character.details.mask" />
          <n-input placeholder="Dirge" v-model:value="character.details.dirge" />
        </n-space>
      </n-gi>
      <n-gi>
        <n-space vertical size="small">
          <n-input placeholder="Clan" v-model:value="character.details.clan" />
          <n-input placeholder="Covenant" v-model:value="character.details.covenant" />
        </n-space>
      </n-gi>
    </n-grid>
  </n-card>
</template>

<script setup lang="ts">

import { character } from "../../store/store";

</script>

<style>
</style>
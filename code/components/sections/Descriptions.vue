<template>
  <n-card title="Description" :bordered="false" size="small">
    <n-grid y-gap="12" x-gap="24" cols="1 600:3">
      <n-gi>
        <n-input type="textarea" :autosize="{ minRows: 4 }" placeholder="Nationality&#10;Date of Birth&#10;Appearance" v-model:value="character.extras.appearance" />
      </n-gi>
      <n-gi>
        <n-input type="textarea" :autosize="{ minRows: 4 }" placeholder="Backstory&#10;Personality&#10;Ambitions" v-model:value="character.extras.backstory" />
      </n-gi>
      <n-gi>
        <n-input type="textarea" :autosize="{ minRows: 4 }" placeholder="Notes" v-model:value="character.extras.notes" />
      </n-gi>
    </n-grid>
  </n-card>
</template>

<script setup lang="ts">
import { character } from "../../store/store";
import Dots from "../common/Dots.vue";

</script>
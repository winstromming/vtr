<template>
 <n-button secondary strong type="error" @click="onClear" title="Clear Data">
  <template #icon>
    <n-icon>
      <Trash2 />
    </n-icon>
    </template>
  </n-button>
</template>

<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";
import { character, defaultCharacter } from "../../store/store";
import { assign, cloneDeep } from "lodash";

const onClear = async () => {
  assign(character, cloneDeep(defaultCharacter))
}
</script>
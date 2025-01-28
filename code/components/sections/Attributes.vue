<template>
  <n-card title="Attributes" :bordered="false" size="small">
    <n-grid y-gap="12" x-gap="24" cols="1 600:3">
      <n-gi>
        <Dots v-for="(attribute, name) in character.attributes.mental" :name="name" :dots="attribute.dots"
          @update-dots="attribute.dots = $event"></Dots>
      </n-gi>
      <n-gi>
        <Dots v-for="(attribute, name) in character.attributes.physical" :name="name" :dots="attribute.dots"
          @update-dots="attribute.dots = $event"></Dots>
      </n-gi>
      <n-gi>
        <Dots v-for="(attribute, name) in character.attributes.social" :name="name" :dots="attribute.dots"
          @update-dots="attribute.dots = $event"></Dots>
      </n-gi>
    </n-grid>
  </n-card>
</template>

<script setup lang="ts">

import { character } from "../../store/store";
import Dots from "../common/Dots.vue";

</script>

<style scoped></style>
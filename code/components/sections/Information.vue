<template>
  <n-card title="Information" :bordered="false" size="small">
    <n-grid y-gap="12" x-gap="24" cols="1 600:3">
      <n-gi>
        <n-input type="textarea" :autosize="{ minRows: 4 }" placeholder="Retainers&#10;Contacts&#10;Mentors&#10;Allies" v-model:value="character.extras.people" />
      </n-gi>
      <n-gi>
        <n-input type="textarea" :autosize="{ minRows: 4 }" placeholder="Havens&#10;Locations&#10;Safe Places&#10;Organisations" v-model:value="character.extras.places" />
      </n-gi>
      <n-gi>
        <n-input type="textarea" :autosize="{ minRows: 4 }" placeholder="Assets&#10;Armour&#10;Weapons&#10;Equipment" v-model:value="character.extras.things" />
      </n-gi>
    </n-grid>
  </n-card>
</template>

<script setup lang="ts">
import { character } from "../../store/store";
import Dots from "../common/Dots.vue";

</script>
<template>
  <n-card title="Skills" :bordered="false" size="small">
    <n-grid y-gap="12" x-gap="24" cols="1 600:3">
      <n-gi>
        <Dots v-for="(skill, name) in character.skills.mental" is-editable :name="name"
          :dots="skill.dots" @update-dots="skill.dots = $event" :label="skill.label"
          @update-label="skill.label = $event">
        </Dots>
      </n-gi>
      <n-gi>
        <Dots v-for="(skill, name) in character.skills.physical" is-editable :name="name"
          :dots="skill.dots" @update-dots="skill.dots = $event" :label="skill.label"
          @update-label="skill.label = $event">
        </Dots>
      </n-gi>
      <n-gi>
        <Dots v-for="(skill, name) in character.skills.social" is-editable :name="name"
          :dots="skill.dots" @update-dots="skill.dots = $event" :label="skill.label"
          @update-label="skill.label = $event">
        </Dots>
      </n-gi>
    </n-grid>
  </n-card>
</template>

<script setup lang="ts">
import { character } from "../../store/store";
import Dots from "../common/Dots.vue";

</script>

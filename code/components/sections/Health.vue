<template>
  <n-card title="Health" :bordered="false" size="small">
    <template #header-extra>
        <n-popover trigger="click" placement="top">
          <template #trigger>
            <n-button text strong type="error" title="Damage">
                Take Damage
            </n-button>
          </template>
          <n-button-group vertical>
            <n-button quaternary title="Aggravated" type="error" @click="sufferAggravated">
              Aggravated
            </n-button>
            <n-button quaternary title="Lethal" type="error" @click="sufferLethal">
              Lethal
            </n-button>
            <n-button quaternary title="Bashing" type="error" @click="sufferBashing">
              Bashing
            </n-button>
          </n-button-group>
        </n-popover>
    </template>
    <n-space vertical size="small">
      <n-space :size="5" style="margin-bottom: 3px">
        <n-tooltip trigger="hover" v-for="(amount, index) of character.health.aggravated"
          :disabled="character.health.lethal > 0 || index + 1 !== character.health.aggravated">
          <template #trigger>
            <n-button :disabled="character.health.lethal > 0 || index + 1 !== character.health.aggravated" text
              @click="healDamage">
              <n-icon size="20"><SquareAsterisk stroke-width="1.5" /></n-icon>
            </n-button>
          </template>
          Heal (1 week)
        </n-tooltip>
        <n-tooltip trigger="hover" v-for="(amount, index) of character.health.lethal"
          :disabled="character.health.bashing > 0 || index + 1 !== character.health.lethal">
          <template #trigger>
            <n-button :disabled="character.health.bashing > 0 || index + 1 !== character.health.lethal" text
              @click="healDamage">
              <n-icon size="20"><SquareX stroke-width="1.5" /></n-icon>
            </n-button>
          </template>
          Heal (2 days)
        </n-tooltip>
        <n-tooltip trigger="hover" v-for="(amount, index) of character.health.bashing"
          :disabled="index + 1 !== character.health.bashing">
          <template #trigger>
            <n-button :disabled="index + 1 !== character.health.bashing" text @click="healDamage">
              <n-icon size="20"><SquareSlash stroke-width="1.5" /></n-icon>
            </n-button>
          </template>
          Heal (15 mins)
        </n-tooltip>
        <n-button v-for="amount in remaining" disabled text>
          <n-icon size="20"><Square stroke-width="1.5" /></n-icon>
        </n-button>
      </n-space>
      <n-alert type="warning" v-if="summary">
        <n-text v-html="summary" />
      </n-alert>
      <n-input-number v-model:value="character.traits.Willpower" placeholder="0" min="0" :max="maxWillpower"
        :format="asWillpower" :parse="parse">
        <template #prefix>
          <n-text strong>Willpower</n-text>
        </template>
      </n-input-number>
      <n-input-number v-model:value="character.traits.Vitae" placeholder="0" min="0" :max="maxVitae"
        :format="asVitae" :parse="parse">
        <template #prefix>
          <n-text strong>Vitae</n-text>
        </template>
      </n-input-number>
    </n-space>
    </n-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { character } from "../../store/store";
import { ShieldPlus, SquareAsterisk, SquareSlash, SquareX, Square, Shield, Circle, Plus, Minus, Asterisk, X, Slash } from "lucide-vue-next"

const size = computed(() => {
  let size = character.traits.Size.base ?? 0
  if (character.traits.Size.modifier && character.traits.Size.modifier > 0) size = character.traits.Size.modifier
  return size
})

const resilience = computed(() => {
  return character.disciplines.find(discipline => discipline.name.toLowerCase() === "resilience")?.dots ?? 0
})
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
  character.health.maximum.base = size.value + character.attributes.physical.Stamina.dots + resilience.value
});

onMounted(() => {
  character.health.maximum.base = size.value + character.attributes.physical.Stamina.dots + resilience.value
})


const remaining = computed(() => {
  let num = character.health.maximum.base - character.health.bashing - character.health.lethal - character.health.aggravated
  return num < 0 ? 0 : num
})

const healText = computed(() => {
  if (character.health.bashing > 0) {
    return "Heal (15 mins)";
  } else if (character.health.lethal > 0) {
    return "Heal (2 days)";
  } else if (character.health.aggravated > 0) {
    return "Heal (1 week)";
  }
})

const healDamage = () => {
  if (character.health.bashing > 0) {
    character.health.bashing -= 1;
  } else if (character.health.lethal > 0) {
    character.health.lethal -= 1;
  } else if (character.health.aggravated > 0) {
    character.health.aggravated -= 1;
  }
}

const sufferBashing = () => {
  if (remaining.value === 0) {
    if (character.health.bashing > 0) {
      character.health.bashing -= 1;
      character.health.lethal += 1;
    } else if (character.health.lethal > 0) {
      character.health.lethal -= 1;
      character.health.aggravated += 1;
    }
  } else {
    character.health.bashing += 1;
  }
}
const sufferLethal = () => {
  if (remaining.value === 0) {
    if (character.health.bashing > 0) {
      character.health.bashing -= 1;
      character.health.lethal += 1;
    } else if (character.health.lethal > 0) {
      character.health.lethal -= 1;
      character.health.aggravated += 1;
    }
  } else {
    character.health.lethal += 1;
  }
}
const sufferAggravated = () => {
  if (remaining.value === 0) {
    if (character.health.bashing > 0) {
      character.health.bashing -= 1;
      character.health.aggravated += 1;
    } else if (character.health.lethal > 0) {
      character.health.lethal -= 1;
      character.health.aggravated += 1;
    }
  } else {
    character.health.aggravated += 1;
  }
}

const summary = computed(() => {
  let remaining = character.health.maximum.base - character.health.bashing - character.health.lethal - character.health.aggravated;
  if (character.health.aggravated >= character.health.maximum.base) return "You are dead.";
  if (remaining > 2) return null
  let string = [];
  if (remaining === 0 && character.health.bashing === 0 && character.health.lethal > 0) string.push("You receive one point damage each turn and");
  if (remaining === 0 && character.health.bashing > 0) string.push("You must make roll to stay conscious each turn and");
  if (remaining === 0) string.push("suffer -3 penalty on every action.");
  if (remaining === 1) string.push("You suffer -2 penalty on every action.");
  if (remaining === 2) string.push("You suffer -1 penalty on every action.");
  if (string.length === 0) return null;
  return string.join(" ");
})

</script>

<style scoped>
.health {
  display: flex;
  min-width: 100%;
  background-color: var(--n-color);
}

.health>div {
  flex: 1
}

.health .n-button {
  flex-grow: 1;
  flex-shrink: 1;
  display: inline-flex;
  padding-left: 3px;
  padding-right: 3px;
  border-color: var(--n-border) !important;
}

.health .n-button--disabled {
  opacity: 1;
  cursor: default;
}

.health .n-button--disabled .n-icon {
  opacity: 0.25;
}
.healthgrid > div {
  justify-self: center;
  /* align-items: center;
  justify-content: center;
  display: flex; */
}
</style>
<!-- 
<template>
    <n-space vertical>
      <n-button-group class="health">
        <n-popover trigger="click" placement="top">
          <template #trigger>
            <n-button type="error" size="small" title="Suffer damage">
              <template #icon>
                <n-icon :component="ShieldPlus" />
              </template>
            </n-button>
          </template>
          <n-button title="Aggravated" quaternary type="error" size="small" @click="sufferAggravated">
            <template #icon>
              <n-icon :component="SquareAsterisk" />
            </template>
          </n-button>
          <n-button title="Lethal" quaternary type="error" size="small" @click="sufferLethal">
            <template #icon>
              <n-icon :component="SquareX" />
            </template>
          </n-button>
          <n-button title="Bashing" quaternary type="error" size="small" @click="sufferBashing">
            <template #icon>
              <n-icon :component="SquareSlash" />
            </template>
          </n-button>
        </n-popover>
        <n-tooltip trigger="hover" v-for="(amount, index) of character.health.aggravated"
          :disabled="character.health.lethal > 0 || index + 1 !== character.health.aggravated">
          <template #trigger>
            <n-button :disabled="character.health.lethal > 0 || index + 1 !== character.health.aggravated" size="small"
              @click="healDamage">
              <template #icon>
                <n-icon :component="SquareAsterisk" />
              </template>
            </n-button>
          </template>
          Heal (1 week)
        </n-tooltip>
        <n-tooltip trigger="hover" v-for="(amount, index) of character.health.lethal"
          :disabled="character.health.bashing > 0 || index + 1 !== character.health.lethal">
          <template #trigger>
            <n-button :disabled="character.health.bashing > 0 || index + 1 !== character.health.lethal" size="small"
              @click="healDamage">
              <template #icon>
                <n-icon :component="SquareX" />
              </template>
            </n-button>
          </template>
          Heal (2 days)
        </n-tooltip>
        <n-tooltip trigger="hover" v-for="(amount, index) of character.health.bashing"
          :disabled="index + 1 !== character.health.bashing">
          <template #trigger>
            <n-button :disabled="index + 1 !== character.health.bashing" size="small" @click="healDamage">
              <template #icon>
                <n-icon :component="SquareSlash" />
              </template>
            </n-button>
          </template>
          Heal (15 mins)
        </n-tooltip>
        <n-button v-for="amount in remaining" disabled size="small">
          <template #icon>
            <n-icon :component="Square" />
          </template>
        </n-button>
      </n-button-group>
      <n-alert type="warning" v-if="summary">
        <n-text v-html="summary" />
      </n-alert>
    </n-space>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { character } from "../store/store";
import { ShieldPlus, SquareAsterisk, SquareSlash, SquareX, Square } from "lucide-vue-next"

const size = computed(() => {
  let size = character.traits.Size.base ?? 0
  if (character.traits.Size.modifier && character.traits.Size.modifier > 0) size = character.traits.Size.modifier
  return size
})

watch(character, () => {
  character.health.maximum.base = size.value + character.attributes.physical.Stamina.dots + character.disciplines.Resilience.dots
});

onMounted(() => {
  character.health.maximum.base = size.value + character.attributes.physical.Stamina.dots + character.disciplines.Resilience.dots
})


const remaining = computed(() => {
  let num = character.health.maximum.base - character.health.bashing - character.health.lethal - character.health.aggravated
  return num < 0 ? 0 : num
})

const healDamage = () => {
  if (character.health.bashing > 0) {
    character.health.bashing -= 1;
  } else if (character.health.lethal > 0) {
    character.health.lethal -= 1;
  } else if (character.health.aggravated > 0) {
    character.health.aggravated -= 1;
  }
}

const sufferBashing = () => {
  if (remaining.value === 0) {
    if (character.health.bashing > 0) {
      character.health.bashing -= 1;
      character.health.lethal += 1;
    } else if (character.health.lethal > 0) {
      character.health.lethal -= 1;
      character.health.aggravated += 1;
    }
  } else {
    character.health.bashing += 1;
  }
}
const sufferLethal = () => {
  if (remaining.value === 0) {
    if (character.health.bashing > 0) {
      character.health.bashing -= 1;
      character.health.lethal += 1;
    } else if (character.health.lethal > 0) {
      character.health.lethal -= 1;
      character.health.aggravated += 1;
    }
  } else {
    character.health.lethal += 1;
  }
}
const sufferAggravated = () => {
  if (remaining.value === 0) {
    if (character.health.bashing > 0) {
      character.health.bashing -= 1;
      character.health.aggravated += 1;
    } else if (character.health.lethal > 0) {
      character.health.lethal -= 1;
      character.health.aggravated += 1;
    }
  } else {
    character.health.aggravated += 1;
  }
}

const summary = computed(() => {
  let remaining = character.attributes.physical.Stamina.dots + size.value - character.health.bashing - character.health.lethal - character.health.aggravated;
  if (character.health.aggravated >= character.health.maximum.base) return "You are dead.";
  if (remaining > 2) return null
  let string = [];
  if (remaining === 0 && character.health.bashing === 0 && character.health.lethal > 0) string.push("You receive one point damage each turn and");
  if (remaining === 0 && character.health.bashing > 0) string.push("You must make roll to stay conscious each turn and");
  if (remaining === 0) string.push("suffer -3 penalty on every action.");
  if (remaining === 1) string.push("You suffer -2 penalty on every action.");
  if (remaining === 2) string.push("You suffer -1 penalty on every action.");
  if (string.length === 0) return null;
  return string.join(" ");
})

</script>

<style scoped>
.health {
  display: flex;
  min-width: 100%;
  background-color: var(--n-color);
}

.health>div {
  flex: 1
}

.health .n-button {
  flex-grow: 1;
  flex-shrink: 1;
  display: inline-flex;
  padding-left: 3px;
  padding-right: 3px;
  border-color: var(--n-border) !important;
}

.health .n-button--disabled {
  opacity: 1;
  cursor: default;
}

.health .n-button--disabled .n-icon {
  opacity: 0.25;
}
</style> -->
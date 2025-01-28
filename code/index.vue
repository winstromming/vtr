<template>
  <n-message-provider>
    <n-dialog-provider>
      <n-config-provider :theme-overrides="overrides">
        <n-layout position="absolute" embedded>
          <n-layout-content position="absolute" embedded>
            <n-space justify="space-between" style="margin: 24px auto 0; padding: 0; max-width: 800px;">
              <n-space>
                <LoadButton />
                <SaveButton />
              </n-space>
              <ClearButton />
            </n-space>
            <div class="sheet">
              <n-space vertical size="large">
                <Character />
                <Attributes />
                <Skills />
                <n-grid y-gap="12" x-gap="24" cols="1 700:3">
                  <n-gi>
                    <Health />
                    <Traits />
                    <Banes />
                    <Touchstones />
                  </n-gi>
                  <n-gi>
                    <Disciplines />
                    <Merits />
                    <Rites />
                    <Devotions />
                  </n-gi>
                  <n-gi>
                    <Advancement />
                    <Conditions />
                  </n-gi>
                </n-grid>
              </n-space>
            </div>
            <div class="sheet">
              <Information />
              <Descriptions />
            </div>
          </n-layout-content>
        </n-layout>
      </n-config-provider>
    </n-dialog-provider>
  </n-message-provider>
</template>

<script setup lang="ts">
import { jsPDF } from "jspdf";
import PDFParser from "pdf2json";
import extractTextFromPDF from "pdf-parser-client-side";

const parser = new PDFParser();

import { watch, toRaw, onBeforeMount } from "vue";
import { assign, cloneDeep } from "lodash";

import { character } from "./store/store";

import type { GlobalThemeOverrides, UploadCustomRequestOptions, } from "naive-ui";
import Attributes from "./components/sections/Attributes.vue";
import Character from "./components/sections/Character.vue";
import Skills from "./components/sections/Skills.vue";
import Banes from "./components/sections/Banes.vue";
import Health from "./components/sections/Health.vue";
import Traits from "./components/sections/Traits.vue";
import Disciplines from "./components/sections/Disciplines.vue";
import Merits from "./components/sections/Merits.vue";
import Touchstones from "./components/sections/Touchstones.vue";
import Conditions from "./components/sections/Conditions.vue";
import Advancement from "./components/sections/Advancement.vue";
import Rites from "./components/sections/Rites.vue";
import Devotions from "./components/sections/Devotions.vue";
import Information from "./components/sections/Information.vue";
import Descriptions from "./components/sections/Descriptions.vue";
import SaveButton from "./components/menu/SaveButton.vue";
import LoadButton from "./components/menu/LoadButton.vue";
import ClearButton from "./components/menu/ClearButton.vue";

const overrides: GlobalThemeOverrides = { 
  common: {
    fontWeightStrong: "600",
    primaryColor: "#d1a398",
    primaryColorHover: "#d1a398",
  },
  Input: {
    border: "1px solid #ccc",
  }
}
const d = (n: number, t: number) => Array.from({ length: n }, () => "●").concat(Array.from({ length: t - n }, () => "○")).join("")
  
const save = () => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  doc.text("Name: " + character.details.name + " is \n my name", 105, 10, { align: "center" });
  doc.text("Virtue: " + character.details.mask, 105, 20, { align: "center" });
  doc.text("Vice: " + character.details.dirge, 105, 30, { align: "center" });
  doc.text("Concept: " + character.details.concept, 105, 40, { align: "center" });

// doc.html(document.body, {
//    callback: function (doc) {
//      doc.save();
//    },
//    x: 0,
//   y: 0,
//   width: 400,
//    windowWidth: 800,
// });
  doc.save(`${character.details.name || "character"}.pdf`);
}

parser.on("pdfParser_dataError", (errorData) => {
  console.log('pdfdata', errorData)
  console.error(errorData.parserError)
});
parser.on("pdfParser_dataReady", (pdfData) => {
  console.log('pdfdata', pdfData)
  console.log(parser.getRawTextContent())
});

const imports = async ({
  file,
  data,
  onProgress,
  onFinish,
  onError,
}: UploadCustomRequestOptions) => {
  extractTextFromPDF(file.file as File, "clean").then((text) => {
    console.log(text)
  })
}


onBeforeMount(() => {
  const hasCharacter = JSON.parse(localStorage.getItem("vtr") ?? "null")
  if (hasCharacter) assign(character, hasCharacter)
})

watch(character, () => {
  const raw = cloneDeep(toRaw(character))
  localStorage.setItem("vtr", JSON.stringify(raw));
})

</script>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
  overflow: hidden;
  background-color: #f7f3ee;
  /* background-color: var(--n-color-bg-base); */
}

.bg {
  background-color: rgb(223, 223, 182);
  /* background-color: var(--n-color-bg-base); */
}

.n-layout { background-color: transparent; padding: 0 12px; }
.sheet {
  max-width: 800px;
  margin: 24px auto;
  padding: 12px 24px;
  border: 3px double #d1a398;
}
.n-card { background-color: transparent }
.n-card.n-card--embedded { background-color: #f1eee9; }
.n-card.n-card--bordered {
  border-color: #d1a398;
  border-width: 3px;
  border-style: double;
}
.n-card .n-card-header {
  border-bottom: 2px solid #d1a398;
  padding-left: 0;
  padding-right: 0;
  margin-bottom: var(--n-padding-bottom);
}
.n-card > .n-card__content {
  padding-left: 0;
  padding-right: 0;
}
.n-card .n-card-header__main {
  font-family: "Source Serif Pro", serif;
  font-size: 16px;
  line-height: 18px;
  font-weight: 700;
  text-transform: uppercase;
  /* color: #9d4e3a !important; */
}

</style>

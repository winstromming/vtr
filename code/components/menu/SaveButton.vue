<template>
  <n-button secondary strong type="success" @click="onExport" title="Export">
    <template #icon>
      <n-icon>
        <Download />
      </n-icon>
    </template>
  </n-button>
</template>

<script setup lang="ts">

import "pdfmake/build/pdfmake"
const pdfMake = window["pdfMake"];
import { character } from "../../store/store";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { Download } from "lucide-vue-next";
import { cloneDeep } from "lodash";
import { toRaw } from "vue";
import { vitaeMax } from "../../constants/types";
import { humanity } from "../../constants/functions";

import { Shield } from "lucide-vue-next"

const dot = (n: number, t: number) => Array.from({ length: n }, () => "●").concat(Array.from({ length: t - n }, () => "○")).join("")

const onExport = () => {

  const w = 600;
  const h = 850;
  const m = 10;
  const p = m * 2;

  const beige = "#f7f3ee";
  const red = "#d1a398";
  const brown = "#c7664e";

  const svgAggr = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-asterisk"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="m8.5 14 7-4"/><path d="m8.5 10 7 4"/></svg>';
  const svgLeth = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-x"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>';
  const svgBash = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-slash"><rect width="18" height="18" x="3" y="3" rx="2"/><line x1="9" x2="15" y1="15" y2="9"/></svg>';
  const svgNone = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>';

  const healthRemaining = character.health.maximum.base - character.health.bashing - character.health.lethal - character.health.aggravated
  
  const json = cloneDeep(toRaw(character))

  const def: TDocumentDefinitions = {
    defaultStyle: { fontSize: 11, lineHeight: 1 },
    pageSize: { width: w, height: h },
    pageMargins: m * 3,
    background: [
      {
        canvas: [
          { type: 'rect', x: 0, y: 0, w: w, h: h, color: beige },
          { type: 'rect', x: m, y: m, w: w - p, h: h - p, color: red },
          { type: 'rect', x: m + 1, y: m + 1, w: w - p - 2, h: h - p - 2, color: beige },
          { type: 'rect', x: m + 2, y: m + 2, w: w - p - 4, h: h - p - 4, color: red },
          { type: 'rect', x: m + 3, y: m + 3, w: w - p - 6, h: h - p - 6, color: beige },
        ]
      },
    ],
    content: [
      {
        columns: [
          {
            width: "50%", stack: [
              { text: `${character.details.name || "Name"}`, bold: true },
              { fontSize: 3, text: ' ' },
              { text: `${ character.details.concept || "Concept" }` },
              { text: `${character.details.mask || "Mask"}, ${character.details.dirge || "Dirge"}` },
              { text: `${character.details.clan || "Clan"}, ${ character.details.covenant || "No Covenant" }` },
              { text: ' ' },
              Object.entries(character.attributes).map(([key, value]) => {
                return Object.entries(value).map(([key, value]) => {
                  return {
                    columns: [
                      { text: key, alignment: "left" },
                      { width: "*", text: dot(value.dots, 5), fontSize: 17, margin: [0, -4, 0, 0], alignment: "right" },
                    ]
                  }
                })
              }),
              { text: ' ' },
              Object.entries(character.skills).map(([key, value]) => {
                return Object.entries(value).map(([key, value]) => {
                  return {
                    columns: [
                      { text: `${key}${value.label !== "" ? " (" + value.label + ")" : ""}`, alignment: "left" },
                      { width: "*", text: dot(value.dots, 5), fontSize: 17, margin: [0, -4, 0, 0], alignment: "right" },
                    ],
                    columnGap: 0,
                  }
                })
              }),
              { text: ' ' },
              character.disciplines.filter((i) => i.name.length).map((item) => ({
                columns: [
                  { color: brown, text: item.name, alignment: "left" },
                  { width: "*", color: brown, text: dot(item.dots, 5), fontSize: 17, margin: [0, -4, 0, 0], alignment: "right" },
                ]
              })),
              { text: ' ' },
              character.rites.filter((i) => i.name.length).map((item) => ({
                columns: [
                  { color: brown, text: item.name, alignment: "left" },
                  { width: "*", color: brown, text: dot(item.dots, 5), fontSize: 17, margin: [0, -4, 0, 0], alignment: "right" },
                ]
              })),
            ],
          },
          {
            width: "50%", stack: [
              { bold: true, color: brown, text: "Aspirations" },
              { fontSize: 3, text: ' ' },
              { text: `1. ${character.traits.Aspirations.One }` },
              { text: `2. ${character.traits.Aspirations.Two }` },
              { text: `3. ${character.traits.Aspirations.Three }` },
              { text: ' ' },
              { bold: true, color: brown, text: "Health" },
              { fontSize: 3, text: ' ' },
              {
                columns: [
                    ...Array.from({ length: character.health.aggravated }).map((i) => ({ width: 15, svg: svgAggr })),
                    ...Array.from({ length: character.health.lethal }).map((i) => ({ width: 15, svg: svgLeth })),
                    ...Array.from({ length: character.health.bashing }).map((i) => ({ width: 15, svg: svgBash })),
                    ...Array.from({ length: healthRemaining }).map((i) => ({ width: 15, svg: svgNone })),
                ],
                columnGap: 0,
              },
              { fontSize: 3, text: ' ' },
              { text: `${character.progress.Experience} Experience (${character.progress.Beats}/5 Beats)` },
              { text: ' ' },
              { bold: true, color: brown, text: "Traits" },
              { fontSize: 3, text: ' ' },
              `Potency ${character.traits.BloodPotency}/10`,
              `Humanity ${character.traits.Humanity}/10`,
              { text: `Willpower ${character.traits.Willpower }/${character.attributes.mental.Resolve.dots + character.attributes.social.Composure.dots}` },
              { text: `Vitae ${character.traits.Vitae}/${vitaeMax[character.traits.BloodPotency]}` },
              { text: ' ' },
              { bold: true, color: brown, text: "Conditions" },
              { fontSize: 3, text: ' ' },
              { text: character.status.conditions.map((c) => c.name).join("\n") },
              { text: ' ' },
              { bold: true, color: brown, text: "Touchstones" },
              { fontSize: 3, text: ' ' },
              { text: character.traits.Touchstones.filter((t) => t.name.length).map((t, i) => t.name + ` (${humanity(character.details.clan, i)})`).join("\n") },
              { text: ' ' },
              { bold: true, color: brown, text: "Banes" },
              { fontSize: 3, text: ' ' },
              { text: character.banes.map((t) => t.name).join("\n") },
              { text: ' ' },
              { bold: true, color: brown, text: "Merits" },
              { fontSize: 3, text: ' ' },
              character.merits.filter((i) => i.name.length).map((item) => ({
                columns: [
                  { text: item.name, alignment: "left" },
                  { width: "*", text: dot(item.dots, 5), fontSize: 17, margin: [0, -4, 0, 0], alignment: "right" },
                ]
              })),
              { text: ' ' },
              { bold: true, color: brown, text: "Devotions" },
              { fontSize: 3, text: ' ' },
              { text: character.devotions.map((t) => t.name).join("\n") },
            ]
          },
        ],
        columnGap: p,
      },
      { text: ' ', pageBreak: "after" },
      {
        stack: [
          ...Object.entries(character.extras).map(([key, value]) => [
            { bold: true, color: brown, text: `${key[0].toUpperCase() + key.substring(1)}` },
            { fontSize: 3, text: ' ' },
            { text: `${value || "N/A"}` },
            { text: ' ' },
          ]),
        ],
      },
      { fontSize: 1, color: beige, text: `rawjsondump:${JSON.stringify(json)}` },
    ],
  }

  pdfMake.createPdf(def, undefined, {
    Roboto: {
      normal: "https://winstromming.github.io/spell/Arial-Regular.ttf",
      bold: "https://winstromming.github.io/spell/Arial-Medium.ttf",
      italics: "https://winstromming.github.io/spell/Arial-Italic.ttf",
      bolditalics: "https://winstromming.github.io/spell/Arial-MediumItalic.ttf",
    },
  }).download(`${character.details.name || "character"}.pdf`);
}

</script>
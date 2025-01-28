import { reactive } from "vue";
import { cloneDeep } from "lodash";
import type { Attribute, Category, Condition, Level, Skill } from "../constants/types";

export const defaultCharacter = {
  details: {
    name: "",
    player: "",
    chronicle: "",
    mask: "",
    dirge: "",
    concept: "",
    clan: "",
    bloodline: "",
    covenant: "",
  },
  health: {
    maximum: { base: 0, modifier: 0 },
    bashing: 0,
    lethal: 0,
    aggravated: 0,
  },
  progress: {
    Beats: 0,
    Experience: 0,
  },
  traits: {
    Size: { base: 5, modifier: undefined },
    Speed: { base: 0, modifier: undefined },
    Defense: { base: 0, modifier: undefined },
    Armour: { base: 0, modifier: undefined },
    Initiative: { base: 0, modifier: undefined },
    Touchstones: [] as { name: string }[],
    Aspirations: {
      One: "",
      Two: "",
      Three: "",
    },
    BloodPotency: 1,
    Vitae: 0,
    Humanity: 7,
    Willpower: 0,
  },
  devotions: [] as { name: string }[],
  disciplines: [] as { name: string; dots: number }[],
  merits: [] as { name: string; dots: number }[],
  rites: [] as { name: string; dots: number }[],
  banes: [] as { name: string }[],
  extras: {
    people: "",
    places: "",
    things: "",
    appearance: "",
    backstory: "",
    notes: "",
  },
  attributes: {
    mental: {
      Intelligence: { dots: 1 },
      Wits: { dots: 1 },
      Resolve: { dots: 1 },
    },
    physical: {
      Strength: { dots: 1 },
      Dexterity: { dots: 1 },
      Stamina: { dots: 1 },
    },
    social: {
      Presence: { dots: 1 },
      Manipulation: { dots: 1 },
      Composure: { dots: 1 },
    },
  } as Record<Category, Record<Attribute, { dots: number }>>,
  skills: {
    mental: {
      Academics: { label: "", dots: 0 },
      Computers: { label: "", dots: 0 },
      Crafts: { label: "", dots: 0 },
      Investigation: { label: "", dots: 0 },
      Medicine: { label: "", dots: 0 },
      Occult: { label: "", dots: 0 },
      Politics: { label: "", dots: 0 },
      Science: { label: "", dots: 0 },
    },
    physical: {
      Athletics: { label: "", dots: 0 },
      Brawl: { label: "", dots: 0 },
      Drive: { label: "", dots: 0 },
      Firearms: { label: "", dots: 0 },
      Larceny: { label: "", dots: 0 },
      Stealth: { label: "", dots: 0 },
      Survival: { label: "", dots: 0 },
      Weaponry: { label: "", dots: 0 },
    },
    social: {
      Animals: { label: "", dots: 0 },
      Empathy: { label: "", dots: 0 },
      Expression: { label: "", dots: 0 },
      Intimidation: { label: "", dots: 0 },
      Persuasion: { label: "", dots: 0 },
      Socialise: { label: "", dots: 0 },
      Streetwise: { label: "", dots: 0 },
      Subterfuge: { label: "", dots: 0 },
    },
  } as Record<Category, Record<Skill, { label: string; dots: Level }>>,
  status: {
    conditions: [] as { name: string }[], // Condition[],
    equipment: [],
  },
}
export const character = reactive(cloneDeep(defaultCharacter));
export type Character = typeof character;
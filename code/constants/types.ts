export type Category = "mental" | "physical" | "social"
export type Attribute = "Intelligence" | "Wits" | "Resolve" | "Strength" | "Dexterity" | "Stamina" | "Presence" | "Manipulation" | "Composure"
export type Skill =
  | "Academics"
  | "Computers"
  | "Crafts"
  | "Investigation"
  | "Medicine"
  | "Occult"
  | "Politics"
  | "Science"
  | "Athletics"
  | "Brawl"
  | "Drive"
  | "Firearms"
  | "Larceny"
  | "Stealth"
  | "Survival"
  | "Weaponry"
  | "Animals"
  | "Empathy"
  | "Expression"
  | "Intimidation"
  | "Persuasion"
  | "Socialise"
  | "Streetwise"
  | "Subterfuge"
export type Level = 1 | 2 | 3 | 4 | 5 | number
export type Condition = {
  name: string
  persist: true | false | undefined
  beat: string
  sources: string
  resolution: string
  description: string
}

export const vitaeMax = [
  null,
  10,
  11,
  12,
  13,
  15,
  20,
  25,
  30,
  50,
  75,
];
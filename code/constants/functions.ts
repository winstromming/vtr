export const dots = (num: number) => Array.from({ length: num }, () => "•").join("")

export const humanity = (clan: string, num: number) => {
  let start = clan.toLowerCase().includes("ventrue") ? 7 : 6;
  return `Humanity ${start - num}`;
}
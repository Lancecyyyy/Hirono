const PRODUCTS = [
  { id:1, name:"The Other One", img:"theotherone.png", imgAlt:"theothertwo.jpg", series:"other-one", tag:"The Other One · Oct 2021", price:790, desc:"The debut series that introduced Hirono's introverted, melancholic world.", featured:true },
  { id:2, name:"Little Mischief", img:"mischef.jpg", imgAlt:"mischef2.jpg", series:"little-mischief", tag:"Little Mischief · Aug 2022", price:790, desc:"Leans into Hirono's naughtier, rebellious childhood side." },
  { id:3, name:"City of Mercy", img:"city.jpg", imgAlt:"city2.jpg", series:"city-of-mercy", tag:"City of Mercy · Nov 2022", price:790, desc:"Raw emotion and survival — finding grace in bleak settings.", featured:true },
  { id:4, name:"Mime", img:"mime.jpg", imgAlt:"mime2.jpg", series:"mime", tag:"Mime · Jul 2023", price:850, desc:"Expressive, non-verbal storytelling with mechanical design details." },
  { id:5, name:"Reshape", img:"reshape.webp", imgAlt:"reshape2.webp", series:"reshape", tag:"Reshape · Dec 2023", price:850, desc:"Fragmented forms exploring personal transformation.", featured:true },
  { id:6, name:"Shelter", img:"shelter.webp", imgAlt:"shelter2.webp", series:"shelter", tag:"Shelter · May 2024", price:890, desc:"A search for spiritual sanctuary, or just somewhere to hide for a while." },
  { id:7, name:"Echo", img:"echo.webp", imgAlt:"echo2.webp", series:"echo", tag:"Echo · Late 2024", price:890, desc:"A colorful, nostalgic look back at childhood dreams.", featured:true },
  { id:8, name:"Le Petit Prince", img:"le.webp", imgAlt:"le2.webp", series:"le-petit-prince", tag:"Le Petit Prince collab · 2024", price:1450, desc:"A storybook crossover, reimagining its cast in Hirono's world." },
  { id:9, name:"CLOT", img:"clot.webp", imgAlt:"clot2.jpg", series:"clot", tag:"CLOT collab · 2024", price:1890, desc:"A high-fashion streetwear collaboration with CLOT.", featured:true },
];

const SERIES_ORDER = [
  "showcase", "other-one", "little-mischief", "city-of-mercy", "mime",
  "reshape", "shelter", "echo", "le-petit-prince", "clot"
];

const SERIES_INFO = {
  showcase: { title:"Showcase", blurb:"A few favorites to start with.", label:"Showcase" },
  "other-one": { title:"The Other One", blurb:"Where it all began — Hirono's quiet, introverted side. October 2021.", label:"The Other One" },
  "little-mischief": { title:"Little Mischief", blurb:"A naughtier, more rebellious read on childhood. August 2022.", label:"Little Mischief" },
  "city-of-mercy": { title:"City of Mercy", blurb:"Heavier emotional ground — grace found in hard places. November 2022.", label:"City of Mercy" },
  mime: { title:"Mime", blurb:"Wordless storytelling with playful mechanical details. July 2023.", label:"Mime" },
  reshape: { title:"Reshape", blurb:"Fragmented shapes and personal transformation. December 2023.", label:"Reshape" },
  shelter: { title:"Shelter", blurb:"A search for somewhere safe to be. May 2024.", label:"Shelter" },
  echo: { title:"Echo", blurb:"Nostalgic, colorful memories of being a kid again. Late 2024.", label:"Echo" },
  "le-petit-prince": { title:"Le Petit Prince", blurb:"A storybook crossover collaboration. 2024.", label:"Le Petit Prince" },
  clot: { title:"CLOT", blurb:"A streetwear fashion collaboration. 2024.", label:"CLOT" },
};

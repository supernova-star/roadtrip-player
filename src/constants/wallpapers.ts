import { wallpaperUrl } from "@/utils/formatter";

export interface WallpaperTheme {
  mode: "light" | "dark";
  playerBackground: string;
  playerBorder: string;

  accent: string;

  blurTextAccent: string;

  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
}

export interface Wallpaper {
  id: string;
  name: string;
  src: string;
  mood: string;
  theme: WallpaperTheme;
}

export const wallpapers: Wallpaper[] = [
  {
    id: "road-trip",
    name: "Road Trip",
    mood: "Adventurous and Free-Spirited",
    src: wallpaperUrl("roadTrip"),
    theme: {
      mode: "dark",
      playerBackground: "#35151F",
      playerBorder: "#713342",
      accent: "#cd6349",
      blurTextAccent: "#ffaa95",
      textPrimary: "#F8F1E8",
      textSecondary: "#CDB9B4",
      textDisabled: "#77656A",
    },
  },

  {
    id: "purple-night",
    name: "Purple Night",
    mood: "Mysterious and Dreamy",
    src: wallpaperUrl("purple-night"),
    theme: {
      mode: "dark",
      playerBackground: "#170D27",
      playerBorder: "#521878",
      accent: "#E95B9A",
      blurTextAccent: "#E95B9A",
      textPrimary: "#FFF4EC",
      textSecondary: "#D6B8C8",
      textDisabled: "#75647A",
    },
  },

  {
    id: "vintage-forest",
    name: "Vintage Forest",
    mood: "Nostalgic and Serene",
    src: wallpaperUrl("vintage-forest"),
    theme: {
      mode: "dark",
      playerBackground: "#182421",
      playerBorder: "#52645B",
      accent: "#adc783",
      blurTextAccent: "#adc783",
      textPrimary: "#F4F0E3",
      textSecondary: "#C2C4AE",
      textDisabled: "#737A6D",
    },
  },

  // {
  //   id: "mountain-blue",
  //   name: "Mountain Road",
  //   mood: "Adventurous and Refreshing",
  //   src: wallpaperUrl("mountain-blue"),
  //   theme: {
  //     mode: "dark",
  //     playerBackground: "#172432",
  //     playerBorder: "#526579",
  //     accent: "#6FA8C9",
  //     textPrimary: "#F4F0E7",
  //     textSecondary: "#B9C0C5",
  //     textDisabled: "#68747D",
  //   },
  // },

  {
    id: "kolkata-taxi",
    name: "Kolkata Taxi",
    mood: "Vibrant and Urban",
    src: wallpaperUrl("kolkata-taxi"),
    theme: {
      mode: "dark",
      playerBackground: "#321B18",
      playerBorder: "#754536",
      accent: "#E8B83D",
      blurTextAccent: "#E8B83D",
      textPrimary: "#FFF1DF",
      textSecondary: "#D8BDA7",
      textDisabled: "#8C6F62",
    },
  },

  {
    id: "lakeside-night",
    name: "Lakeside Night",
    mood: "Peaceful and Reflective",
    src: wallpaperUrl("lakeside-night"),
    theme: {
      mode: "dark",
      playerBackground: "#101A32",
      playerBorder: "#435477",
      accent: "#6ec8eb",
      blurTextAccent: "#6ec8eb",
      textPrimary: "#F3F1E8",
      textSecondary: "#B9C1D2",
      textDisabled: "#626C80",
    },
  },

  {
    id: "dubai-sunset",
    name: "Dubai Sunset",
    mood: "Warm and Serene",
    src: wallpaperUrl("dubai-sunset"),
    theme: {
      mode: "dark",
      playerBackground: "#171B32",
      playerBorder: "#3D4568",
      accent: "#ffc665",
      blurTextAccent: "#ffc665",
      textPrimary: "#FFF3E6",
      textSecondary: "#C8C6D2",
      textDisabled: "#74788D",
    },
  },

  // {
  //   id: "alpine-meadow",
  //   name: "Alpine Meadow",
  //   mood: "Fresh and Serene",
  //   src: wallpaperUrl("alpine-meadow"),
  //   theme: {
  //     mode: "light",
  //     playerBackground: "#F1F7F5",
  //     playerBorder: "#9DC0C7",
  //     accent: "#4C8C56",
  //     textPrimary: "#1A2B2A",
  //     textSecondary: "#4C6362",
  //     textDisabled: "#829492",
  //   },
  // },

  {
    id: "village-lane",
    name: "Village Lane",
    mood: "Warm and Charming",
    src: wallpaperUrl("village-lane"),
    theme: {
      mode: "dark",
      playerBackground: "#2A211B",
      playerBorder: "#73533A",
      accent: "#ff9073",
      blurTextAccent: "#ff9073",
      textPrimary: "#FFF2DE",
      textSecondary: "#CDBEAA",
      textDisabled: "#776C5F",
    },
  },

  {
    id: "lakeside-breeze",
    name: "Lakeside Breeze",
    src: wallpaperUrl("lakeside-breeze"),
    mood: "Calm and Breezy",
    theme: {
      mode: "light",
      playerBackground: "#F3F8F7",
      playerBorder: "#97B5B3",
      accent: "#5F8880",
      blurTextAccent: "#58e2c7",
      textPrimary: "#183238",
      textSecondary: "#4F686B",
      textDisabled: "#819698",
    },
  },

  // {
  //   id: "sakura-breeze",
  //   name: "Sakura Breeze",
  //   mood: "Dreamy and Joyful",
  //   src: wallpaperUrl("sakura-breeze"),
  //   theme: {
  //     mode: "light",
  //     playerBackground: "#FFF3F6",
  //     playerBorder: "#E3A9B9",
  //     accent: "#E45C88",
  //     textPrimary: "#3B2730",
  //     textSecondary: "#795967",
  //     textDisabled: "#AA929C",
  //   },
  // },

  {
    id: "mint-bougainvillea",
    name: "Mint Bougainvillea",
    src: wallpaperUrl("mint-bougainvillea"),
    mood: "Fresh and Charming",
    theme: {
      mode: "light",
      playerBackground: "#F5F8F3",
      playerBorder: "#A9C3B2",
      accent: "#5F9A87",
      blurTextAccent: "#9cf9dc",
      textPrimary: "#25352F",
      textSecondary: "#5D7068",
      textDisabled: "#8D9D96",
    },
  },

  {
    id: "book-rain",
    name: "Rainy Pages",
    mood: "Quiet and Dreamy",
    src: wallpaperUrl("book-rain"),
    theme: {
      mode: "dark",
      playerBackground: "#18252B",
      playerBorder: "#526B73",
      accent: "#B7A0C8",
      blurTextAccent: "#dfb3ff",
      textPrimary: "#EEF0EA",
      textSecondary: "#bde0ea",
      textDisabled: "#69787D",
    },
  },

  {
    id: "coffee-street",
    name: "Golden Street",
    mood: "Warm and Nostalgic",
    src: wallpaperUrl("coffee-street"),
    theme: {
      mode: "dark",
      playerBackground: "#24211A",
      playerBorder: "#766D50",
      accent: "#D5A84F",
      blurTextAccent: "#D5A84F",
      textPrimary: "#F6F0DE",
      textSecondary: "#C2B99E",
      textDisabled: "#7D7765",
    },
  },

  {
    id: "library",
    name: "Ember & Oak",
    mood: "Warm and Intimate",
    src: wallpaperUrl("library"),
    theme: {
      mode: "dark",
      playerBackground: "#182321",
      playerBorder: "#4F6961",
      accent: "#C57C61",
      blurTextAccent: "#C57C61",
      textPrimary: "#F1E9DA",
      textSecondary: "#AAB9B1",
      textDisabled: "#687670",
    },
  },

  {
    id: "sun-wine",
    name: "Golden Vines",
    mood: "Dreamy and Radiant",
    src: wallpaperUrl("sun-wine"),
    theme: {
      mode: "dark",
      playerBackground: "#27202B",
      playerBorder: "#795D72",
      accent: "#E07A4F",
      blurTextAccent: "#E07A4F",
      textPrimary: "#FFF0E1",
      textSecondary: "#C5ACB9",
      textDisabled: "#7E6C79",
    },
  },

  {
    id: "tea-train",
    name: "Monsoon Chai",
    mood: "Rainy and Lush",
    src: wallpaperUrl("tea-train"),
    theme: {
      mode: "dark",
      playerBackground: "#142629",
      playerBorder: "#47747A",
      accent: "#E0A85C",
      blurTextAccent: "#E0A85C",
      textPrimary: "#EDF4EF",
      textSecondary: "#A8C0BD",
      textDisabled: "#617977",
    },
  },

  {
    id: "train-junction",
    name: "Rainy Junction",
    mood: "Romantic and Cinematic",
    src: wallpaperUrl("train-junction"),
    theme: {
      mode: "dark",
      playerBackground: "#29212A",
      playerBorder: "#765C70",
      accent: "#D98A72",
      blurTextAccent: "#D98A72",
      textPrimary: "#F7ECE5",
      textSecondary: "#C3A9A8",
      textDisabled: "#806E70",
    },
  },

  {
    id: "dhaba",
    name: "Highway Dhaba",
    mood: "Rustic and Familiar",
    src: wallpaperUrl("dhaba"),
    theme: {
      mode: "dark",
      playerBackground: "#29241D",
      playerBorder: "#75644C",
      accent: "#D69A4A",
      blurTextAccent: "#E8B86F",
      textPrimary: "#F4EFE3",
      textSecondary: "#D0C2A5",
      textDisabled: "#827868",
    },
  },

  {
    id: "howrah-bridge",
    name: "Ganga Ke Kinare",
    mood: "Golden and Reflective",
    src: wallpaperUrl("howrah-bridge"),
    theme: {
      mode: "dark",
      playerBackground: "#26343A",
      playerBorder: "#667A7D",
      accent: "#DDA85B",
      blurTextAccent: "#F0C982",
      textPrimary: "#F5F1E7",
      textSecondary: "#C7D5D5",
      textDisabled: "#778488",
    },
  },

  {
    id: "train",
    name: "Platform Memories",
    mood: "Bright and Nostalgic",
    src: wallpaperUrl("train"),
    theme: {
      mode: "dark",
      playerBackground: "#252B2A",
      playerBorder: "#69736B",
      accent: "#D8A45B",
      blurTextAccent: "#EBC27F",
      textPrimary: "#F3F0E6",
      textSecondary: "#C9D0C8",
      textDisabled: "#7B837D",
    },
  },

  {
    id: "tram",
    name: "Kolkata Tram",
    mood: "Old and Familiar",
    src: wallpaperUrl("tram"),
    theme: {
      mode: "dark",
      playerBackground: "#252A29",
      playerBorder: "#64736F",
      accent: "#78AFC4",
      blurTextAccent: "#A5CFDA",
      textPrimary: "#F2F0E7",
      textSecondary: "#C5D1CC",
      textDisabled: "#77827F",
    },
  },

  {
    id: "bus",
    name: "Sheher Ki Sawaari",
    mood: "Sunny and Nostalgic",
    src: wallpaperUrl("bus"),
    theme: {
      mode: "dark",
      playerBackground: "#252A25",
      playerBorder: "#66705F",
      accent: "#D68B5A",
      blurTextAccent: "#E8B083",
      textPrimary: "#F3F0E5",
      textSecondary: "#C9D0BC",
      textDisabled: "#7C8275",
    },
  },

  {
    id: "banaras",
    name: "Shaam Ki Mehfil",
    mood: "Warm and Soulful",
    src: wallpaperUrl("banaras"),
    theme: {
      mode: "dark",
      playerBackground: "#25212A",
      playerBorder: "#69545A",
      accent: "#E6A45D",
      blurTextAccent: "#F4C58A",
      textPrimary: "#F4EFE7",
      textSecondary: "#D8C6B5",
      textDisabled: "#83766F",
    },
  },
];

export type WallpaperCategory = "Nature" | "Rustic" | "Nostalgic";

export const rusticWallpaperIds = new Set([
  "book-rain",
  "coffee-street",
  "library",
  "sun-wine",
  "tea-train",
  "train-junction",
]);

export const nostalgicWallpaperIds = new Set([
  "dhaba",
  "howrah-bridge",
  "train",
  "tram",
  "bus",
  "banaras",
]);

export const wallpaperQuotes: Record<string, string> = {
  "road-trip": "The road is always better with a good song.",
  "purple-night": "Some journeys begin after sunset.",
  "vintage-forest": "Take the scenic route.",
  "kolkata-taxi": "Every street has a rhythm of its own.",
  "lakeside-night": "Let the quiet miles find you.",
  "dubai-sunset": "Chase the last light home.",
  "village-lane": "The slow road remembers more.",
  "lakeside-breeze": "Leave room for a little wonder.",
  "mint-bougainvillea": "Good things grow along the way.",
  "book-rain": "Some stories sound better in the rain.",
  "coffee-street": "Warm coffee, open roads, no hurry.",
  library: "Stay awhile where the light feels kind.",
  "sun-wine": "Follow the glow between destinations.",
  "tea-train": "The best conversations travel slowly.",
  "train-junction": "Every departure carries a little hope.",
  dhaba: "The best stops are never on the map.",
  "howrah-bridge": "Some views make the whole journey worth it.",
  train: "There is always another platform ahead.",
  tram: "Old streets keep the best memories.",
  bus: "The city moves, and so do we.",
  banaras: "Let the evening unfold one song at a time.",
};

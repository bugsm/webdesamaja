import type { SchemaTypeDefinition } from "sanity";

import berita from "./berita";
import profil from "./profil";
import potensi from "./potensi";
import fasilitas from "./fasilitas";

export const schemaTypes: SchemaTypeDefinition[] = [
  berita,
  profil,
  potensi,
  fasilitas,
];

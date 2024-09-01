export interface Competencia {
  title: string;
  value: string;
}

export interface Characteristicas {
  title: string;
  type?: "number" | "text";
  description?: string;
}

export interface CharacterData {
  id: string;
  userId: string;
  title: string;
  nombre: string;
  competencias: Competencia[];
  characteristicas: Characteristicas[];
  imageUri?: string;
}

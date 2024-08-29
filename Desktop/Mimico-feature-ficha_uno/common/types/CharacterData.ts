export interface Competencia {
  title: string;
  value: string;
}

export interface CharacterData {
  id: string;
  userId: string;
  title: string;
  nombre: string;
  competencias: Competencia[];
  imageUri?: string;
}

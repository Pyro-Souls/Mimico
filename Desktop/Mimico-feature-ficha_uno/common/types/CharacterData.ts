export interface Competencia {
  title: string;
}

export interface Characteristica {
  id: string;
  number1: string;
  name: string;
  number2: string;
}

export interface CharacterData {
  id: string;
  userId: string;
  title: string;
  nombre: string;
  competencias: Competencia[];
  characteristicas: Characteristica[];
  imageUri?: string;
}

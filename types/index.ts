export type CardData = {
  image: string;
  text: string;
};

export type CardQuestion = {
  pregunta: string;
  respuestas: AnswerQuestion[];
};

export type AnswerQuestion = {
  id: number;
  respuesta: string;
  correcta: boolean;
};

export type Respuesta = {
  id: number;
  text: string;
  correct: boolean;
};

export type Question = {
  id: number;
  Cantantes: string;
  Preguntas: string;
  Nivel: number;
  Respuestas: Respuesta[];
};

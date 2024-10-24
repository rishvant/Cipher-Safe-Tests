export interface Option {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOption?: string;
}
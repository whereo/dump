export type AppNotification = {
  title: string;
  content?: string;
  action?: {
    name: string;
    callback: Function;
  };
};

export type RecipeIngredient = {
  name: string;
  quantity: string;
};

export type Recipe = {
  id: string;
  title: string;
  description: string | null;
  ingredients: RecipeIngredient[];
  portionsCount: number;
  steps: InstructionStep[];
  isOwner: boolean;
};

export type InstructionStep = {
  title: string;
  content: string;
  image?: {
    source: File | string;
    caption?: string;
  };
  timer?: {
    name: string;
    duration: number;
  };
};

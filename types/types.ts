import type { Component } from "vue";

export type AppNotification = {
  icon?: Component;
  title: string;
  content?: string;
  action?: {
    name: string;
    callback: Function;
  };
};

export type Recipe = {
  id: string;
  title: string;
  description: string | null;
  ingredients: RecipeIngredient[];
  portionsCount: number;
  steps: InstructionStep[];
  author?: {
    id: string;
    name: string;
  };
  isOwner: boolean;
  tags: {
    slug: string;
    name: string;
  }[];
};

export type RecipeIngredient = {
  name: string;
  quantity: string;
  unit: string | null;
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

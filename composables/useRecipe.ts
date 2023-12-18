import { ref } from "vue";
import { type Database, type Tables, type Json } from "@/types/supabase";
import { type Recipe } from "@/types/types";

const recipes = ref<Recipe[]>([]);

const generateUUID = () => {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export const useRecipe = () => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient<Database>();

  const format = (data: Tables<"recipes"> | null): Recipe | null => {
    if (data === null) {
      return null;
    }

    const { id, title, description } = data;

    let isOwner = false;

    if (user.value && data.author_id) {
      isOwner = user.value.id === data.author_id.id;
    }

    return {
      id: String(id),
      title,
      description,
      steps: data.content as Recipe["steps"],
      ingredients: data.ingredients as Recipe["ingredients"],
      portionsCount: Number(data.portions_count),
      author: data.author_id
        ? {
            id: String(data.author_id.id),
            name: data.author_id.username,
          }
        : undefined,
      isOwner,
      tags: data.recipes_tags.map((t) => t.tag_id),
    };
  };

  const getRecipe = async (id: string) => {
    const { data, error, pending } = await useAsyncData<Recipe | null>(
      "recipe",
      async () => {
        const { data } = await supabase
          .from("recipes")
          .select(
            `
            *,
            author_id(*),
            recipes_tags(tag_id(slug, name))
          `,
          )
          .eq("id", id)
          .single();

        return format(data);
      },
    );

    return { data, error, pending };
  };

  const updateRecipe = async (recipe: Recipe) => {
    await Promise.all(
      recipe.steps.map(async (step) => {
        if (step.image && typeof step.image.source !== "string") {
          const filename = `${generateUUID()}-${step.image.source.name}`;

          const { error } = await supabase.storage
            .from("recipe-images")
            .upload(filename, step.image.source, {
              cacheControl: "3600",
              upsert: false,
            });

          const {
            data: { publicUrl },
          } = await supabase.storage
            .from("recipe-images")
            .getPublicUrl(filename);

          step.image.source = publicUrl;
        }
      }),
    );

    const { data } = await supabase
      .from("recipes")
      .update({
        title: recipe.title,
        description: recipe.description,
        content: recipe.steps as Json,
        ingredients: recipe.ingredients,
        portions_count: recipe.portionsCount,
      })
      .eq("id", recipe.id)
      .select();

    return data;
  };

  const addRecipe = async (recipe: Omit<Recipe, "id">) => {
    const { data, error, pending } = await useAsyncData<Recipe | null>(
      "recipe",
      async () => {
        if (!user.value || !user.value.id) throw Error("No user id found");

        const a = await supabase
          .from("recipes")
          .insert({
            title: recipe.title,
            description: recipe.description,
            content: recipe.steps as Json,
            ingredients: recipe.ingredients,
            portions_count: recipe.portionsCount,
            owner_id: user.value.id,
          })
          .select();

        console.log("all", a);

        const { data } = a;

        console.log(data);
        return format(data[0]);
      },
    );

    return { data, error, pending };
  };

  return {
    addRecipe,
    getRecipe,
    updateRecipe,
  };
};

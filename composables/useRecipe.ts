import { ref } from "vue";
import { Database, Table } from "@/types/supabase";
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
  // const user = useSupabaseUser();
  const supabase = useSupabaseClient<Database>();

  const format = (data: Table<"recipes"> | null): Recipe | null => {
    if (data === null) {
      return null;
    }

    const {
      id,
      title,
      description,
      content: steps,
      ingredients,
      portions_count: portionsCount,
    } = data;

    console.log(user.value.id, data.owner_id, user.value.id === data.owner_id);
    return {
      id,
      title,
      description,
      steps,
      ingredients,
      portionsCount,
      isOwner: false,
      // isOwner: user.value && user.value.id === data.owner_id,
    };
  };

  const getRecipe = async (id: string) => {
    const { data, error, pending } = await useAsyncData<Recipe | null>(
      "recipe",
      async () => {
        const { data } = await supabase
          .from("recipes")
          .select(
            "id, title, description, content, ingredients, portions_count",
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
        if (step.image) {
          const filename = `${generateUUID()}-${step.image.source.name}`;

          const { data, error } = await supabase.storage
            .from("recipe-images")
            .upload(filename, step.image.source, {
              cacheControl: "3600",
              upsert: false,
            });

          if (data) {
            console.log("data", data);
          }

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
        content: recipe.steps,
        ingredients: recipe.ingredients,
        portions_count: recipe.portionsCount,
      })
      .eq("id", recipe.id)
      .select();

    return data;
  };

  return {
    getRecipe,
    updateRecipe,
  };
};

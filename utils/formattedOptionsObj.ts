import { Category } from "@/types/quiz";

type ObjectType = Record<string, string> | Category;

export const formattedObject = (object: ObjectType) => {
  return {
    value: typeof object.id === "number" ? object?.id.toString() : object.id,
    label: object?.name,
  };
};

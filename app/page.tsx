import { Categories } from "@/types/quiz";
import Home from "./Home";


const apiUrl = process.env.API_URL;

const getCategories = async (): Promise<Categories> => {
  const endpoint = `${apiUrl}api_category.php`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const HomePage = async () => {
  const { trivia_categories } = await getCategories();
  return <Home categories={trivia_categories} />;
};

export default HomePage;

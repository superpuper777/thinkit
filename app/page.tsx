import { Categories } from "@/types/quiz";
import Home from "./Home";
import { getToken } from "./actions";
// import { tokenStore } from "./store/token";
// import { getToken } from "./actions";

const getCategories = async (): Promise<Categories> => {
  const endpoint = `https://opentdb.com/api_category.php`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const HomePage = async () => {
  const token = (await getToken()).token;
  const { trivia_categories } = await getCategories();
  return <Home categories={trivia_categories} token={token} />;
};

export default HomePage;

import axios from "axios";
import { Article } from "./types";

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL as string;
    const apiKey = process.env.REACT_APP_API_KEY as string;

    const url = `${apiUrl}api-key=${apiKey}`;

    const res = await axios.get(url);

    return res.data.results;
  } catch (error: any) {
    console.error("Error in Api", error);
    throw new Error(
      error.response?.status === 404 ? "Articles not found (404)" : "Something went wrong",
    );
  }
};

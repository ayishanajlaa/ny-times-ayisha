import { useEffect, useState, useContext, useMemo } from "react";
import { fetchArticles } from "../api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AppContext } from "../App";

interface Article {
  id: number;
  title: string;
  byline: string;
  published_date: string;
  media: {
    "media-metadata": Array<{
      url: string;
    }>;
  }[];
}

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContex use with an Provider");
  }

  const { searchKey } = context;

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const articleList = await fetchArticles();
        setArticles(articleList as Article[]);
        setError(null);
      } catch (error: any) {
        console.error("Failed to load articles:", error);
        setError(error.message); // Now, the error message is displayed properly
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    if (!searchKey) return articles;

    const query = searchKey.toLowerCase();
    return articles.filter((article) => article.title.toLowerCase().includes(query));
  }, [searchKey, articles]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
        <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-lg shadow">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const articleCard = (article: Article) => (
    <Link to={`/article/${article.id}`} className="block h-full">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transition-shadow h-full hover:shadow-xl flex flex-col">
        {article.media?.[0]?.["media-metadata"]?.[2]?.url && (
          <img
            src={article.media[0]["media-metadata"][2].url}
            alt={article.title}
            className="w-full h-52 object-cover"
            loading="lazy"
          />
        )}
        <div className="p-5 flex-grow flex flex-col">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {article.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-1">{article.byline}</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-auto">
            {new Date(article.published_date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-6">
          Trending News 🔥
        </h1>

        {filteredArticles.length === 0 ? (
          <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-300">
              No articles found matching your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                {articleCard(article)}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;

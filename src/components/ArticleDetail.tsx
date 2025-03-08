import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchArticles } from "../api";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticleDetail = async () => {
      setLoading(true);
      try {
        const data = await fetchArticles();
        const foundArticle = data.find((art: any) => art.id.toString() === id);
        setArticle(foundArticle);
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setLoading(false);
      }
    };
    getArticleDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 p-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Article not found</h2>
          <Link
            to="/"
            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            ← Back to News
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 min-h-screen pb-12">
      <div className="container mx-auto p-6 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to News
        </Link>

        {/* Article Hero Section */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden mb-8">
          {article.media?.[0]?.["media-metadata"]?.[2]?.url && (
            <img
              src={article.media[0]["media-metadata"][2].url}
              alt={article.title}
              className="w-full h-80 object-cover"
            />
          )}

          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {article.section && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                  {article.section}
                </span>
              )}
              {article.subsection && (
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                  {article.subsection}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
              {article.title}
            </h1>

            {article.byline && (
              <p className="text-gray-600 dark:text-gray-400 mb-2">{article.byline}</p>
            )}

            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{formatDate(article.published_date)}</span>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <p className="text-lg leading-relaxed text-gray-900 dark:text-white mb-6">
                {article.abstract}
              </p>

              {article.des_facet && article.des_facet.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                    Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.des_facet.map((topic: string, index: number) => (
                      <span
                        key={`${topic}-${index}`}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Read full article on NY Times 🔗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;

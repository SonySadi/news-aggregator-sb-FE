import React from "react";

interface NewsArticleProps {
  title: string;
  description: string;
  content: string;
  publishDate: string;
  sourceUrl: string;
  topics: string[];
  // Include other props as needed
}

const NewsArticle: React.FC<NewsArticleProps> = ({
  title,
  description,
  content,
  publishDate,
  sourceUrl,
  topics,
}) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6 transition-transform hover:scale-[1.02]">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Published on{" "}
          {new Date(publishDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {topics.map((topic) => (
            <span
              key={topic}
              className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Read more
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsArticle;

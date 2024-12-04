import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import NewsArticle from "./NewsArticle";

interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  publishDate: string;
  sourceUrl: string;
  topics: string[];
  entities: {
    people: string[];
    locations: string[];
    organizations: string[];
  };
  createdAt: string;
}

interface FilterOptions {
  search: string;
  startDate: string;
  endDate: string;
  source: string;
}

const NewsList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    search: "",
    startDate: "",
    endDate: "",
    source: "",
  });
  const [sources, setSources] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchArticles = useCallback(async () => {
    try {
      const filledFilterOptions = Object.entries(filterOptions).reduce(
        (acc, [key, value]) => {
          if (value !== "") {
            acc[key as keyof FilterOptions] = value;
          }
          return acc;
        },
        {} as Partial<FilterOptions>
      );

      const config = {
        params: {
          ...filledFilterOptions,
          page: currentPage,
          limit: 10,
        },
      };

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/articles`,
        config
      );

      // Update to correctly access the paginated data
      const { data, meta } = response.data;
      setArticles(data || []);
      setTotalPages(meta?.last_page || 1);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]); // Set empty array on error
      setTotalPages(1); // Reset pagination on error
    }
  }, [filterOptions, currentPage]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilterOptions({
      ...filterOptions,
      [e.target.name]: e.target.value,
    });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-6 pb-6 mb-8">
        <input
          type="text"
          name="search"
          placeholder="Search articles..."
          value={filterOptions.search}
          onChange={handleFilterChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="date"
            name="startDate"
            value={filterOptions.startDate}
            onChange={handleFilterChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="date"
            name="endDate"
            value={filterOptions.endDate}
            onChange={handleFilterChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="space-y-6">
        {articles.map((article) => (
          <NewsArticle key={article.id} {...article} />
        ))}
      </div>

      {articles.length > 0 && (
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Previous
          </button>
          <span className="text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsList;

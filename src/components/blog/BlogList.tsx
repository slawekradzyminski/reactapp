import { Link, useSearchParams } from "react-router-dom";
import { Container, Box, Grid } from "@mui/material";
import blogIndex from "../../data/blog/index.json";
import CategoryFilter from "./CategoryFilter";
import { useState, useEffect } from "react";
import { BlogListHeader } from "./BlogListHeader";
import { BlogEntry } from "./BlogEntry";
import { BlogPagination } from "./BlogPagination";
import { NoPostsFound } from "./NoPostsFound";
import { YearlyArchive } from "./YearlyArchive";
import "./BlogList.css";

const POSTS_PER_PAGE = 5;
const MAX_PREVIEW_LENGTH = 200;

const extractPreview = (htmlContent: string): string => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  let preview = "";
  const firstParagraph = tempDiv.querySelector("p");

  if (firstParagraph) {
    preview = firstParagraph.textContent || "";
  } else {
    preview = tempDiv.textContent || "";
  }

  if (preview.length > MAX_PREVIEW_LENGTH) {
    preview = preview.substring(0, MAX_PREVIEW_LENGTH).trim() + "...";
  }

  return preview;
};

const BlogList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentCategory = searchParams.get("category");
  const currentSearch = searchParams.get("search") || "";
  const currentYear = searchParams.get("year") ? parseInt(searchParams.get("year")!, 10) : undefined;
  const [postPreviews, setPostPreviews] = useState<Map<string, string>>(new Map());
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  const filteredPosts = blogIndex.filter((post) => {
    const matchesCategory = !currentCategory || post.category === currentCategory;
    const matchesSearch = !currentSearch || post.title.toLowerCase().includes(currentSearch.toLowerCase());
    const matchesYear = !currentYear || new Date(post.date).getFullYear() === currentYear;
    return matchesCategory && matchesSearch && matchesYear;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    setSearchParams(newSearchParams);
    window.scrollTo(0, 0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    const timeoutId = setTimeout(() => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (newSearchTerm) {
        newSearchParams.set("search", newSearchTerm);
      } else {
        newSearchParams.delete("search");
      }
      newSearchParams.set("page", "1");
      setSearchParams(newSearchParams);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleYearSelect = (year: number | undefined) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (year) {
      newSearchParams.set("year", year.toString());
    } else {
      newSearchParams.delete("year");
    }
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
  };

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryClick = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("category", category);
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    const loadPreviews = async () => {
      const newPreviews = new Map<string, string>();

      for (const post of currentPosts) {
        try {
          const postData = await import(`../../data/blog/${post.id}.json`);
          const preview = extractPreview(postData.content);
          newPreviews.set(post.id, preview);
        } catch (error) {
          console.error(`Error loading preview for post ${post.id}:`, error);
        }
      }

      setPostPreviews(newPreviews);
    };

    loadPreviews();
  }, [currentPosts]);

  return (
    <Container maxWidth="lg">
      <BlogListHeader searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} sx={{ order: { xs: 2, md: 1 } }}>
          <Box sx={{ position: 'sticky', top: 24 }}>
            <CategoryFilter />
            <Box sx={{ mt: 3 }}>
              <YearlyArchive 
                posts={blogIndex}
                selectedYear={currentYear}
                onYearSelect={handleYearSelect}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={9} sx={{ order: { xs: 1, md: 2 } }}>
          <Box>
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <BlogEntry
                  key={post.id}
                  post={post}
                  preview={postPreviews.get(post.id)}
                  onCategoryClick={handleCategoryClick}
                />
              ))
            ) : (
              <NoPostsFound />
            )}

            {totalPages > 1 && (
              <BlogPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogList;

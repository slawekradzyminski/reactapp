import { Link, useSearchParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Pagination,
  Link as MuiLink,
} from "@mui/material";
import { Category as CategoryIcon } from "@mui/icons-material";
import blogIndex from "../../data/blog/index.json";
import CategoryFilter from "./CategoryFilter";
import SearchInput from "../shared/SearchInput";
import { useState, useEffect } from "react";
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
  const [postPreviews, setPostPreviews] = useState<Map<string, string>>(
    new Map()
  );
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  const filteredPosts = blogIndex.filter((post) => {
    const matchesCategory =
      !currentCategory || post.category === currentCategory;
    const matchesSearch =
      !currentSearch ||
      post.title.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
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
    <Container maxWidth="md">
        <Box>
          <SearchInput 
            value={searchTerm} 
            onSearchChange={handleSearchChange}
            testId="search-blog-input"
          />
        </Box>

        <Typography
          variant="h4"
          component="h1"
          className="blog-list-title"
          sx={{ mb: 3, textAlign: "center" }}
        >
          Blog Archive
        </Typography>
        <CategoryFilter />

        <Box>
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <Link
                to={post.permalink}
                key={post.id}
                style={{ textDecoration: "none" }}
              >
                <Paper
                  className="blog-entry"
                  elevation={1}
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    className="blog-entry-title"
                  >
                    {post.title}
                  </Typography>

                  <Typography className="blog-entry-date">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>

                  {postPreviews.get(post.id) && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 2,
                        mb: 2,
                        lineHeight: 1.6,
                        opacity: 0.87,
                      }}
                    >
                      {postPreviews.get(post.id)}
                    </Typography>
                  )}

                  <Box className="blog-entry-meta">
                    {post.category && (
                      <Box
                        className="blog-entry-section"
                        component={MuiLink}
                        onClick={(e) => handleCategoryClick(e, post.category)}
                        sx={{
                          cursor: "pointer",
                          textDecoration: "none",
                          color: "inherit",
                          display: "flex",
                          alignItems: "center",
                          "&:hover": {
                            color: "primary.main",
                            "& .MuiSvgIcon-root": {
                              color: "primary.main",
                            },
                          },
                        }}
                      >
                        <CategoryIcon fontSize="small" color="action" />
                        <span className="blog-entry-section-label">
                          Category:
                        </span>
                        <span>{post.category}</span>
                      </Box>
                    )}
                  </Box>
                </Paper>
              </Link>
            ))
          ) : (
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ textAlign: "center", mt: 4 }}
            >
              No posts found matching your criteria
            </Typography>
          )}

          {totalPages > 1 && (
            <Box className="blog-pagination" sx={{ mt: 4, mb: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </Box>
    </Container>
  );
};

export default BlogList;

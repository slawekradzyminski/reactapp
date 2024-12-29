import { useSearchParams } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import blogIndex from "../../data/blog/index.json";
import CategoryFilter from "./CategoryFilter";
import { useState, useMemo } from "react";
import { BlogListHeader } from "./BlogListHeader";
import { BlogEntry } from "./BlogEntry";
import { BlogPagination } from "./BlogPagination";
import { NoPostsFound } from "./NoPostsFound";
import { YearlyArchive } from "./YearlyArchive";
import { MobileCategoryChip } from "./MobileCategoryChip";
import "./BlogList.css";

const POSTS_PER_PAGE = 5;

const BlogList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentCategory = searchParams.get("category");
  const currentSearch = searchParams.get("search") || "";
  const currentYear = searchParams.get("year") ? parseInt(searchParams.get("year")!, 10) : undefined;
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  const filteredPosts = useMemo(() => {
    return blogIndex.filter((post) => {
      const matchesCategory = !currentCategory || post.category === currentCategory;
      const matchesSearch = !searchTerm || post.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear = !currentYear || new Date(post.date).getFullYear() === currentYear;
      return matchesCategory && matchesSearch && matchesYear;
    });
  }, [currentCategory, searchTerm, currentYear]);

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
    
    const newSearchParams = new URLSearchParams(searchParams);
    if (newSearchTerm) {
      newSearchParams.set("search", newSearchTerm);
    } else {
      newSearchParams.delete("search");
    }
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
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

  const currentPosts = useMemo(() => {
    return filteredPosts.slice(
      (currentPage - 1) * POSTS_PER_PAGE,
      currentPage * POSTS_PER_PAGE
    );
  }, [filteredPosts, currentPage]);

  const handleCategoryClick = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("category", category);
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
  };

  const clearCategory = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('category');
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);
  };

  return (
    <Container maxWidth="lg">
      <BlogListHeader 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange}
      />
      
      <MobileCategoryChip 
        category={currentCategory}
        onClear={clearCategory}
      />
      
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }} sx={{ order: { xs: 2, md: 1 } }}>
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

        <Grid size={{ xs: 12, md: 9 }} sx={{ order: { xs: 1, md: 2 } }}>
          <Box>
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <BlogEntry
                  key={post.id}
                  post={post}
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

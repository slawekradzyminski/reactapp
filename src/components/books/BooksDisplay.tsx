import React, { useState } from 'react';
import books from '../../data/books';
import Tags from '../../data/tags';
import TagList from './TagList';
import BookCard from './BookCard';

const BooksDisplay: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState([Tags.StaffEngineering]);

  const handleTagClick = (tag: Tags) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [tag, ...prev];
      }
    });
  };

  const filteredBooks = books.filter(book => book.tags.some(tag => selectedTags.includes(tag)))
    .sort((a, b) => {
      const maxIndexA = Math.min(...a.tags.map(tag => selectedTags.indexOf(tag)));
      const maxIndexB = Math.min(...b.tags.map(tag => selectedTags.indexOf(tag)));
      return maxIndexA - maxIndexB;
    });

  return (
    <div>
      <TagList tags={Array.from(new Set(books.flatMap(book => book.tags)))} selectedTags={selectedTags} onTagClick={handleTagClick} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
        {filteredBooks.map((book) => (
          <BookCard key={book.title} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BooksDisplay;
import React from 'react';
import { Chip } from '@mui/material';
import Tags from '../../data/tags';

interface TagListProps {
    tags: Tags[];
    selectedTags: Tags[];
    onTagClick: (tag: Tags) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, selectedTags, onTagClick }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '20px', marginTop: '20px' }}>
            {tags.map(tag => (
                <Chip
                    key={tag}
                    label={tag}
                    onClick={() => onTagClick(tag)}
                    color={selectedTags.includes(tag) ? 'primary' : 'default'}
                />
            ))}
        </div>
    );
};

export default TagList;
import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const COMMENTBOX_PROJECT_ID = '5697635910418432-proj';

interface BlogCommentsProps {
  postId: string;
}

declare global {
  interface Window {
    commentBox: any;
  }
}

const BlogComments = ({ postId }: BlogCommentsProps) => {
  useEffect(() => {
    const scriptEl = document.createElement('script');
    scriptEl.async = true;
    scriptEl.src = 'https://unpkg.com/commentbox.io/dist/commentBox.min.js';
    
    let removeCommentBox: (() => void) | undefined;
    
    scriptEl.onload = () => {
      removeCommentBox = window.commentBox(COMMENTBOX_PROJECT_ID, {
        className: 'commentbox',
        defaultBoxId: postId,
        backgroundColor: null,
        textColor: null,
        subtextColor: null,
        createBoxUrl(boxId: string, pageLocation: Location) {
          pageLocation.search = ''; 
          pageLocation.hash = boxId; 
          return pageLocation.href;
        }
      });
    };
    
    document.body.appendChild(scriptEl);

    return () => {
      if (removeCommentBox) {
        removeCommentBox();
      }
      if (scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
    };
  }, [postId]);

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <div className="commentbox" id={postId} />
      <noscript>
        <Typography color="error">
          Please enable JavaScript to view the comments.
        </Typography>
      </noscript>
    </Box>
  );
};

export default BlogComments; 
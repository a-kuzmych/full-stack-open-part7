import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Link,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material'

const Blog = ({ blog, addLikes, deleteBlog, addComment, user }) => {
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  if (!blog) {
    return null
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user?.id || blog.user
    }

    addLikes(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    deleteBlog(blog.id)
    navigate('/')
  }

  const handleComment = async (event) => {
    event.preventDefault()
    if (!comment.trim()) {
      return
    }

    await addComment(blog.id, comment)
    setComment('')
  }

  return (
    <Card
      sx={{
        mt: 3,
        mb: 3,
        border: '1px solid #e0e0e0',
        boxShadow: 1,
        borderRadius: 1
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {blog.title}
        </Typography>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          by {blog.author}
        </Typography>

        <Box sx={{ mb: 1 }}>
          <Link
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            {blog.url}
          </Link>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Added by {blog.user?.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {blog.likes} likes
          </Typography>

          {user && (
            <Button variant="outlined" size="small" onClick={handleLike}>
              LIKE
            </Button>
          )}

          {user && blog.user?.username === user.username && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={handleDelete}
            >
              REMOVE
            </Button>
          )}
        </Box>

        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            comments
          </Typography>

          <Box
            component="form"
            onSubmit={handleComment}
            sx={{ display: 'flex', gap: 1, mb: 2 }}
          >
            <TextField
              label="comment"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              size="small"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ whiteSpace: 'nowrap' }}
            >
              add comment
            </Button>
          </Box>

          <List
            disablePadding
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            {(blog.comments || []).map((c, index) => (
              <Box key={index}>
                {index > 0 && <Divider />}
                <ListItem sx={{ py: 1 }}>
                  <ListItemText primary={c} />
                </ListItem>
              </Box>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Blog

import { Link } from 'react-router-dom'
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import Notification from './Notification'

const Bloglist = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}
      >
        Blogs
      </Typography>

      <Notification />
      <Paper sx={{ boxShadow: 2, borderRadius: 2 }}>
        <List>
          {sortedBlogs.map((blog) => (
            <ListItem key={blog.id} divider>
              <ListItemText
                primary={
                  <Link
                    to={`/blogs/${blog.id}`}
                    style={{
                      textDecoration: 'none',
                      color: '#1976d2',
                      fontWeight: 500
                    }}
                  >
                    {blog.title}
                  </Link>
                }
                secondary={`by ${blog.author}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  )
}

export default Bloglist

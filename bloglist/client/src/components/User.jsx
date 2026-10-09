import { useEffect } from 'react'
import { useUserActions, useUsers } from '../UserStore'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
} from '@mui/material'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const users = useUsers()
  const { initializeUsers } = useUserActions()
  const user = users.find((candidate) => candidate.id === id)

  useEffect(() => {
    if (users.length === 0) {
      initializeUsers()
    }
  }, [initializeUsers, users.length])

  if (!user) {
    return null
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 2 }}>
        {user.name}
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 1 }}>
        added blogs
      </Typography>
      <Paper variant="outlined" sx={{ borderRadius: 2 }}>
        <List disablePadding>
          {user.blogs.map((blog, index) => (
            <ListItem
              key={blog.id}
              divider={index < user.blogs.length - 1}
              sx={{ py: 1.5, px: 2 }}
            >
              <ListItemText primary={blog.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default User

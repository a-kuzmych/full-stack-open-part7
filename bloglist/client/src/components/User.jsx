import { useEffect } from 'react'
import { useUserActions, useUsers } from '../UserStore'
import { Typography, List, ListItem, ListItemText } from '@mui/material'
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
    <div>
      <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 2 }}>
        {user.name}
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1 }}>
        added blogs
      </Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id} dense disablePadding>
            <ListItemText primary={blog.title} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default User

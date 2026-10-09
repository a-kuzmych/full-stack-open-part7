import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Paper,
  Chip,
} from '@mui/material'
import { useUserActions, useUsers } from '../UserStore'

const Userlist = () => {
  const users = useUsers()
  const { initializeUsers } = useUserActions()

  useEffect(() => {
    initializeUsers()
  }, [initializeUsers])

  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}
      >
        Users
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Browse users and the blogs they have created.
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 2, borderRadius: 2, overflow: 'hidden' }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'action.hover' }}>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell sx={{ fontWeight: 500 }}>
                  <Link
                    to={`/users/${user.id}`}
                    style={{
                      textDecoration: 'none',
                      color: '#1976d2',
                      fontWeight: 500,
                    }}
                  >
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Chip
                    label={user.blogs.length}
                    size="small"
                    color={user.blogs.length > 0 ? 'primary' : 'default'}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Userlist

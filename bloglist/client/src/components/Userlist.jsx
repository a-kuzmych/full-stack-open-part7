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
      <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{fontWeight: 'bold', backgroundColor: '#f5f5f5'}}>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
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
                  {user.blogs.length}
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

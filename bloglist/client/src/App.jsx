import { useState, useEffect } from 'react'
import {
  Routes,
  Route,
  Link,
  Navigate,
  useMatch,
  useNavigate
} from 'react-router-dom'
import '../index.css'
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material'
import Bloglist from './components/Bloglist'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Userlist from './components/Userlist'
import User from './components/User'
import PageNotFound from './components/PageNotFound'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorBoundary from './components/ErrorBoundary'
import { useNotificationActions } from './NotificationStore'
import { useBlogs, useBlogActions } from './BlogStore'
import { useUser, useUserActions } from './UserStore'

const App = () => {
  const blogs = useBlogs()
  const { initialize, create, update, remove } = useBlogActions()
  const user = useUser()
  const { initialize: initializeUser, setUser, clearUser } = useUserActions()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { showNotification } = useNotificationActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = initializeUser()
    if (storedUser) {
      blogService.setToken(storedUser.token)
    }
  }, [initializeUser])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username, password })
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
      setUsername('')
      setPassword('')
    } catch {
      clearUser()
      showNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    clearUser()
    navigate('/')
  }

  const addBlog = async (blogObject) => {
    const createdBlog = await create(blogObject)

    showNotification(
      `a new blog ${createdBlog.title} by ${createdBlog.author} added`
    )
  }

  const addLikes = async (blogId, updatedBlog) => {
    await update(blogId, updatedBlog)
  }

  const deleteBlog = async (blogId) => {
    const blogToRemove = blogs.find((b) => b.id === blogId)
    if (
      window.confirm(
        `Remove blog "${blogToRemove.title}" by ${blogToRemove.author}?`
      )
    ) {
      await remove(blogId)
      showNotification(`Blog "${blogToRemove.title}" removed successfully`)
    }
  }

  const match = useMatch('/blogs/:id')

  const blogToShow = match
    ? blogs.find((blog) => blog.id === match.params.id)
    : null

  return (
    <Container>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          {user && (
            <>
              <Button color="inherit" component={Link} to="/users">
                users
              </Button>
              <Button color="inherit" component={Link} to="/create">
                create new
              </Button>
            </>
          )}
          {user ? (
            <span>
              <Button color="inherit" onClick={handleLogout}>
                logout
              </Button>
            </span>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <Bloglist
                blogs={blogs}
                addBlog={addBlog}
                addLikes={addLikes}
                deleteBlog={deleteBlog}
                user={user}
              />
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate replace to="/" />
              ) : (
                <LoginForm
                  username={username}
                  password={password}
                  handleUsernameChange={({ target }) =>
                    setUsername(target.value)
                  }
                  handlePasswordChange={({ target }) =>
                    setPassword(target.value)
                  }
                  handleSubmit={handleLogin}
                />
              )
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blog={blogToShow}
                addLikes={addLikes}
                deleteBlog={deleteBlog}
                user={user}
              />
            }
          />
          <Route path="/create" element={<BlogForm createBlog={addBlog} />} />
          <Route path="/users" element={<Userlist />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App

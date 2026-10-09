import { create } from 'zustand'
import blogService from './services/blogs'

const useBlogStore = create((set) => ({
  blogs: [],
  actions: {
    initialize: async () => {
      const blogs = await blogService.getAll()
      set({ blogs })
    },
    create: async (blogObject) => {
      const createdBlog = await blogService.create(blogObject)
      set((state) => ({ blogs: state.blogs.concat(createdBlog) }))
      return createdBlog
    },
    update: async (blogId, updatedBlog) => {
      const returnedBlog = await blogService.update(blogId, updatedBlog)
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog.id === blogId ? { ...returnedBlog, user: blog.user } : blog,
        ),
      }))
    },
    remove: async (blogId) => {
      await blogService.remove(blogId)
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog.id !== blogId),
      }))
    },
    addComment: async (blogId, comment) => {
      const updatedBlog = await blogService.addComment(blogId, comment)
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog.id === blogId
            ? { ...blog, comments: updatedBlog.comments }
            : blog,
        ),
      }))
    },
  },
}))

export const useBlogs = () => useBlogStore((state) => state.blogs)
export const useBlogActions = () => useBlogStore((state) => state.actions)

import { Alert } from '@mui/material'
import { useNotification, useNotificationType } from '../NotificationStore'

const Notification = () => {
  const message = useNotification()
  const type = useNotificationType()

  if (!message) {
    return null
  }

  const alertSeverity =
    type === 'error' || type === 'success' ? type : 'info'

  return (
    <Alert severity={alertSeverity} sx={{ mb: 2 }}>
      {message}
    </Alert>
  )
}

export default Notification
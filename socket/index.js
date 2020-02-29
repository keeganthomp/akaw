import io from 'socket.io-client'
const socket = io('http://localhost:9000')
import { addNotification } from '../actions/notificaitonActions'

socket.connect()

export const createSocketConsumers = ({ store }) => {
  socket.on('recieveMessage', message => {
    store.dispatch(addNotification({ type: 'message', content: message }))
  })
}

export default socket

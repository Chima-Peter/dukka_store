import { MessagesType } from "../../../../types/profile"
import EmptyMessageBox from "./empty_messages"
import MessagesLarge from "./messages_large"

// this component decides what message component to display
const MessageDecider = ({ messages, setStep }: { messages: MessagesType[], setStep: React.Dispatch<React.SetStateAction<number>> }) => {
  if (messages.length > 0) {
    return <MessagesLarge messages={messages} />
  }
  return <EmptyMessageBox setStep={setStep} />
}

export default MessageDecider
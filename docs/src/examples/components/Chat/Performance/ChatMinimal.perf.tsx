import { Chat } from '@fluentui/react'
import * as React from 'react'

const ChatMinimalPerf = () => <Chat />

ChatMinimalPerf.iterations = 5000
ChatMinimalPerf.filename = 'ChatMinimal.perf.tsx'

export default ChatMinimalPerf

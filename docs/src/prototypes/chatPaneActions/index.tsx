import {
  Avatar,
  Chat,
  menuAsToolbarBehavior,
  Button,
  ChatMessageProps,
  Ref,
} from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'

type EventSource = null | 'button' | 'mouse' | 'focus'

const avatars = {
  ade:
    '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',
}

const janeAvatar = {
  image: `data:image/jpeg;base64,${avatars.ade}`,
  status: { color: 'green', icon: 'stardust-checkmark' },
}

const popoverBehavior = (shouldFocusOnMount: boolean) => (props: any) => {
  const behavior = menuAsToolbarBehavior(props)
  behavior.focusZone.props.defaultTabbableElement = (root: HTMLElement): HTMLElement => {
    return root.querySelector('[aria-label="Emoji"]')
  }
  behavior.focusZone.props.shouldFocusOnMount = shouldFocusOnMount
  return behavior
}

const getPopoverItems = () => {
  return [
    { key: 'emoji', icon: 'emoji', 'aria-label': 'Emoji' },
    { key: 'like', icon: 'like', 'aria-label': 'Like' },
    {
      key: 'more',
      icon: 'more',
      'aria-label': 'More options',
      menu: ['Save', 'Edit', { content: 'Remove', menu: ['1', '2', '3'] }],
    },
  ]
}

const actionMenu = (
  showPopover: EventSource,
  setShowPopover: React.Dispatch<React.SetStateAction<EventSource>>,
  buttonRef: React.MutableRefObject<HTMLElement>,
) => {
  console.log(`show popover variable: ${showPopover}`)
  return render =>
    render(
      {
        'data-is-focusable': showPopover !== 'button',
        accessibility: popoverBehavior(showPopover === 'button'),
        iconOnly: true,
        items: showPopover && getPopoverItems(),
      },
      (C, props) =>
        !showPopover || showPopover === 'button' ? (
          <div>
            <Ref innerRef={buttonRef}>
              <Button
                data-is-focusable={false}
                aria-expanded={!!showPopover}
                tabIndex={-1}
                aria-label="Open actions toolbar"
                onClick={() => setShowPopover('button')}
                iconOnly
                styles={{ opacity: 0, width: '0px', height: '0px' }}
              />
            </Ref>
            {!!showPopover && <C {...props} />}
          </div>
        ) : (
          <C {...props} />
        ),
    )
}

const CustomMessage = (props: ChatMessageProps) => {
  const [showPopover, setShowPopover] = React.useState<EventSource>(null)
  const [triggerEvent, setTriggerEvent] = React.useState<EventSource>(null)
  const buttonRef = React.useRef<HTMLElement>()
  const messageRef = React.useRef<HTMLElement>()
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    console.log('currentTarget:')
    console.log(e.currentTarget)
    console.log('relatedTarget:')
    console.log(e.relatedTarget)
    const messageElement = e.currentTarget as HTMLElement
    const nextFocusedElement = e.relatedTarget as HTMLElement
    const shouldPreserveFocusState = messageElement.contains(nextFocusedElement)
    // when voiceOver keys are used then 'relatedTarget' is null
    if (!nextFocusedElement) {
      return
    }
    if (!shouldPreserveFocusState) {
      hide('focus')
    }
  }
  const show = (es: EventSource, event: React.SyntheticEvent<HTMLElement, Event>) => {
    console.log(`event source: ${es}`)

    if (event && event.target && es === 'focus') {
      const targetElement = event.target as HTMLElement
      if (!targetElement.matches(`.${Chat.Message.className}`)) {
        console.log('not on message element, return')
        return
      }
    }

    if (triggerEvent === null) {
      setTriggerEvent(es)
    }
    setShowPopover(es)
  }
  const hide = (es: EventSource) => {
    // if the popover was open by focus, it can be closed only by focus
    if (triggerEvent === 'focus' && es !== 'focus') {
      return
    }
    // WARNING: do not use global document
    if (messageRef.current) {
      const maybeActionMenu = messageRef.current.querySelector(
        `.${Chat.Message.slotClassNames.actionMenu}`,
      )
      if (maybeActionMenu && maybeActionMenu.contains(document.activeElement)) {
        // do not hide popover if it is focused
        return
      }
    }
    setTriggerEvent(null)
    setShowPopover(null)
  }
  return (
    <Ref innerRef={messageRef}>
      <Chat.Message
        // role and aria-roledescription is necessary for VoiceOver keys navigation
        role="group"
        aria-roledescription="message" // this needs to be translated
        {...props}
        onFocus={e => handleFocusOnMessage(show, e)}
        onBlur={handleBlur}
        onMouseEnter={e => show('mouse', e)}
        onMouseLeave={() => hide('mouse')}
        actionMenu={actionMenu(showPopover, setShowPopover, buttonRef)}
      />
    </Ref>
  )
}

const handleFocusOnMessage = (show, e) => {
  console.log(`onFocus called on message`)
  show('focus', e)
}

const ChatPaneActions = () => {
  return (
    <div>
      <Chat
        items={_.times(30, i => ({
          key: `a${i}`,
          message: (
            <CustomMessage
              author="Jane Doe"
              aria-labelledby={`message-conent-${i}`}
              content={
                <div id={`message-conent-${i}`}>
                  {`${i}: `}
                  Stardust UI provides extensible vanilla JavaScript solutions to component state,
                  styling, and accessibility. These powerful features are exposed behind simple APIs
                  based on natural language. Stardust UI React is being built as an exemplar of the
                  Stardust UI design language, component specifications, and utilities.
                  <a href="/">Link</a>Hover me to see the actions <a href="/">Some Link</a>
                </div>
              }
              timestamp="Yesterday, 10:15 PM"
            />
          ),
          gutter: <Avatar {...janeAvatar} />,
        }))}
      />
    </div>
  )
}
export default ChatPaneActions
import React, { FC } from 'react'
import './popup.css'

interface Props {
    status: 'success' | 'error' | null
    message: string
    onClose: () => void
}

export const Popup: FC<Props> = ({ status, message, onClose }) => {
    React.useEffect(() => {
        const handleBackButton = (event: Event) => {
            const keyboardEvent = event as KeyboardEvent
            if (keyboardEvent.key === 'Backspace') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleBackButton)

        return () => {
            window.removeEventListener('keydown', handleBackButton)
        }
    }, [onClose])

    return (
        <div className={`popup ${status}`}>
            <p>{message}</p>
            <button onClick={onClose}>Назад</button>
        </div>
    )
}

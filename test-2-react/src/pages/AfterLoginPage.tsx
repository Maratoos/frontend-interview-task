import React from 'react'
import { Route, Switch, useHistory } from 'react-router'
import { Popup } from '../layout/Popup/Popup'

export const AfterLoginPage = () => {
    const [requestStatus, setRequestStatus] = React.useState<'success' | 'error' | null>(null)
    const [message, setMessage] = React.useState<string>('')
    const history = useHistory()
    const email = sessionStorage.getItem('userEmail')

    const handleConfirm = async () => {
        try {
            const response = await fetch('http://localhost:4040/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            if (response.ok) {
                setRequestStatus('success')
                setMessage('Success!')
            }
        } catch (error) {
            setRequestStatus('error')
            setMessage('Error!')
        }
    }

    return (
        <Switch>
            <Route>
                <div>
                    <div>
                        <span>Email</span>
                        <div>
                            <p>{email ? email : 'Check if Email is valid'}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button className="btn mt-auto" onClick={() => history.push('/login/step-1')}>
                            Back
                        </button>
                        <button onClick={handleConfirm} className="btn btn-primary mt-auto ml-4">
                            Confirm
                        </button>
                    </div>
                </div>
                {requestStatus && (
                    <Popup status={requestStatus} message={message} onClose={() => setRequestStatus(null)} />
                )}
            </Route>
        </Switch>
    )
}

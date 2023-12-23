import { Redirect, Route, useHistory } from 'react-router'
import { LoginPage } from './pages/LoginPage'
import { AfterLoginPage } from './pages/AfterLoginPage'

export default function App() {
    const history = useHistory()

    if (history.location.pathname === '/') {
        history.push('/login/step-1')
    }

    return (
        <>
            <header className="h-20 bg-primary flex items-center p-4">
                <h1 className="text-3xl text-black">Title</h1>
            </header>
            <main className="flex flex-col p-4 h-full">
                <Route path="/login/step-1" component={LoginPage} />
                <Route path="/login/step-2" component={AfterLoginPage} />
            </main>
        </>
    )
}

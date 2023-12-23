import React from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router'
import { FormInput } from '../layout/FormInput'
import { FormCheckBox } from '../layout/FormCheckBox'
import { isValidEmail } from '../hooks/validEmail'

export const LoginPage = () => {
    const [userEmail, setUserEmail] = React.useState<string>(() => {
        const savedEmail = sessionStorage.getItem('userEmail')
        return savedEmail && isValidEmail(savedEmail) ? savedEmail : ''
    })
    const [isAgreed, setIsAgreed] = React.useState<boolean>(false)
    const [isHolding, setIsHolding] = React.useState<boolean>(false)
    const [elapsedTime, setElapsedTime] = React.useState<number>(0)
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null)
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
    const isButtonDisabled = !isValidEmail(userEmail) || !isAgreed
    const history = useHistory()

    const handleMouseDown = () => {
        setIsHolding(true)

        // При новом нажатии очищаю ref для отсчета назад
        if (timeoutRef.current) {
            clearInterval(timeoutRef.current)
            timeoutRef.current = null
        }

        //При зажатии запускаю таймер
        intervalRef.current = setInterval(() => {
            setElapsedTime((prevTime) => prevTime + 100)
        }, 100)
    }

    const handleMouseUp = () => {
        setIsHolding(false)
        //Как только кнопка перестает зажиматься очищаю ref таймера
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        if (elapsedTime < 500) {
            // Если прошло меньше 500мс то запускаю обратный отсчет
            timeoutRef.current = setInterval(() => {
                setElapsedTime((prevTime) => Math.max(prevTime - 100, 0))
            }, 100)
        }

        // Также вариант с переходом на следующую страницу только когда юзер отпустил кнопку
        // if (elapsedTime >= 500) {
        //   history.push("/login/step-2")
        // } else {
        //   // Если прошло меньше 500мс то запускаю обратный отсчет
        //   timeoutRef.current = setInterval(() => {
        //     setElapsedTime((prevTime) => Math.max(prevTime - 100, 0))
        //   }, 100)
        // }
    }

    React.useEffect(() => {
        //Если введен валидный емайл я сразу же сохраняю его в сессионное хранилище
        if (isValidEmail(userEmail)) {
            sessionStorage.setItem('userEmail', userEmail)
        }
    }, [userEmail])

    //   Автоматический вариант, если прошло 500мс то сразу же перекидывает на след страницу
    React.useEffect(() => {
        //если прошло 500мс или больше то перекидываю автоматически на след страницу
        if (elapsedTime >= 500) {
            history.push('/login/step-2')
        }
    }, [elapsedTime])

    return (
        <>
            <Switch>
                <Route>
                    <FormInput userEmail={userEmail} setUserEmail={setUserEmail} />
                    <div className="p-1"></div>
                    <FormCheckBox isAgreed={isAgreed} setIsAgreed={setIsAgreed} />
                    <button
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        disabled={isButtonDisabled}
                        className="btn btn-primary mt-auto"
                    >
                        {isHolding || elapsedTime !== 0 ? `Holding (${elapsedTime} ms)` : 'Hold to proceed'}
                    </button>
                </Route>
                <Route>Not implemented</Route>
            </Switch>
        </>
    )
}

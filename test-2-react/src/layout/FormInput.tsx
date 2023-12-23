import React from 'react'
import { isValidEmail } from '../hooks/validEmail'

interface Props {
    userEmail: string
    setUserEmail: React.Dispatch<React.SetStateAction<string>>
}

export const FormInput: React.FC<Props> = ({ userEmail, setUserEmail }) => {
    const validEmail = !isValidEmail(userEmail)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserEmail(e.target.value)
    }

    return (
        <label className="form-control">
            <div className="label">
                <span className="label-text">Email</span>
            </div>
            <input
                required
                value={userEmail}
                onChange={handleChange}
                type="text"
                placeholder="Type here"
                className="input"
            />
            {userEmail.length > 0 && validEmail && (
                <div className="label">
                    <span className="label-text-alt">Введите валидный Email</span>
                </div>
            )}
        </label>
    )
}

import React from 'react'

interface Props {
    isAgreed: boolean
    setIsAgreed: React.Dispatch<React.SetStateAction<boolean>>
}

export const FormCheckBox: React.FC<Props> = ({ isAgreed, setIsAgreed }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setIsAgreed(e.target.checked)
    }
    return (
        <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
                <input
                    checked={isAgreed}
                    onChange={handleChange}
                    type="checkbox"
                    className="checkbox checkbox-primary"
                />
                <span className="label-text">I agree</span>
            </label>
        </div>
    )
}

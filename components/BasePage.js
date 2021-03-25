import React from 'react'

export default function BasePage(props) {
    const {className, children} = props
    return (
        <div className={`base-page ${className}`}>
            {children}
        </div>
    )
}

import React from 'react'

const Test = (props) => {

    return (
        <>
            <div className="product-wrap">
                TEst page
            </div>
        </>

    )
}

Test.getInitialProps = async (ctx) => {
    if (typeof window === 'undefined') {
        console.log('SSR')
    } else {
        console.log('Client Side')
        return {}
    }

    return {}
}

export default Test
function Error({statusCode}) {
    return (
        <p>
            {statusCode
                ? `An error ${statusCode} occurred on server`
                : 'متاسفانه با خطایی مواجه شدیم. لطفا صفحه را تازه سازی کنید.'}
        </p>
    )
}

Error.getInitialProps = ({res, err}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return {statusCode}
}

export default Error
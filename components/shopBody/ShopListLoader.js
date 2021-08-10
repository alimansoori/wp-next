import PropagateLoader from 'react-spinners/PropagateLoader'

export default function ShopListLoader () {
    return (
        <div className="d-flex justify-content-center bd-highlight mb-3">
            <PropagateLoader
                loading={true}
                color="rgb(0, 114, 187)"
            />
        </div>
    )
}
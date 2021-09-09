import ReactSlidy from 'react-slidy'

function Slider({gallery}) {
    return (
        <ReactSlidy>
            {
                gallery?.map((img) => (
                    <img style={{height: "400px", width: "400px"}} src={img.sourceUrl} alt={img.altText}/>
                ))
            }
        </ReactSlidy>
    )
}

export default Slider
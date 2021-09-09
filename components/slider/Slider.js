import ReactSlidy from 'react-slidy'

function Slider({gallery}) {
    return (
        <ReactSlidy>
            {
                gallery?.map((img) => (
                    <img style={{maxHeight: "400px", maxWidth: "400px"}} src={img.sourceUrl} alt={img.altText}/>
                ))
            }
        </ReactSlidy>
    )
}

export default Slider
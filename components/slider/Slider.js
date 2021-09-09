import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Slider({gallery}) {
    return (
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            interval={5000}
        >
            {
                gallery?.map((img) => (
                    <div>
                        <img style={{maxHeight: "400px", maxWidth: "400px"}} src={img.sourceUrl} alt={img.altText}/>
                        {/*<p className="legend">Legend 1</p>*/}
                    </div>
                ))
            }
        </Carousel>
    )
}

export default Slider
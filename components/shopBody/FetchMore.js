import {Accordion} from "react-bootstrap";

export default function ({onFetchMore}) {
    return (
        <div className="p-sug-show-more-wrap">
            <Accordion.Toggle as="div" variant="link" eventKey="1">
                <button onClick={onFetchMore} className="p-sug-show-more">
                    <div className="p-sug-show-more__title">{`نمایش بیشتر`}</div>
                    <div className="p-sug-show-more__icon">
                        <img
                            className="p-sug-show-more__icon__img"
                            src={`/image/icon/Group AD.png`}
                            alt="rect"
                        />
                    </div>
                </button>
            </Accordion.Toggle>
        </div>
    )
}
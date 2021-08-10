import {Dropdown} from "react-bootstrap";
import React from "react";

export default function ShopFilterDropDown({setSort, sortby}) {
    const sortData = [
        {
            key: 1,
            value: 'جدیدترین'
        }, {
            key: 2,
            value: 'قدیمی ترین'
        }, {
            key: 3,
            value: 'گران ترین'
        }, {
            key: 4,
            value: 'ارزان ترین'
        }, {
            key: 5,
            value: 'محبوب ترین'
        }
    ]

    return (
        <div className="search__body__main__header__filter">
            <Dropdown onSelect={(selectedKey) => setSort(selectedKey)}>
                <Dropdown.Toggle id="dropdown-basic">
                    {sortby ? (sortData.find(s => s.key === parseInt(sortby))).value : 'فیلترها'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {
                        sortData.map((sort, index) => (
                            <Dropdown.Item key={index} eventKey={sort.key}>{sort.value}</Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
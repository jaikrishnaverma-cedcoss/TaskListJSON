import React from 'react'

const SelectInput = ({onSelected , options , level}) => {
    if(options.length==0||options[0]==''||options==undefined||options[0]==undefined)
    return <p>NO DATA FOUND</p>
    return (
        <>
            <select name="" id="" onChange={(e)=>onSelected(e.target.value,level)}>
            <option key={"sda"} value="-1">--SELECT</option>
                {
                    options&&options.map(category => <option key={level+category} value={category}>{category}</option>)
                }
            </select>
        </>
    )
}

export default SelectInput
import React from 'react'

const SelectInput = ({onSelected , options , level}) => {
    console.log(options)
    return (
        <>
            <select name="" id="" onChange={(e)=>onSelected(e.target.value,level)}>
                {
                    options.map(category => <option value={category}>{category}</option>)
                }
            </select>
        </>
    )
}

export default SelectInput
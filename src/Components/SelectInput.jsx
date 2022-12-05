import React from 'react'

const SelectInput = ({onSelected , options , level , value}) => {
  
    if(options.length==0||options[0]==''||options==undefined||options[0]==undefined)
    return <p>NO DATA FOUND</p>
 
    return (<>
            <select name="" id="" onChange={(e)=>onSelected(e.target.value,level)}>
            <option key={"sda"} value="-1">--SELECT</option>
                {
                    options&&options.map((category,i) => {
                        return  (value[level]==category) 
                        ? <option  key={level+i+category} value={category} selected>{category}</option>
                        : <option  key={level+i+category} value={category}>{category}</option>})
                }
            </select>
        </>)
}

export default SelectInput
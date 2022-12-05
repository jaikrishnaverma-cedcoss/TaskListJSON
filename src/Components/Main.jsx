import React, { useState } from 'react'
import { data } from '../data'
import SelectInput from './SelectInput'
const Main = () => {
    
    const [state, setState] = useState((JSON.parse(localStorage.getItem("state"))!==null)?JSON.parse(localStorage.getItem("state")):{ optionData: [], tableData: [],showTable:[],selected:[]})
 
    // initial Table data 
    if(state.optionData.length==0){
        const category = []
        data.map(x => {
            if (category.indexOf(x.primary_category) == -1)
                category.push(x.primary_category)
        })
        state.optionData.push(category)
        setState({ ...state })   
    }

    // Make Search for Table data
    const searchFor = (value, level, previousArr = data) => {
        let CategoryArr = previousArr.filter(item => item[level] == value)
        return CategoryArr
    }

    // Make unique Options
    const optionsGenerator = (CategoryArr, level) => {
        (level == 0) ? level = 'category_1' : level = 'category_' + (level + 1)
        let unique = []
        CategoryArr.map(x => {
            if (unique.indexOf(x[level]) == -1) {
                unique.push(x[level]) }
        })
        return unique
    }

    // On select press
    const onSelected = (value, level) => {
        if(value=="-1")
        return ''
        let tmpLevel=(level == 0) ? "primary_category" : 'category_' + level
        state.tableData = searchFor(value, tmpLevel)
        if (state.optionData.length > level) {
            state.optionData.splice(level + 1)
            state.selected.splice(level)
            state.selected.push(value)
            state.optionData[level + 1] = optionsGenerator(state.tableData, level)
        }else{          
         state.optionData.push(optionsGenerator(state.tableData, level))
         state.selected.push(value) 
        }
         setState({ ...state })
    }

    return (
        <>
            <div className="main ">
                <div className="container brd">
                    <h1>Products</h1>
                    {
                        state.optionData && state.optionData.map((x, i) => <SelectInput key={x} onSelected={onSelected} options={x} level={i} value={state.selected}/>)
                    }
                    <button id="btn1" onClick={()=>{localStorage.setItem("state",JSON.stringify(state));setState({...state,showTable:[...state.tableData]});console.log("state",state)}}>
                        Save to Local Storage
                    </button>
                    <button onClick={()=>localStorage.setItem("state",JSON.stringify({ optionData: [], tableData: [],showTable:[],selected:[]}))}>
                        Clear Local Storage
                    </button>
                    <table>
                        <thead>
                            <tr>    
                                <th>Product Category</th>
                                <th>Category 1</th>
                                <th>Category 2</th>
                                <th>Category 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.showTable.map(x => <tr key={x.asin+x.img_source} ><td>{x.primary_category}</td><td>{x.category_1}</td>
                                    <td>{x.category_2}</td><td>{x.category_3}</td></tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Main
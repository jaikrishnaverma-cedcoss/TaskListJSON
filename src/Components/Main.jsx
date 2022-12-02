import React, { useEffect, useState } from 'react'
import { data } from '../data'
import SelectInput from './SelectInput'
const Main = () => {
    const [state, setState] = useState({ optionData: [], tableData: [] })

    // initial data 
    useEffect(() => {
        const category = []
        data.map(x => {
            if (category.indexOf(x.primary_category) == -1)
                category.push(x.primary_category)
        })
        state.optionData.push(category)
        setState({ ...state })
    }, [])

    // Make Search for Table data
    const searchFor = (value, level, previousArr = data) => {
        let CategoryArr = previousArr.filter(item => item[level] == value)
        return CategoryArr
    }

    // Make unique Options
    const secondSearch = (CategoryArr, level) => {
        (level == 0) ? level = 'category_1' : level = 'category_' + (level + 1)
        let unique = []
        CategoryArr.map(x => {
            if (unique.indexOf(x[level]) == -1) {
                unique.push(x[level])
            }
        })
        return unique
    }

    // On select press
    const onSelected = (value, level) => {
        if(value=="-1")
        return ''
        let tmpLevel
        (level == 0) ? tmpLevel = "primary_category" : tmpLevel = 'category_' + level
        state.tableData = searchFor(value, tmpLevel)
        if (state.optionData.length > level) {
            state.optionData.splice(level + 1)
            state.optionData[level + 1] = secondSearch(state.tableData, level)
        }
        else
            state.optionData.push(secondSearch(state.tableData, level))
        setState({ ...state })
    }
    
    return (
        <>
            <div className="main">
                <div className="container">
                    <h1>Products</h1>
                    {
                        state.optionData && state.optionData.map((x, i) => <SelectInput key={x} onSelected={onSelected} options={x} level={i} />)
                    }
                    <button>
                        Save
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
                                state.tableData.map(x => <tr key={x.asin+x.img_source} ><td>{x.primary_category}</td><td>{x.category_1}</td>
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
import React, { useEffect, useState } from 'react'
import { data } from '../data'
import SelectInput from './SelectInput'
const Main = () => {
    const [state, setState] = useState({ optionData: [],level:[""] })


    useEffect(() => {
        const category = []
        data.map(x => {
            if (category.indexOf(x.primary_category) == -1) {
                category.push(x.primary_category)
            }
        })
        state.optionData.push([category])
        setState({ ...state })
    }, [])


    const searchFor = (value, level, previousArr = data) => {

        console.log(previousArr,value)
        let CategoryArr = previousArr.filter(item =>item[level] == value)

     
        return CategoryArr
    }
    const secondSearch=(CategoryArr,level)=>{
        (level == "primary_category") ? level = 'category_1' : level = 'category_' + (level + 1)
    
       let unique = []
       CategoryArr.map(x => {
             if (unique.indexOf(x[level]) == -1) {
                 unique.push(x[level])
             
             }
         })
         return unique
    }

    const onSelected = (value, level) => {
        (level == 0) ? level = "primary_category" : level = 'category_' + level
        state.tableData = searchFor(value, level)
        state.optionData.push(secondSearch(state.tableData,level))
        level++
        
        setState({ ...state })
    }
    console.log(state)
    return (
        <>
            <div className="main">
                <div className="container">
                    <h1>Products</h1>
                    {
                        state.optionData[0]&&state.level.map((x,i)=><SelectInput onSelected={onSelected} options={state.optionData[i]} level={i} />)
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

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Main
import React from 'react'
import './ColumnChart.css'

const UIObj = [
    { label: 'week1', tasks: [1, 2, 3, 4], maxLength: 9 },
    { label: 'week2', tasks: [1, 2, 3, 4, 5, 6], maxLength: 9 },
    { label: 'week3', tasks: [1, 2], maxLength: 9 },
    { label: 'week4', tasks: [], maxLength: 9 },
    { label: 'week5', tasks: [1, 2, 3, 4, 5, 6, 7, 8, 9], maxLength: 9 }, { label: 'week1', tasks: [1, 2, 3, 4], maxLength: 9 },
    { label: 'week2', tasks: [1, 2, 3, 4, 5, 6], maxLength: 9 },




];


const ColumnChart = () => {
    return (
        <div className="columnchart">
            {
                UIObj.map((column, index) => {

                    return (
                        <div className='columnchart__column' style={{
                            height: `${(column.tasks.length / column.maxLength) * 90}%`,
                            maxwidth: `${35}%`
                        }}>
                            <div key={index + 'col'} className='columnchart__innerColumn' >
                                {column.tasks.length > 0 ? column.tasks.length : null}
                            </div>
                            <div className='columnchart__label'>
                                {column.label}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default ColumnChart
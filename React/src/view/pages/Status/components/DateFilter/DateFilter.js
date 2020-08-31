import React, { useState } from 'react'
import './DateFilter.css'


export default function DateFilter({ onDateFilterClick }) {
    const [CurrentstartDate, setCurrentStartDate] = useState('');
    const [CurrentEndtDate, setCurrentEndDate] = useState('');
    return (
        <div className="Date-Filter">
            <input type="date" name="startDate" onChange={e => setCurrentStartDate(e.target.value)} />
            <input type="date" name="endDate" onChange={e => setCurrentEndDate(e.target.value)} />
            <input type="submit" className="submitButton"
                onClick={() => onDateFilterClick(CurrentstartDate, CurrentEndtDate)}
            />
        </div>
    );
}
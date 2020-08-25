import React from 'react';

import './MainPage.css';

export default () => {

    return (

        <div className='MainForm'>

            <div className="MainForm__status">
                <button className="MainForm__status--btn"> Status </button>
            </div>

            <div className="MainForm__analytics">
                <button className="MainForm__analytics--btn"> Analytics </button>
            </div>



            <div className="MainForm__changesOfJiraTickets">

                <button className="MainForm__changesOfJiraTickets--btn" onClick={() => {
                    // history.push('/aa')
                }}>   Changes Of Jira Tickets  </button>
            </div>

            <div className="MainForm__ModificationByField">
                <button className="MainForm__ModificationByField--btn"> Changes Of Jira Tickets</button>
            </div>

            <div className="MainForm__DeletedJiraTickets">
                <button className="MainForm__DeletedJiraTickets--btn"> Deleted Of Jira Tickets</button>
            </div>

            <div className="MainForm__DelaysInDelievry">
                <button className="MainForm__DelaysInDelievry--btn"> Delays Of Jira Tickets</button>
            </div>
        </div>
    )
}
import React from 'react';
import "./DashBoardCard.css";


function DashBoardCard({cardsContentItem}) {
    console.log(cardsContentItem)
    return (
        <div>
            
                
                 <div className="DashBoard__Card">
                        <h2 className="DashBoard__CardTitle">{cardsContentItem.name}</h2>
                        <h5 className="DashBoard__CardContent">{cardsContentItem.number}</h5>
                    </div>
                   
                
            
        </div>
    )
}

export default DashBoardCard;
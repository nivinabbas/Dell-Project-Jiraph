import React from 'react';
import "./DashBoardCard.css";
const array = [{ name: "functional tests", number: 12 }, { name: "fix versions", number: 10 },
{ name: "deleted tasks", number: 20 }, { name: "total tasks", number: 36 }];
function DashBoardCard(props) {
    return (
        <div>
            {
                array.map((e,index) => {
                   return(<div className="DashBoard__Card">
                        <h2 className="DashBoard__CardTitle">{e.name}</h2>
                        <h5 className="DashBoard__CardContent">{e.number}</h5>
                    </div>
                   )
                })
            }
        </div>
    )
}

export default DashBoardCard;
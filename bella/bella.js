/**
 * @author Marshood Ayoub <Marshood.ayoub@gmail.com>
 * @data 25/08/2020
 */

const fetch = require('node-fetch');

const Data = [
    {
        "diffItem": {
            "updateTime": 1600140853, 
            "type": "Updated", 
            "updatedFields": [
                {
                    "fieldName": "qaFeatureOwner", 
                    "newValue": null, 
                    "oldValue": "jbird"
                }
            ]
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Implementing", 
            "qaRepresentative": "Konstantin.Sidorenko2@emc.com", 
            "name": "CP - Improve Performance by Leveraging CPU Cores on Both Nodes (CP DNA)", 
            "parentId": "TRII-106", 
            "functionalTest": false, 
            "type": "Feature", 
            "id": "TRIF-800", 
            "fixVersion": "Foothills Prime"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "2060"
        }
    }
]

async function sendbellaData() {
    await fetch('http://localhost:4000/api/PostBellaData/GetBellaData', {
        method: 'post',
        body: JSON.stringify({
            Data
        }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(json => console.log("answer :", json));
}
sendbellaData(); 
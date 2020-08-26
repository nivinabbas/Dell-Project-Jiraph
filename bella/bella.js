/**
 * @author Marshood Ayoub <Marshood.ayoub@gmail.com>
 * @data 25/08/2020
 */

const fetch = require('node-fetch');
const Data=[
    
        {
            "jiraItem": {
                "jiraId": "TRIES-43173",
                "jiraName": "PSI 42: SAR Support for FHC FSCK",
                "jiraType": "Epic",
                "priority": "P00",
                "status": "Funnel",
                "specialFields": {
                    "jiraParentId": "TRIES-21957",
                    "functionalTest": true,
                    "qaRepresentative": "Morad",
                    "fixVersion": "Foothills V1.1.0 (Core)"
                }
            },
            "qcItem": {
                "requirmentId": "Epic",
                "requirementType": "2284",
                 "status": "Blocked"                
            },
            "diffItem": {
                "type": "Delete",
                "updatedTime": new Date(),
                 "updatedField":{
                     "fieldName":"fixVersion",
                     "oldValue":"oldValue",
                     "newValue":"newValue"
                 }
            }
        }
]
const key = "QYZNRVlzTAzJjWJLxobY24hGYcoclsaf4ZX5BLhGSi0Xa4cMC1APBoN";
async function sendbellaData() {
    await fetch('http://localhost:4000/api/PostBellaData/GetBellaData', {
        method: 'post',
        body: JSON.stringify({
            key, Data
        }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(json => console.log("answer :", json));
}
sendbellaData(); 
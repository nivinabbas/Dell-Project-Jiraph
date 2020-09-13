/**
 * @author Marshood Ayoub <Marshood.ayoub@gmail.com>
 * @data 25/08/2020
 */

const fetch = require('node-fetch');

const Data = [
    {
        "diffItem": {
            "updateTime": 1599969017, 
            "type": "Updated", 
            "updatedFields": [
                {
                    "fieldName": "qaFeatureOwner", 
                    "newValue": null, 
                    "oldValue": "rajagr2"
                }
            ]
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Done", 
            "qaRepresentative": "rajasekaran.rajagopal@emc.com", 
            "name": "Appliance capacity metrics availability when DP is OOS", 
            "parentId": "TRII-106", 
            "functionalTest": false, 
            "type": "Feature", 
            "id": "TRIF-925", 
            "fixVersion": "Smuttynose-SP3"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "2144"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599969018, 
            "type": "Updated", 
            "updatedFields": [
                {
                    "fieldName": "qaFeatureOwner", 
                    "newValue": null, 
                    "oldValue": "krishanu_dhar"
                }
            ]
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Done", 
            "qaRepresentative": "Krishanu_Dhar@Dell.com", 
            "name": "Orchestrated disruptive migration (Agent-less DT) for current supported source arrays and XtremIO", 
            "parentId": "TRII-73", 
            "functionalTest": false, 
            "type": "Feature", 
            "id": "TRIF-604", 
            "fixVersion": "Smuttynose-SP3"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "2221"
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
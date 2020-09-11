/**
 * @author Marshood Ayoub <Marshood.ayoub@gmail.com>
 * @data 25/08/2020
 */

const fetch = require('node-fetch');

const Data = [
    {
        "diffItem": {
            "updateTime": 1599794743, 
            "type": "Create", 
            "updatedFields": [
                {
                    "fieldName": "plannedPsi", 
                    "newValue": "PSI 42", 
                    "oldValue": null
                }, 
                {
                    "fieldName": "typeId", 
                    "newValue": 101, 
                    "oldValue": null
                }, 
                {
                    "fieldName": "rally/JiraId", 
                    "newValue": "TRIF-1328", 
                    "oldValue": null
                }, 
                {
                    "fieldName": "name", 
                    "newValue": "TRIF-1328 PSTX: Display ESX version for each node", 
                    "oldValue": null
                }, 
                {
                    "fieldName": "reqPriority", 
                    "newValue": "P01", 
                    "oldValue": null
                }, 
                {
                    "fieldName": "status", 
                    "newValue": "In Progress", 
                    "oldValue": null
                }, 
                {
                    "fieldName": "parentId", 
                    "newValue": "2329", 
                    "oldValue": null
                }, 
                {
                    "fieldName": "targetRel", 
                    "newValue": "1066", 
                    "oldValue": null
                }, 
                {
                    "fieldName": "qaFeatureOwner", 
                    "newValue": null, 
                    "oldValue": null
                }
            ]
        }, 
        "jiraItem": {
            "priority": "P01", 
            "status": "Implementing", 
            "qaRepresentative": null, 
            "name": "PSTX: Display ESX version for each node", 
            "parentId": null, 
            "functionalTest": false, 
            "type": "Feature", 
            "id": "TRIF-1328", 
            "fixVersion": "Foothills"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "2369"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599794761, 
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
            "name": "Display cluster time in GUI and Resync when NTP between nodes are out of sync", 
            "parentId": "TRII-67", 
            "functionalTest": false, 
            "type": "Feature", 
            "id": "TRIF-789", 
            "fixVersion": "Foothills"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "1765"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599794763, 
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
            "qaRepresentative": "bjack@emc.com", 
            "name": "Warning State for Job Steps  is not intuitively available for users", 
            "parentId": "TRII-23", 
            "functionalTest": false, 
            "type": "Feature", 
            "id": "TRIF-761", 
            "fixVersion": "Foothills"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "1918"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599794770, 
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
            "priority": "P01", 
            "status": "Done", 
            "qaRepresentative": "rajasekaran.rajagopal@emc.com", 
            "name": "Add iSCSI storage performance metrics per ip_port on REST and TMA", 
            "parentId": "TRII-105", 
            "functionalTest": false, 
            "type": "Feature", 
            "id": "TRIF-534", 
            "fixVersion": "Foothills"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "1726"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599794776, 
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
            "status": "Done", 
            "qaRepresentative": "bjack@emc.com", 
            "name": "CPDM GUI Infrastructure (Foothills) - Not Customer Facing", 
            "parentId": "TRII-106", 
            "functionalTest": false, 
            "type": "Feature", 
            "id": "TRIF-465", 
            "fixVersion": "Foothills"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "1920"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599794781, 
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
            "status": "Done", 
            "qaRepresentative": "bjack@emc.com", 
            "name": " Independent System Health check ", 
            "parentId": "TRII-91", 
            "functionalTest": false, 
            "type": "Feature", 
            "id": "TRIF-460", 
            "fixVersion": "Foothills"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "1806"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599794784, 
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
            "priority": "P01", 
            "status": "Done", 
            "qaRepresentative": "bjack@emc.com", 
            "name": "CloudIQ Integrations from Trident back-end engineering data/metrics (Post SN GA MVP)", 
            "parentId": "TRII-1", 
            "functionalTest": false, 
            "type": "Feature", 
            "id": "TRIF-360", 
            "fixVersion": "Foothills"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "1789"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599794786, 
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
            "priority": "P01", 
            "status": "Done", 
            "qaRepresentative": "rajasekaran.rajagopal@emc.com", 
            "name": "SAN Replication - Support DR testing of a Volume or VG", 
            "parentId": "TRII-64", 
            "functionalTest": false, 
            "type": "Feature", 
            "id": "TRIF-349", 
            "fixVersion": "Foothills"
        }, 
        "qcItem": {
            "status": "Not Covered", 
            "requirementType": "Feature", 
            "requirementId": "1402"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599794833, 
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
            "priority": "P01", 
            "status": "Done", 
            "qaRepresentative": "rajasekaran.rajagopal@emc.com", 
            "name": "DM - GUI Enhancements", 
            "parentId": "TRII-73", 
            "functionalTest": false, 
            "type": "Feature", 
            "id": "TRIF-306", 
            "fixVersion": "Foothills"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "1768"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599794850, 
            "type": "Updated", 
            "updatedFields": [
                {
                    "fieldName": "qaFeatureOwner", 
                    "newValue": null, 
                    "oldValue": "bashs"
                }
            ]
        }, 
        "jiraItem": {
            "priority": "P01", 
            "status": "Done", 
            "qaRepresentative": "bjack@emc.com", 
            "name": "TMA Foothills - UX feedback & GUI enhancements", 
            "parentId": "TRII-23", 
            "functionalTest": false, 
            "type": "Feature", 
            "id": "TRIF-128", 
            "fixVersion": "Foothills"
        }, 
        "qcItem": {
            "status": "Not Covered", 
            "requirementType": "Feature", 
            "requirementId": "772"
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
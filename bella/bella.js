/**
 * @author Marshood Ayoub <Marshood.ayoub@gmail.com>
 * @data 25/08/2020
 */

const fetch = require('node-fetch');


const Data = [
    {
        "diffItem": {
            "updateTime": 1599708365, 
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
            "jiraType": "Feature", 
            "jiraName": "Display cluster time in GUI and Resync when NTP between nodes are out of sync", 
            "qaRepresentative": "rajasekaran.rajagopal@emc.com", 
            "functionalTest": "Yes", 
            "fixVersion": "Foothills", 
            "jiraId": "TRIF-789", 
            "jiraParentId": "TRII-67"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "1765"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599708367, 
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
            "jiraType": "Feature", 
            "jiraName": "Warning State for Job Steps  is not intuitively available for users", 
            "qaRepresentative": "bjack@emc.com", 
            "functionalTest": "Yes", 
            "fixVersion": "Foothills", 
            "jiraId": "TRIF-761", 
            "jiraParentId": "TRII-23"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "1918"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599708374, 
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
            "jiraType": "Feature", 
            "jiraName": "Add iSCSI storage performance metrics per ip_port on REST and TMA", 
            "qaRepresentative": "rajasekaran.rajagopal@emc.com", 
            "functionalTest": "Yes", 
            "fixVersion": "Foothills", 
            "jiraId": "TRIF-534", 
            "jiraParentId": "TRII-105"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "1726"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599708381, 
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
            "jiraType": "Feature", 
            "jiraName": "CPDM GUI Infrastructure (Foothills) - Not Customer Facing", 
            "qaRepresentative": "bjack@emc.com", 
            "functionalTest": "Yes", 
            "fixVersion": "Foothills", 
            "jiraId": "TRIF-465", 
            "jiraParentId": "TRII-106"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "1920"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599708385, 
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
            "jiraType": "Feature", 
            "jiraName": " Independent System Health check ", 
            "qaRepresentative": "bjack@emc.com", 
            "functionalTest": "Yes", 
            "fixVersion": "Foothills", 
            "jiraId": "TRIF-460", 
            "jiraParentId": "TRII-91"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "1806"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599708389, 
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
            "jiraType": "Feature", 
            "jiraName": "CloudIQ Integrations from Trident back-end engineering data/metrics (Post SN GA MVP)", 
            "qaRepresentative": "bjack@emc.com", 
            "functionalTest": "Yes", 
            "fixVersion": "Foothills", 
            "jiraId": "TRIF-360", 
            "jiraParentId": "TRII-1"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "1789"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599708390, 
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
            "jiraType": "Feature", 
            "jiraName": "SAN Replication - Support DR testing of a Volume or VG", 
            "qaRepresentative": "rajasekaran.rajagopal@emc.com", 
            "functionalTest": "Yes", 
            "fixVersion": "Foothills", 
            "jiraId": "TRIF-349", 
            "jiraParentId": "TRII-64"
        }, 
        "qcItem": {
            "status": "Not Covered", 
            "requirementType": "Feature", 
            "requirementId": "1402"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599708438, 
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
            "jiraType": "Feature", 
            "jiraName": "DM - GUI Enhancements", 
            "qaRepresentative": "rajasekaran.rajagopal@emc.com", 
            "functionalTest": "Yes", 
            "fixVersion": "Foothills", 
            "jiraId": "TRIF-306", 
            "jiraParentId": "TRII-73"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "1768"
        }
    }, 
    {
        "diffItem": {
            "updateTime": 1599708456, 
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
            "jiraType": "Feature", 
            "jiraName": "TMA Foothills - UX feedback & GUI enhancements", 
            "qaRepresentative": "bjack@emc.com", 
            "functionalTest": "Yes", 
            "fixVersion": "Foothills", 
            "jiraId": "TRIF-128", 
            "jiraParentId": "TRII-23"
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
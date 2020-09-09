/**
 * @author Marshood Ayoub <Marshood.ayoub@gmail.com>
 * @data 25/08/2020
 */

const fetch = require('node-fetch');
const Data=[
    {
        "diffItem": {
            "updatedTime": 1598489421, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": null
                }
            
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Implementing", 
            "jiraType": "Epic", 
            "jiraName": "PSI 41: Performance, Memory budget and ATP - LST", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_41", 
            "jiraId": "TRIES-44399", 
            "jiraParentId": "TRIF-1098"
        }, 
        "qcItem": {
            "status": "In Progress", 
            "requirementType": "Epic", 
            "requirementId": "2321"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489421, 
            "type": "Delete", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": null
                }
            
        }, 
        "jiraItem": {
            "priority": "P01", 
            "status": "Done", 
            "jiraType": "Epic", 
            "jiraName": "Platform IL - SYM recovery topology support for FSCK Memory Budget ", 
            "qaRepresentative": null, 
            "functionalTest":true, 
            "fixVersion": "PSI_41", 
            "jiraId": "TRIES-42962", 
            "jiraParentId": "TRIF-1098"
        }, 
        "qcItem": {
            "status": "Done", 
            "requirementType": "Epic", 
            "requirementId": "2267"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489421, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": null
                }
            
        }, 
        "jiraItem": {
            "priority": "P01", 
            "status": "Backlog", 
            "jiraType": "Epic", 
            "jiraName": "Quality : FSCK Scale Testing on HW configs", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_41", 
            "jiraId": "TRIES-36419", 
            "jiraParentId": "TRIF-1098"
        }, 
        "qcItem": {
            "status": "Backlog", 
            "requirementType": "Epic", 
            "requirementId": "2155"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489421, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": null
                }
            
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Implementing", 
            "jiraType": "Epic", 
            "jiraName": "Quality TRIF-1098: SP FSCK Scalability", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_41", 
            "jiraId": "TRIES-35633", 
            "jiraParentId": "TRIF-1098"
        }, 
        "qcItem": {
            "status": "In Progress", 
            "requirementType": "Epic", 
            "requirementId": "2156"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489421, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": null
                }
            
        }, 
        "jiraItem": {
            "priority": "P02", 
            "status": "Done", 
            "jiraType": "Epic", 
            "jiraName": "Platform - Memory Budget Support", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_40", 
            "jiraId": "TRIES-35130", 
            "jiraParentId": "TRIF-1098"
        }, 
        "qcItem": {
            "status": "Done", 
            "requirementType": "Epic", 
            "requirementId": "2157"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489421, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": null
                }
            
        }, 
        "jiraItem": {
            "priority": "P01", 
            "status": "Done", 
            "jiraType": "Epic", 
            "jiraName": "Fsck Diagnosability Improvements", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_40", 
            "jiraId": "TRIES-33508", 
            "jiraParentId": "TRIF-1098"
        }, 
        "qcItem": {
            "status": "Done", 
            "requirementType": "Epic", 
            "requirementId": "2158"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489421, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": null
                }
            
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Done", 
            "jiraType": "Epic", 
            "jiraName": "[SP3] FSCK Memory Budget ", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_40", 
            "jiraId": "TRIES-33341", 
            "jiraParentId": "TRIF-1098"
        }, 
        "qcItem": {
            "status": "Done", 
            "requirementType": "Epic", 
            "requirementId": "2160"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489422, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": null, 
                    "oldValue": "rajagr2"
                }
        }, 
        "jiraItem": {
            "priority": "P01", 
            "status": "Done", 
            "jiraType": "Feature", 
            "jiraName": "REST: 5-min Metrics Capture for Plugins (e.g. SRM, ESA) and other Reporting Systems PART2", 
            "qaRepresentative": "rajasekaran.rajagopal@emc.com", 
            "functionalTest": true, 
            "fixVersion": "Smuttynose-SP3", 
            "jiraId": "TRIF-1031", 
            "jiraParentId": null
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "2150"
        }
    },
    {
        "diffItem": {
            "updatedTime": 1598489422, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "jiraParentId", 
                    "newValue": "2339", 
                    "oldValue": "1870"
                }
            
        }, 
        "jiraItem": {
            "priority": "P01", 
            "status": "Done", 
            "jiraType": "Feature", 
            "jiraName": "REST: 5-min Metrics Capture for Plugins (e.g. SRM, ESA) and other Reporting Systems PART2", 
            "qaRepresentative": "rajasekaran.rajagopal@emc.com", 
            "functionalTest": true, 
            "fixVersion": "Smuttynose-SP3", 
            "jiraId": "TRIF-1031", 
            "jiraParentId": null
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "2150"
        }
    },
    






    {
        "diffItem": {
            "updatedTime": 1598489425, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": "smit_mungali"
                }
            
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Done", 
            "jiraType": "Epic", 
            "jiraName": "SDNAS CP to consume DP raised single notification", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_40", 
            "jiraId": "TRIES-35898", 
            "jiraParentId": "TRIF-1017"
        }, 
        "qcItem": {
            "status": "Done", 
            "requirementType": "Epic", 
            "requirementId": "2147"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489425, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": "vinod_gk"
                }
            
        }, 
        "jiraItem": {
            "priority": "P01", 
            "status": "Done", 
            "jiraType": "Epic", 
            "jiraName": "Quality TRIF-1017 [SDNAS-INT] Enhancements to Handle Out of Space on an appliance", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_41", 
            "jiraId": "TRIES-35721", 
            "jiraParentId": "TRIF-1017"
        }, 
        "qcItem": {
            "status": "Done", 
            "requirementType": "Epic", 
            "requirementId": "2217"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489425, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": null
                }
            
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Done", 
            "jiraType": "Epic", 
            "jiraName": "MD Out Of Space early call home alert", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_40", 
            "jiraId": "TRIES-35310", 
            "jiraParentId": "TRIF-1017"
        }, 
        "qcItem": {
            "status": "Done", 
            "requirementType": "Epic", 
            "requirementId": "2027"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489425, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": null
                }
            
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Done", 
            "jiraType": "Epic", 
            "jiraName": "Dynamic adjust MD/VLB expansion threshold for special IO/config pattern", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_40", 
            "jiraId": "TRIES-35280", 
            "jiraParentId": "TRIF-1017"
        }, 
        "qcItem": {
            "status": "Done", 
            "requirementType": "Epic", 
            "requirementId": "2026"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489425, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": null
                }
            
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Done", 
            "jiraType": "Epic", 
            "jiraName": "Change Call Home behavior at utilization level 90%/95%/99% - Data", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_40", 
            "jiraId": "TRIES-34129", 
            "jiraParentId": "TRIF-1017"
        }, 
        "qcItem": {
            "status": "Done", 
            "requirementType": "Epic", 
            "requirementId": "2025"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489426, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": null
                }
            
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Done", 
            "jiraType": "Epic", 
            "jiraName": "Disable volume expansion when system is in OOS/WP", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_40", 
            "jiraId": "TRIES-33265", 
            "jiraParentId": "TRIF-1017"
        }, 
        "qcItem": {
            "status": "Done", 
            "requirementType": "Epic", 
            "requirementId": "2023"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489426, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": null
                }
            
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Done", 
            "jiraType": "Epic", 
            "jiraName": "Reject volume creation with explicit error status when system is in OOS/WP mode", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_40", 
            "jiraId": "TRIES-33262", 
            "jiraParentId": "TRIF-1017"
        }, 
        "qcItem": {
            "status": "Done", 
            "requirementType": "Epic", 
            "requirementId": "2022"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489426, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": null
                }
            
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Done", 
            "jiraType": "Epic", 
            "jiraName": "DP raise notification for SDNAS and other clients to provide earlier warning of Out Of Space ", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_40", 
            "jiraId": "TRIES-32843", 
            "jiraParentId": "TRIF-1017"
        }, 
        "qcItem": {
            "status": "Done", 
            "requirementType": "Epic", 
            "requirementId": "2021"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489426, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": null
                }
            
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Done", 
            "jiraType": "Epic", 
            "jiraName": "PLB defrag", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_40", 
            "jiraId": "TRIES-32842", 
            "jiraParentId": "TRIF-1017"
        }, 
        "qcItem": {
            "status": "Done", 
            "requirementType": "Epic", 
            "requirementId": "2148"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489426, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "jiraParentId", 
                    "newValue": "2339", 
                    "oldValue": "2215"
                }
            
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Done", 
            "jiraType": "Feature", 
            "jiraName": "Trident NAS NDU should continue on NAS warnings", 
            "qaRepresentative": "Vinod.GK@emc.com", 
            "functionalTest": true, 
            "fixVersion": "Smuttynose-SP3", 
            "jiraId": "TRIF-990", 
            "jiraParentId": null
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "2287"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489427, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "jiraParentId", 
                    "newValue": "2339", 
                    "oldValue": "2210"
                }
            
        }, 
        "jiraItem": {
            "priority": "P01", 
            "status": "Implementing", 
            "jiraType": "Feature", 
            "jiraName": "PowerStoreX ESX version update for SN SP3", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "Smuttynose-SP3", 
            "jiraId": "TRIF-969", 
            "jiraParentId": null
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "2286"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489429, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": null
                }
            
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Implementing", 
            "jiraType": "Epic", 
            "jiraName": "Platform work items for 6.7EP15 delivery to SP3", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_41", 
            "jiraId": "TRIES-45254", 
            "jiraParentId": "TRIF-969"
        }, 
        "qcItem": {
            "status": "In Progress", 
            "requirementType": "Epic", 
            "requirementId": "2350"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489430, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": "", 
                    "oldValue": null
                }
            
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Implementing", 
            "jiraType": "Epic", 
            "jiraName": "vSphere 6.7P02 bake time and roll out", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_41", 
            "jiraId": "TRIES-28626", 
            "jiraParentId": "TRIF-969"
        }, 
        "qcItem": {
            "status": "In Progress", 
            "requirementType": "Epic", 
            "requirementId": "2351"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489430, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": null, 
                    "oldValue": "rajagr2"
                }
            
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Implementing", 
            "jiraType": "Feature", 
            "jiraName": "Appliance capacity metrics availability when DP is OOS", 
            "qaRepresentative": "rajasekaran.rajagopal@emc.com", 
            "functionalTest": true, 
            "fixVersion": "Smuttynose-SP3", 
            "jiraId": "TRIF-925", 
            "jiraParentId": "TRII-106"
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "2144"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489431, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "status", 
                    "newValue": "Done", 
                    "oldValue": "In Progress"
                }
            
        }, 
        "jiraItem": {
            "priority": "P01", 
            "status": "Done", 
            "jiraType": "Epic", 
            "jiraName": "Display capacity metrics when DP is in RO mode due to OOS condition ", 
            "qaRepresentative": null, 
            "functionalTest": true, 
            "fixVersion": "PSI_41", 
            "jiraId": "TRIES-23818", 
            "jiraParentId": "TRIF-925"
        }, 
        "qcItem": {
            "status": "Done", 
            "requirementType": "Epic", 
            "requirementId": "2146"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489431, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "jiraParentId", 
                    "newValue": "2339", 
                    "oldValue": "2210"
                }
            
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Done", 
            "jiraType": "Feature", 
            "jiraName": "PSTX: Configuration for best performance should happen automatically", 
            "qaRepresentative": "anitha.chittibabu@emc.com", 
            "functionalTest": true, 
            "fixVersion": "Smuttynose-SP3", 
            "jiraId": "TRIF-896", 
            "jiraParentId": null
        }, 
        "qcItem": {
            "status": "N/A", 
            "requirementType": "Feature", 
            "requirementId": "2257"
        }
    }, 
    {
        "diffItem": {
            "updatedTime": 1598489433, 
            "type": "Update", 
            "updatedField": 
                {
                    "fieldName": "qaRepresentative", 
                    "newValue": null, 
                    "oldValue": "krishanu_dhar"
                }
            
        }, 
        "jiraItem": {
            "priority": "P00", 
            "status": "Done", 
            "jiraType": "Feature", 
            "jiraName": "Orchestrated disruptive migration (Agent-less DT) for current supported source arrays and XtremIO", 
            "qaRepresentative": "Krishanu_Dhar@Dell.com", 
            "functionalTest": true, 
            "fixVersion": "Smuttynose-SP3", 
            "jiraId": "TRIF-604", 
            "jiraParentId": "TRII-73"
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
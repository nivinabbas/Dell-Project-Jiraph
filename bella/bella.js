const fetch = require('node-fetch');

const Data = [
    {
        "diffItem": {
            "updateTime": 1568309401000,
            "type": "Update",
            "updatedField":
            {
                "fieldName": "status",
                "newValue": "In Progress",
                "oldValue": "Done"
            }

        },
        "jiraItem": {
            "priority": "P00",
            "status": "Backlog",
            "jiraType": "Epic",
            "jiraName": "PSI 41: SAR Support for FSCK/Recovery",
            "qaRepresentative": null,
            "functionalTest": "Yes",
            "fixVersion": "PSI_41",
            "jiraId": "TRIES-41773",
            "jiraParentId": "TRIF-842"
        },
        "qcItem": {
            "status": "Backlog",
            "requirementType": "Epic",
            "requirementId": "2164"
        }
    },
    {
        "diffItem": {
            "updateTime": 1568395801000,
            "type": "Update",
            "updatedField":
            {
                "fieldName": "status",
                "newValue": "In Progress",
                "oldValue": "Done"
            }

        },
        "jiraItem": {
            "priority": "P00",
            "status": "Implementing",
            "jiraType": "Epic",
            "jiraName": "PSI 41: FSCK Support for Late Dedup and VLB Defrag Phase 1 & 2",
            "qaRepresentative": null,
            "functionalTest": "Yes",
            "fixVersion": "PSI_41",
            "jiraId": "TRIES-37201",
            "jiraParentId": "TRIF-842"
        },
        "qcItem": {
            "status": "In Progress",
            "requirementType": "Epic",
            "requirementId": "2011"
        }
    },
    {
        "diffItem": {
            "updateTime": 1568482201000,
            "type": "Update",
            "updatedField":
            {
                "fieldName": "status",
                "newValue": "In Progress",
                "oldValue": "Done"
            }

        },
        "jiraItem": {
            "priority": "P01",
            "status": "Done",
            "jiraType": "Epic",
            "jiraName": "PSI 39: RAID fsck - Infrastructure update and validation rules expansion",
            "qaRepresentative": null,
            "functionalTest": "Yes",
            "fixVersion": "PSI_39",
            "jiraId": "TRIES-36948",
            "jiraParentId": "TRIF-842"
        },
        "qcItem": {
            "status": "Done",
            "requirementType": "Epic",
            "requirementId": "2008"
        }
    },
    {
        "diffItem": {
            "updateTime": 1568568601000,
            "type": "Update",
            "updatedField":
            {
                "fieldName": "status",
                "newValue": "In Progress",
                "oldValue": "Done"
            }

        },
        "jiraItem": {
            "priority": "P00",
            "status": "Backlog",
            "jiraType": "Epic",
            "jiraName": "PSI 40: Fault Containment - FSCK support",
            "qaRepresentative": null,
            "functionalTest": "Yes",
            "fixVersion": "PSI_41",
            "jiraId": "TRIES-34825",
            "jiraParentId": "TRIF-842"
        },
        "qcItem": {
            "status": "Backlog",
            "requirementType": "Epic",
            "requirementId": "2009"
        }
    },
    {
        "diffItem": {
            "updateTime": 1568655001000,
            "type": "Update",
            "updatedField":
            {
                "fieldName": "status",
                "newValue": "In Progress",
                "oldValue": "Done"
            }

        },
        "jiraItem": {
            "priority": "P00",
            "status": "Implementing",
            "jiraType": "Epic",
            "jiraName": "PSI 41: RAID fsck - Support V2 new features",
            "qaRepresentative": null,
            "functionalTest": "Yes",
            "fixVersion": "PSI_41",
            "jiraId": "TRIES-34722",
            "jiraParentId": "TRIF-842"
        },
        "qcItem": {
            "status": "In Progress",
            "requirementType": "Epic",
            "requirementId": "1956"
        }
    },
    {
        "diffItem": {
            "updateTime": 1568741401000,
            "type": "Update",
            "updatedField":
            {
                "fieldName": "priority",
                "newValue": "Low",
                "oldValue": "High"
            }
        },
        "jiraItem": {
            "priority": "P01",
            "status": "Done",
            "jiraType": "Epic",
            "jiraName": "PSI 40: RAID fsck - Infrastructure update and validation rules expansion",
            "qaRepresentative": null,
            "functionalTest": "Yes",
            "fixVersion": "PSI_40",
            "jiraId": "TRIES-32895",
            "jiraParentId": "TRIF-842"
        },
        "qcItem": {
            "status": "Done",
            "requirementType": "Epic",
            "requirementId": "1892"
        }
    },
    {
        "diffItem": {
            "updateTime": 1568827801000,
            "type": "Update",
            "updatedField":
            {
                "fieldName": "priority",
                "newValue": "Low",
                "oldValue": "High"
            }

        },
        "jiraItem": {
            "priority": "P00",
            "status": "Backlog",
            "jiraType": "Epic",
            "jiraName": "Quality: PSI 41: FSCK Test Support for FH-C DP Features",
            "qaRepresentative": null,
            "functionalTest": "Yes",
            "fixVersion": "PSI_41",
            "jiraId": "TRIES-28531",
            "jiraParentId": "TRIF-842"
        },
        "qcItem": {
            "status": "Backlog",
            "requirementType": "Epic",
            "requirementId": "2171"
        }
    },
    {
        "diffItem": {
            "updateTime": 1568914201000,
            "type": "Update",
            "updatedField":
            {
                "fieldName": "priority",
                "newValue": "Low",
                "oldValue": "High"
            }

        },
        "jiraItem": {
            "priority": "P00",
            "status": "Done",
            "jiraType": "Feature",
            "jiraName": "Display cluster time in GUI and Resync when NTP between nodes are out of sync",
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
            "updateTime": 1569000601000,
            "type": "Update",
            "updatedField":
            {
                "fieldName": "priority",
                "newValue": "Low",
                "oldValue": "High"
            }

        },
        "jiraItem": {
            "priority": "P00",
            "status": "Implementing",
            "jiraType": "Feature",
            "jiraName": "Warning State for Job Steps  is not intuitively available for users",
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
            "updateTime": 1569087001000,
            "type": "Update",
            "updatedField":
            {
                "fieldName": "priority",
                "newValue": "Low",
                "oldValue": "High"
            }

        },
        "jiraItem": {
            "priority": "P01",
            "status": "Done",
            "jiraType": "Epic",
            "jiraName": "GUI  implementation, testing for TRIF-575: Add node's CPU stats to historical performance metrics",
            "qaRepresentative": null,
            "functionalTest": "Yes",
            "fixVersion": "PSI_38",
            "jiraId": "TRIES-15409",
            "jiraParentId": "TRIF-575"
        },
        "qcItem": {
            "status": "Done",
            "requirementType": "Epic",
            "requirementId": "1915"
        }
    },
    {
        "diffItem": {
            "updateTime": 1569173401000,
            "type": "Update",
            "updatedField":
            {
                "fieldName": "priority",
                "newValue": "Low",
                "oldValue": "High"
            }

        },
        "jiraItem": {
            "priority": "P00",
            "status": "Done",
            "jiraType": "Epic",
            "jiraName": "TMA Implementation & Test : TRIF-575 - Node Affinity",
            "qaRepresentative": null,
            "functionalTest": "Yes",
            "fixVersion": "PSI_39",
            "jiraId": "TRIES-15217",
            "jiraParentId": "TRIF-575"
        },
        "qcItem": {
            "status": "Done",
            "requirementType": "Epic",
            "requirementId": "1916"
        }
    }
]
const key="QYZNRVlzTAzJjWJLxobY24hGYcoclsaf4ZX5BLhGSi0Xa4cMC1APBoN";
const body = { a: 1 };

fetch('http://localhost:4000/api/PostBellaData/GetBellaData', {
    method: 'post',
    body: JSON.stringify({
        key,Data
    }),
    headers: { 'Content-Type': 'application/json' },
})
    .then(res => res.json())
    .then(json => console.log(json));

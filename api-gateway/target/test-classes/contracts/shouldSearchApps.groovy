package contracts

import org.springframework.cloud.contract.spec.Contract

Contract.make {
    description "should search apps when GET /api/apps/search with query parameters"
    
    request {
        method GET()
        url "/api/apps/search" {
            queryParameters {
                parameter("appName", "app")
                parameter("appOwner", "owner")
                parameter("isValid", "true")
            }
        }
        headers {
            contentType applicationJson()
        }
    }
    
    response {
        status 200
        headers {
            contentType applicationJson()
        }
        body([
            success: true,
            data: [
                [
                    appName: "appOne",
                    appData: [
                        appPath: "/appSix",
                        appOwner: "ownerOne",
                        isValid: true
                    ]
                ]
            ],
            count: 1,
            criteria: [
                appName: "app",
                appOwner: "owner",
                isValid: true
            ]
        ])
    }
} 
package contracts

import org.springframework.cloud.contract.spec.Contract

Contract.make {
    description "should return all apps when GET /api/apps is called"
    
    request {
        method GET()
        url "/api/apps"
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
                ],
                [
                    appName: "appTwo",
                    appData: [
                        appPath: "/appSix",
                        appOwner: "ownerOne",
                        isValid: false
                    ]
                ]
            ],
            count: 2
        ])
    }
} 
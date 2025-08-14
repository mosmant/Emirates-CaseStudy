package contracts

import org.springframework.cloud.contract.spec.Contract

Contract.make {
    description "should return specific app when GET /api/apps/{appName} is called"
    
    request {
        method GET()
        url value(consumer(regex("/api/apps/[a-zA-Z0-9]+")), producer("/api/apps/appOne"))
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
                appName: "appOne",
                appData: [
                    appPath: "/appSix",
                    appOwner: "ownerOne",
                    isValid: true
                ]
            ]
        ])
    }
} 
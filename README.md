# cap-cds-serve-issue-sap-support
Demonstration of cds serve issue for @sap/cds: 5.0.6

## Issue

When built, the `cds serve` commnad is not serving the custom implementation of a .cds service defined in a .js file of the same name as that of the service. 
Expected behaviour is that it should automatically pick up the custom implementation. This used to work with ealier version cds v3. I have not checked this with version cds v4. 

## Steps to re-produce:

1. Clone the repo
2. Install the dependencies

    ```npm i```

3. `cds watch` works as expected and serves the custom implentation automatically.

    ```npm run watch```

4. Go to url which invokes the function `hello`. It will work and show the following output:

    ```http://localhost:4004/world/hello(to='SAP Support')```
    
    ````
    {
        "@odata.context": "$metadata#Edm.String",
        "value": "Hello SAP Support!"
    }
    ````

5. Build the service using command:

    ```npm run build```

6. The service gets built inside the `service/` folder.
7. Go to the `service` folder:

    ```cd service```

8. Install the dependencies:

    ```npm i```

9. Start serving the service:

    ```npm start```

10. The service loads the models and starts serving the service without the custom implementation:

    ````
    > @capire/hello-world@1.0.0 start /Users/ashish/Documents/GitHub/cloud-cap-samples/hello/service
    > cds serve


    [cds] - model loaded from 1 file(s):

    ./srv/csn.json

    [cds] - serving world { at: '/world' }

    [cds] - launched in: 618.451ms
    [cds] - server listening on { url: 'http://localhost:4004' }
    [ terminate with ^C ]
    ````

11.  Go to url which invokes the function `hello`.
  ```http://localhost:4004/world/hello(to='SAP Support')```

12. Following error is seen:
    `````
    [cds] - GET /world/hello(to='Ashish')
    [cds] - { Error: Service "world" has no handler for "hello".
        at ODataRequest.reject (/Users/ashish/Documents/GitHub/cloud-cap-samples/hello/service/node_modules/@sap/cds/lib/req/impl.js:60:39)
        at _unhandled (/Users/ashish/Documents/GitHub/cloud-cap-samples/hello/service/node_modules/@sap/cds/lib/serve/Service-dispatch.js:109:14)
        at ApplicationService.dispatch (/Users/ashish/Documents/GitHub/cloud-cap-samples/hello/service/node_modules/@sap/cds/lib/serve/Service-dispatch.js:61:29)
        at process._tickCallback (internal/process/next_tick.js:68:7)
    code: 501,
    message: 'Service "world" has no handler for "hello".',
    numericSeverity: 4,
    id: '1042101',
    level: 'ERROR',
    timestamp: 1619419052100 }
    ````
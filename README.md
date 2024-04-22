# nodejs-express-govuk-mysql

REST API
---
This application provides a frontend for the REST API: https://github.com/shaunganley/java-dropwizard-swagger-jdbc
1. Follow the steps in the above link to run the REST API


How to start the nodejs-express-govuk-axios application
---

1. Run `npm install` to build your application
1. Start application with `API_URL=http://localhost:8080/ && npm start`
1. To check that your application is running enter url `http://localhost:3000/employees`

Tests
---

1. Run `npm test` to run unit tests
1. Run `UI_TEST_URL=http://localhost:3000 && npm run test-ui` to run UI tests locally, change the URL to run against remote (you may need to update the version of the chromedriver dependency: `npm update chromedriver`)

Config
---

1. You can change the URL of the REST API by setting the restApiUrl environment variable

Build and run the service through docker
---

You can build in a number of ways using docker and integrate it with a database, these are listed below:
pre-requisite = docker and docker compose are installed in your local system.
                your docker image for https://github.com/shaunganley/java-dropwizard-swagger-jdbc is 
                available locally (the web ui has a dependency on this) and running.

1.  Ensure the environment variables are correct for your api or enter these as 
    additional arguments on the docker build command.

    Run "docker build <service name given + optional tag> ." from your src directory.
    This will read from your docker file, build the environment required for the 
    image, build your service and create the image locally.
    
    Use "docker images" to verify your image is available after running the above command.
    
    Now run "docker run -p <chosen port to host locally on your machine>:3000 <your image 
    name given>", this will then spin up your image and host on the given port.
    
2.  You can also deploy by docker compose which handles the network traffic between 
    containers also will deploy a mysql container also.
    pre-requisite = ensure your docker image is available or build with docker compose, ensure 
    that name is in the image name for docker compose.
    
    run "docker compose up" from the src directory, this spins up both the web,api and a mysql db instance.
    
    Next log onto your db instance and follow the commands under "Database".
    
    Done....the service should be able to operate as expected.      
    
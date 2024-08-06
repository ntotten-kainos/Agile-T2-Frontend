# Agile - Team 2 - Frontend
---
This application provides a frontend for the REST API: https://github.com/ntotten-kainos/Agile-T2-Java
How to start the Agile-T2-Java application (BACKEND)
---
1. Follow the steps listed to run the backend of this application, go to url https://github.com/ntotten-kainos/Agile-T2-Java



How to start the Agile-T2-Frontend application (FRONTEND)
---
1. Clone the repo - run `git clone git@github.com:ntotten-kainos/Agile-T2-Frontend.git` on terminal
1. Open the file and run `npm install` to build your application
1. Start application with `npm start`
1. To check application is running, go to url http://localhost:3000/



Tests
---

Unit Tests
---
1. Run `npm test` to run unit tests

Pa11y
---
1. Add the page URL to the .pa11yci file
1. Once a pull request is made it will automatically check the files
1. Or you can run the test runner using 
```
pa11y
https://example.com
```
1. For any other problems see the following
https://github.com/pa11y/pa11y

UI Tests
---
UI tests have been written utilising Selenium
https://www.selenium.dev/documentation/ 

1. Run `npm run test-ui` to run UI tests locally
1. Ensure the frontend server is running for local tests by running `npm start`
1. The backend API must be running locally in order to access information from the database

JMeter Test (performance test)
---
1. Install JMeter https://jmeter.apache.org/usermanual/index.html
1. In Terminal, run command: jmeter
1. Open the file LOGIN--VIEW-JOB-ROLES.jmx file in JMeter
1. Press Start button to run tests

Config
---

1. You can change the URL of the REST API by setting the restApiUrl environment variable

Build and run the service through docker
---

You can build in a number of ways using docker and integrate it with a database, these are listed below:
pre-requisite = docker and docker compose are installed in your local system.
                your docker image for https://github.com/ntotten-kainos/Agile-T2-Java is 
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
    


Technology Stack
---

- **Frontend:** HTML, Bootstrap
- **Testing:** Selenium, WAVE, Pa11y



Project Credits
---
- Mark Mcilroy
- Rackie Pascua
- Ashna Abraham
- Jack Knowles
- Nathan Totten
- Selina Mc Garry
- Jamie Mcconnell



 

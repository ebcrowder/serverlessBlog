## http://serverless-e-crowder.s3-website-us-east-1.amazonaws.com/

This project is a serverless, full-stack blog application that allows users to create, view and delete posts. See below for a summary of tech utilized on this project:

Front-end:

* React (bootstrapped via create-react-app)
* Redux (including Redux Form and Redux Router)
* Axios (for API calls to server)

Server-side:

* Deployed on aws using Serverless framework (https://serverless.com/) and aws Lambda
* aws DynamoDB database
* Node.js
* Express

The Serverless framework allows developers to easily scaffold "serverless" infrastructure using aws service offerings such as Lambda, DynamoDB, API Gateway and CloudFront.
The front-end of the project is hosted in an aws S3 bucket.

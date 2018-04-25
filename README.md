## http://serverless-e-crowder.s3-website-us-east-1.amazonaws.com/

This project is a full-stack blog application that allows users to create, view, update and delete posts. It features form validation and is hosted on aws utilizing serverless infrastructure methodology.

![alt text](/post1.jpg?raw=true "Index")
Index of posts.
![alt text](/post2.jpg?raw=true "Form")
Post form provides users with field validation feedback to ensure that forms are complete prior to submission.
![alt text](/post3.jpg?raw=true "Post")
Users can delete and update posts upon viewing them.

## Built With

Front-end:

* React (bootstrapped via create-react-app)
* Redux (including Redux Form and Redux Router)
* Axios (for API calls to server)

Server-side:

* REST API deployed on aws using Serverless framework (https://serverless.com/) and aws Lambda
* aws DynamoDB database
* Node.js
* Express

## Acknowledgments

* The Serverless framework allows developers to easily scaffold "serverless" infrastructure using aws service offerings such as Lambda, DynamoDB, API Gateway and CloudFront. The front-end of the project is hosted in an aws S3 bucket.

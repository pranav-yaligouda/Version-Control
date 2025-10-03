pipeline {
    agent any
    parameters {
        choice(name: 'ENVIRONMENT', choices: ['DEVELOPMENT', 'STAGING', 'PRODUCTION'], description: 'Select the deployment environment')
    }
    environment {
        DOCKERHUB_USERNAME = 'pranav-yaligouda'
        IMAGE_NAME = "crud-vc"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage ('Checkout repo') {
            steps{
                echo 'Checking out repo'
                checkout scm
            }
        }
        stage ('Build docker image') {
            steps{
                echo 'Building docker image'
                sh 'docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG} .'
                sh 'docker tag ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG} ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest'
            }
        }
        stage ('Test container') {
            steps {
                echo 'Running container and testing'
                sh 'docker run -d -p 8080:8080 --name crud-vc ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}'
                sh 'sleep 10'
                sh 'curl -f http://localhost:8080/api/v1/health || exit 1'
                sh 'docker stop crud-vc'
                sh 'docker rm crud-vc'
            }
        }
    }
}
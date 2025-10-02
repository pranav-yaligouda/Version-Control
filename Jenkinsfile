pipeline {
    agent any
    
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
    }
}
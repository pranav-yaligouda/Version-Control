pipeline {
    agent any
    parameters {
        choice(name: 'ENVIRONMENT', choices: ['DEVELOPMENT', 'STAGING', 'PRODUCTION'], description: 'Select the deployment environment')
    }
    environment {
        NODE_ENV = "${params.ENVIRONMENT}"
        PORT = '5000'
        MONGODB_URI = credentials('DB_URI')
        IMAGE_NAME = "crud-vc"
        IMAGE_TAG = "${BUILD_NUMBER}"
        DOCKERHUB_USERNAME = 'pranavyaligouda'
    }

    stages {
        stage('Checkout repo') {
            steps {
                echo 'Checking out repo'
                checkout scm
            }
        }
        stage('Build docker image') {
            steps {
                echo 'Building docker image'
                sh 'docker logout || true' // Ensure no cached credentials
                sh 'docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG} .'
                sh 'docker tag ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG} ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest'
            }
        }
        stage('Test container') {
            steps {
                echo 'Running container and testing'
                sh 'docker rm -f crud-vc || true'
                sh 'docker run -d -p 5000:5000 --env NODE_ENV=${NODE_ENV} --env PORT=${PORT} --env MONGODB_URI=${MONGODB_URI} --name crud-vc ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}'
                sh 'sleep 7'
                sh 'curl -f http://localhost:5000/api/v1/health || exit 1'
                sh 'docker stop crud-vc'
                sh 'docker rm crud-vc'
            }
        }
        stage('Push to DockerHub') {
            when {
                expression { params.ENVIRONMENT != 'PRODUCTION' }
            }
            steps {
                echo 'Pushing image to DockerHub'
                withCredentials([usernamePassword(credentialsId: 'dockerhub_credentials', usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
                    sh 'echo $DH_PASS | docker login -u $DH_USER --password-stdin'
                    sh 'docker push $DH_USER/${IMAGE_NAME}:${IMAGE_TAG}'
                    sh 'docker push $DH_USER/${IMAGE_NAME}:latest'
                    sh 'docker logout'
                }
            }
        }
        stage('Push to AWS ECR') {
            when {
                expression { params.ENVIRONMENT == 'PRODUCTION' }
            }
            steps {
                echo 'Pushing image to AWS ECR'
                withCredentials([usernamePassword(credentialsId: 'aws_ecr_credentials', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh '''
                        aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 741916656498.dkr.ecr.ap-south-1.amazonaws.com
                        docker tag ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG} 741916656498.dkr.ecr.ap-south-1.amazonaws.com/${IMAGE_NAME}:${IMAGE_TAG}
                        docker tag ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest 741916656498.dkr.ecr.ap-south-1.amazonaws.com/${IMAGE_NAME}:latest
                        docker push 741916656498.dkr.ecr.ap-south-1.amazonaws.com/${IMAGE_NAME}:${IMAGE_TAG}
                        docker push 741916656498.dkr.ecr.ap-south-1.amazonaws.com/${IMAGE_NAME}:latest
                        docker logout
                    '''
                }
            }
        }
    }
}
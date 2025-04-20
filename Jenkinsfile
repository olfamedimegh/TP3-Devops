pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'olfa2002/mon-app' // ton image sur Docker Hub
    }

    stages {
        stage('Cloner le dépôt') {
            steps {
               git branch: 'main', url: 'https://github.com/olfamedimegh/TP3-Devops.git'
            }
        }

        stage('Construire l\'image Docker') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Pousser l\'image Docker') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                        sh "docker push ${DOCKER_IMAGE}"
                    }
                }
            }
        }

        stage('Déployer sur Kubernetes') {
            steps {
                script {
                    sh 'kubectl apply -f deployment.yaml'
                    sh 'kubectl apply -f service.yaml'
                }
            }
        }
    }
}

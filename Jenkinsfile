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
                        usernameVariable: 'DOCKER_USER', 
                        passwordVariable: 'DOCKER_PASS')]) 
                    {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                        sh "docker push olfa2002/mon-app"
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

pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'olfa2002/mon-app:latest'
        HELM_CHART_PATH = './mon-app'
        DOCKER_CREDENTIALS_ID = 'dockerhub-creds'
        HELM_BINARY = '/home/jenkins/helm/linux-amd64/helm'  // Full path to Helm
    }

    stages {
        stage('Cloner le dépôt') {
            steps {
               git branch: 'main-with-helm', url: 'https://github.com/olfamedimegh/TP3-Devops.git'
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
                        passwordVariable: 'DOCKER_PASSWORD',
                        usernameVariable: 'DOCKER_USERNAME'
                    )]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                        sh "docker push ${DOCKER_IMAGE}"
                    }
                }
            }
        }

        stage('Déployer avec Helm') {
            steps {
                script {
                    sh "${HELM_BINARY} upgrade --install mon-app ${HELM_CHART_PATH} --set image.repository=${DOCKER_IMAGE.split(':')[0]} --set image.tag=${DOCKER_IMAGE.split(':')[1]}"
                }
            }
        }
    }
}

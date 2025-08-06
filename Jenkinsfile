pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/abhilashshivarchaka/veggiemarket.git'
            }
        }

        stage('Deploy using Docker Compose') {
            steps {
                script {
                    sh '''
                    docker-compose down || true
                    docker-compose up -d --build
                    '''
                }
            }
        }
    }
}

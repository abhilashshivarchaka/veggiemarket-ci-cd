pipeline {
    agent any

    stages {
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

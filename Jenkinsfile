pipeline {
    agent { dockerfile true }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
    }
}
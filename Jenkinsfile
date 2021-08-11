pipeline {
    agent { dockerfile true }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Finish') {
            steps {
                sh 'node --version'
            }
        }
    }
}
pipeline {
    agent any
    stages {
        stage('package') {
            steps {
                nodejs('nodejs_v16.14.0') {
                    sh "npm run dockerBuild"
                }
            }
        }
        stage('push') {
            steps {
                withDockerRegistry(credentialsId: 'harbor', url: 'http://192.168.2.106:8680/demo/') {
                    nodejs('nodejs_v16.14.0') {
                        sh "npm run dockerPush"
                    }
                }
            }
        }
        stage('deploy') {
            steps {
                nodejs('nodejs_v16.14.0') {
                    sh 'npm run deploy'
                }
            }
        }
    }
}

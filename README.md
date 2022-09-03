# Lambda Authorizer

이 함수는 AWS APIGateway 권한부여자의 역할을 하는 Lambda 함수를 Serveless Framework를 통해 배포하고, Lambda 함수에서 사용할 환경변수를 설정하는 방법을 설명합니다.

람다 권한부여자 관련 자세한 설명은 다음 링크를 참조바랍니다.  
https://velog.io/@xgro/Lambda-Authorizer

<br>

> `Important`   
 이 애플리케이션은 다양한 AWS 서비스를 사용하며 프리 티어 사용 후 이러한 서비스와 관련된 비용이 있습니다. 자세한 내용은 [AWS 요금 페이지](https://aws.amazon.com/pricing/)를 참조하십시오. 발생한 모든 AWS 비용은 귀하가 책임져야 합니다. 이 예에서는 어떠한 보증도 의미하지 않습니다.

## Requirements

- Serveless framework 
  - Framework Core: 3.19.0
  - Plugin: 6.2.2
  - SDK: 4.3.2

## Deployment Instructions

1. 프로젝트를 위한 새 경로를 생성하고, GitHub 리포지토리를 복제합니다.
    ``` 
    git clone https://github.com/xgro/authorizer_lambda.git
    ```
1. 프로젝트 내부의 src/ 경로로 이동합니다.
    ```
    cd src/
    ```
2. 의존성 패키지를 설치합니다.
    ```
    npm install
    ```
1. serverless 배포합니다.
    ```
    serverless deploy
    ```
1. 배포 후 다음과 유사한 출력이 표시되어야 합니다.
    ```
    Running "serverless" from node_modules
    DOTENV: Loading environment variables from .env:
            - JWT_SECRET

    Deploying authorizer to stage dev (ap-northeast-2)
    SERVERLESS-IGNORE: Loaded .slsignore
            - .env

    ✔ Service deployed to stack authorizer-dev (108s)

    functions:
      authorizer: authorizer-dev-authorizer (296 kB)
    ```

## How it works

Lambda Authorizer는 `serverless framework`를 사용하여 배포하며, 프론트엔드 및 백엔드 개발자가 애플리케이션을 빠르게 개발 할 수 있도록 합니다. 

`.env.sample`의 내용을 참조하여 `JWT_SECRET`의 값을 지정하여 API Gateway의 권한부여자로 사용합니다.

<br>

> **serverless framework plugin**
>  
> `serverless-dotenv-plugin`:  
>  프로젝트 배포시 .env 파일의 내용을 참조하여 lambda 환경변수로 합니다.
>   
> `serverless-ignore`:    
>  프로젝트 배포시 .env 파일을 아티팩트로 포함하지 않습니다.

<br>

## Testing
이 함수를 테스트하기 위해서는 `example/`을 참조하여 주시기 바랍니다.

`example/` 경로에서 `serverless deploy`로 테스트 환경을 빠르게 구축할 수 있습니다. 

### 토큰 발행을 위한 요청
`/POST`
```
  # payload 
  {
    "loginname": "김코딩",
    "password": "1234"
  }
```

### 권한부여자 동작 확인
`/GET` 
```
  # header
  Authorization: Bearer {TOKEN}
```

## Cleanup
 
Delete the stack   
  ```bash
  serverless remove
  ```

# ipf-c2g

iPortfolio의 CodeCommit 저장소를 Github 저장소로 옮겨주는 사내용 도구입니다.

## 사용법

```
npx ipf-c2g <CodeCommit 저장소 이름> [Github 저장소 이름]
```

- CodeCommit 저장소 이름: 필수값
- Github 저장소 이름: 선택값 (명시하지 않으면 CodeCommit 저장소와 동일한 이름으로 생성합니다. )

## 선행 조건

- iPortfolio CodeCommit 저장소에 접근이 가능한 컴퓨터에서 실행합니다.
  - CodeCommit에 SSH key 등록이 되어 있어야 합니다.
- iPortfolio Github 저장소에 접근이 가능한 컴퓨터에서 실행합니다.
  - Github에 SSH key 등록이 되어 있어야 합니다.
- [github cli 실행 환경](https://github.com/cli/cli#installation)이 필요합니다.
  - github cli를 통해 로그인이 되어 있어야 합니다. (최초 실행시 1회)
    ```
    gh auth login
    ```
- [nodejs 12+ 실행 환경](https://nodejs.org/en/)이 필요합니다.

## 이 도구가 실제로 하는 일

1. 지정한 CodeCommit 저장소를 임시 디렉토리에 클론합니다.
2. 새 Github 저장소를 비공개 및 ipf-dev가 오너인 상태로 생성합니다.
3. 클론한 저장소를 Github 저장소에 푸시합니다.
4. 임시 디렉토리를 삭제합니다.

## 유의점

- 저장소의 Description 정보는 자동으로 옮겨주지 않습니다.

## 이 도구의 특징

### 아주 약간, 정말 아주 약간 더 편합니다.

어쩌면 수동으로 하는 것이 더 안전하고 편할지도 모릅니다.

### 안전(?)합니다.

보안상 민감할 수 있는 인증 관련 정보는 모두 당신의 컴퓨터 환경에 의존합니다.  
코드가 직접 인증 정보를 가지고 있거나 저장하지 않습니다.

### 힙합니다.

나온 지 한 달도 채 되지 않은 github cli 도구를 사용합니다.(딱 한 줄)  
이렇게 힙할 수가 없습니다.

### 썩 우아하지는 않은 도구입니다.

예외 상황이 발생할 경우 결국 수동으로 해야할 수 있습니다.

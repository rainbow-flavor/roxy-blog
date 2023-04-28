---
id: peer-dependency
title: Peer Dependency란?
authors: hank
tags: [npm, package, node, peer depedency, peerDependencies]
keywords: [npm, package, node, peer depedency, peerDependencies가 뭐에요]
last_update:
    date: 4/1/2023
    author: hank
---


## 하위 종속성 처리

```markdown
node_modules
|_ A
| |_ node_modules
|   |_ B@1.1.0
|_C
| |_ node_modules
|   |_ B@2.1.0
|_D
  |_ node_modules
    |_ B@1.1.9
```

A, C, D 모두 "B"라는 같은 패키지를 의존하지만 버전이 각자 다른 상황이 있습니다. 

이럴 때 `npm`은 A,C,D 모듈이 서로 방해되지 않게 각자 사본을 생성해서 하위 종속성을 훌륭하게 처리합니다.

그러나 여기서 발생할 수 있는 문제가 있습니다.
- 설치된 B의 버전이 각 모듈마다 다르다면 문제가 생길 수 있다.
- **사본을 매번 생성하여 최종 프로덕션의 크기가 너무 방대해질 수 있다.** 

이럴 때 "B"를 Peer Dependency로 패키지와 버전을 선언해줄 경우 패키지 관리자가 하나로 통일해서 처리해줄 수 있습니다.

## peer depdencey

```json title="package.json"
{
  ...,
  "peerDependencies": {
    "react": "^17.0.0",
    "react-dom": "^17.0.0",
    "styled-components": "^5.3.5"
  },
  ...
}
```

peer depedency를 작성함으로써 우리는 사용자가 설치해야할 종속성을 명시해줄 수 있습니다. 예를 들어 리액트 컴포넌트 라이브러리를 개발했다면
사용자의 앱에 설치할 때 리액트를 통째로 들고 올 것이 아니라, 해당 앱에 설치되어 있는 리액트를 사용하도록 말할 수 있습니다.

얻을 수 있는 장점






## 참고

https://nodejs.org/en/blog/npm/peer-dependencies

https://dev.to/thawkin3/understanding-dev-peer-and-regular-dependencies-gmi
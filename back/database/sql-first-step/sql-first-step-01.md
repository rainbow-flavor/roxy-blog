---
id: sql-first-step-01
title: 1장 데이터베이스와 SQL
authors: hank
tags: [hank, DB, DBMS, RDBMS, mysql, PostgreSQL, DML, DDL, DCL]
keywords: [SQL 첫걸음, DB, DBMS, RDBMS, mysql, PostgreSQL, DML, DDL, DCL]
last_update:
    date: 11/30/2023
    author: hank
---

# 1장 데이터베이스와 SQL

> **DB**: Database <br/>
> **DBMS**: Database Management System


데이터베이스는 구조화된 정보 또는 데이터의 조직화된 모음으로서 일반적으로 컴퓨터 시스템에 전자적으로 저장됩니다. 데이터베이스는 일반적으로 데이터베이스 관리 시스템(DBMS)에 의해 제어됩니다. 연결된 애플리케이션과 함께 데이터와 DBMS를 하나로 묶어 데이터베이스 시스템이라고 하며 단축하여 데이터베이스라고도 합니다.

## DBMS의 종류


데이터베이스의 사용 용도나 이를 제어하는 환경 등 각각의 조건에 들어맞는 다양한 DBMS들이 존재합니다. 데이터를 저장하는 방법에 따라 분류할 수 있습니다.

1. 계층형 데이터베이스 / 네트워크형 데이터베이스 <br/>
   역사가 오래된 DBMS로 폴더와 파일 등의 계층 구조로 데이터를 저장하는 방식입니다. 하드디스크나 파일 시스템이 대표적입니다. 이 모델들은 포인터(주로 물리적 디스크 주소)를 사용하여 한 레코드에서 다른 레코드로의 관계를 추적하는 것이 특징이었습니다.
   - 계층형 모델은 트리 구조로 설계되었습니다. 하나의 레코드는 Node라고도 불리며 상위 Node가 삭제되면 하위의 모든 노드들 또한 같이 삭제됩니다.
   - 네트워크형 모델은 이 부분을 개선하고자 Node가 여러 부모, 자식을 가질 수 있도록 개선했습니다. 계층형 모델보다 더욱 자연스러운 관계를 맺을 수 있게 되었지만 관계형 데이터베이스가 등장하면서 대체됩니다. (실제로 RDBMS의 시초인 [Edgar F. Codd](https://en.wikipedia.org/wiki/Edgar_F._Codd)는 네트워크형 RDBMS인 CODASYL을 개발한 회사인 IBM에서 근무했었는데 검색 기능이 없는 것이 불만이었다고 합니다.)
     <br/><br/>
2. `관계형 데이터베이스(RDBMS)` <br/>
   행과 열로 이루어진 2차원의 표 형식 데이터를 저장하는 방식입니다. 수많은 데이터를 “Key”와 “관계”라는 키워드에서 SQL이라는 언어를 사용해 원하는 데이터를 조회하고 가공합니다.
   <br/><br/>
3. 객체지향 데이터베이스 <br/>
   객체지향 프로그래밍이 부상하면서 데이터를 객체로 취급하고 저장하는 방식입니다. 프로그래밍된 객체와 데이터베이스 테이블 간의 변환의 불편함을 해결하기 위해 등장했습니다.
   <br/><br/>
4. XML 데이터베이스 <br/>
   XML이란 자료 형식으로 데이터를 저장하는 방식입니다. XQuery라는 전용 명령어를 사용합니다.
   <br/><br/>
5. Key Value Store (K/SV) <br/>
   Key와 그에 대응하는 값이라는 단순한 형태로 데이터를 저장합니다. NoSQL이라는 슬로건으로부터 생겨났으며 열 지향 데이터베이스라고도 합니다. 해시 테이블, Map, Dictionary와도 유사합니다.
   <br/><br/>

## RDBMS 

관계형 데이터베이스는 여러 소프트웨어가 출시되었고 현재 가장 많이 쓰이고 있습니다. 같은 SQL을 사용하더라도 소프트웨어마다 문법이 달라지는 부분이 생기면서 ANSI(미국 국립 표준 협회)에서 ‘SQL-92’, ‘SQL-2003’ 등 표준 SQL을 발표했습니다.

- `Oracle` : Oracle 회사에서 개발했으며 역사가 깊습니다.
- `DB2` : IBM이 개발하였으나 Oracle에 밀렸습니다.
- `SQL Server` : 마이크로소프트가 개발하였으며 윈도우 플랫폼에서만 동작합니다.
- `MySQL` : 오픈소스 커뮤니티가 개발했으며 무료 오픈소스였으나 2009년 Oracle에 의해 인수되면서 기존 SQL 커뮤니티 유저들이 우려가 많았습니다. 현재는 MySQL의 원년 멤버들이 개발 주도한 MariaDB라는 무료 오픈소스 소프트웨어도 많이 사용되고 있습니다.
- `SQLite` : 오픈소스 커뮤니티가 개발했으며 임베디드 시스템(주로 안드로이드)에서 자주 사용됩니다.
- `PostgreSQL` : 캘리포니아 대학교에서 추진하여 무료 오픈소스로 개발되었으며 2022년 스택오버플로우 기준으로 MySQL을 제치고 인기투표 1등으로 꼽혔습니다. 대표적인 컨셉은 모든 기능을 갖춘 객체관리형 데이터베이스(ORDBMS), 다양한 운영체제에서 사용 가능한 크로스플랫폼 데이터베이스입니다.



## SQL

SQL은 IBM이 개발한 SEQUEL이라는 관계형 데이터베이스 조작용 언어를 기반으로 만들어졌으며 현재는 표준 언어입니다. SQL 명령은 총 3가지로 나눌 수 있습니다.

- DML(Data Manipulation Language)
  데이터를 추가하거나 삭제, 갱신 등 데이터를 조작할 때 사용됩니다.
- DDL(Data Defenition Language)
  데이터베이스는 데이터베이스 객체를 이용하여 데이터를 관리하는데 이 같은 객체를 만들거나 삭제하는 명령어입니다.
- DCL(Data Control Language)
  트랜잭션을 제어하거나(Transaction Control Language) 데이터 접근권한을 제어하는 명령이 포함되어 있습니다.

## reference

:::tip
[SQL 첫걸음](https://www.yes24.com/Product/Goods/22744867)을 읽으면서 조사한 내용과 종합해서 작성했습니다.
:::

- https://www.oracle.com/kr/database/what-is-database/
- https://en.wikipedia.org/wiki/Database
- https://thebook.io/006977/0020/
- https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=skout123&logNo=50147360337
- https://cleancommit.io/blog/why-use-postgresql-for-your-next-project/
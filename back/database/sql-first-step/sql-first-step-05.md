---
id: sql-first-step-05
title: 5장 집계와 서브쿼리 - 집계
authors: hank
tags: [hank, SQL 첫걸음, mysql, 집계함수, COUNT, AVG, SUM, MIN, MAX]
keywords: [SQL 첫걸음, mysql, 집계함수, COUNT, AVG, SUM, MIN, MAX]
last_update:
    date: 12/09/2023
    author: hank
---

## 행 개수 구하기 - COUNT

```sql
SELECT COUNT(열명) FROM 테이블명;
```

SQL은 데이터베이스라 불리는 “데이터 집합”을 다루는 언어입니다. 또한 집합의 개수나 합계를 다루는 집계함수들을 제공합니다. 일반적인 함수가 인수가 값이라면 집계함수는 인수가 집합입니다.

![sql-first-step-14](../img/sql-first-step-14.png)

*은 모든 컬럼을 의미합니다만 `COUNT`에서는 테이블 전체라는 의미가 됩니다. 테이블의 모든 레코드가 담겨있는 집합이 인수가 되었고 `COUNT` 는 그 집합의 총 개수를 반환합니다. 집합에 들어있는 레코드들의 개수와 상관없이 하나의 값을 반환하기 때문에 결괏값은 하나의 행만 반환됩니다.

![sql-first-step-15](../img/sql-first-step-15.png)

WHERE 구로 집계될 집합의 조건을 작성할 수 있습니다. 이또한 마찬가지로 결괏값은 하나의 행만 반환됩니다.

![sql-first-step-16](../img/sql-first-step-16.png)

COUNT에서는 다음과 같이 *뿐만 아니라 특정 컬럼 또한 집계가 가능합니다. 모든 열을 카운트할 때는 NULL인 값이 존재하더라도 집계되지만 컬럼을 지정해 집계한다면 값이 `NULL`인 경우에는 무시됩니다.

### SELECT DISTINCT

```sql
SELECT DISTINCT 열명 FROM 테이블명;
SELECT ALL 열명 FROM 테이블명;
```

`SELECT` 명령어 뒤에 사용되는 `DISTINCT` 는 집합 안에 중복된 값을 제거하는 함수입니다. 반대로 `ALL` 은 전체를 가져오는 함수이며 생략할 시 ALL이 적용됩니다.

- `NULL` 도 예외없이 중복으로 제거되고 한개의 레코드만 남습니다.

<br/>



### DISTINCT과 COUNT를 같이 사용할 때

```sql
SELECT DISTINCT COUNT(열명) FROM 테이블; // X
SELECT COUNT(DISTINCT 열명) FROM 테이블; // O
```

`SELECT DISTINCT`와 COUNT는 같이 사용되지 못합니다. 위 쿼리문에서 첫번째 쿼리는 COUNT가 먼저 계산되어 DISTINCT가 적용되지 않은 상태로 모든 열을 집계해버립니다.

다행히 집계함수의 인수에 DISTINCT를 수식자로 사용할 수 있습니다. 집합에서 중복을 제거하고 집계를 하려면 아래 쿼리문의 방법으로 사용해야 합니다.


<br/>



## COUNT 이외의 집계함수

```sql
SELECT SUM(열명) FROM 테이블명;
```

`SUM`은 집합에서 합계를 구하는 집계함수입니다.

- 문자열형, 날짜시간형은 계산 불가
- NULL은 무시


<br/>



```sql
SELECT AVG(열명) FROM 테이블명;
SELECT AVG(
	CASE 
		WHEN 열명 IS NULL 
		THEN 0
		ELSE 열명 
	END
);
```

`AVG` 은 집합에서 평균을 내는 집계함수입니다. SUM / COUNT를 하지 않더라도 AVG만으로 평균을 계산할 수 있습니다.

- AVG에서 NULL을 무시하기 때문에 NULL을 0으로 치환하는 CASE를 사용하기도 함.


<br/>



```sql
SELECT MIN(열명1), MAX(열명2) FROM 테이블명;
```


`MIN`과 `MAX` 를 사용하면 최솟값과 최댓값을 구할 수 있습니다.

- 문자열형과 날짜시간형 또한 사용가능
- 문자열형은 유니코드의 순서대로 계산됩니다.


<br/>



![sql-first-step-17](../img/sql-first-step-17.png)

문자열, 날짜시간형은 지원안되는 함수 또한 집계할 수 있는 타입으로 인자를 넣는 것도 방법이 될 수 있습니다.
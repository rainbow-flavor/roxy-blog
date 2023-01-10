---
id: change-username
title: linux 유저명 변경하기
authors: irostub
tags: [irostub, linux, usermod, groupmod]
---

# 리눅스 유저명 변경
리눅스 유저명(로그인 아이디) 를 변경하는 방법을 알아봅시다.
## 환경
- Ubuntu 22.04.1 LTS (GNU/Linux 5.15.0-1012-raspi aarch64)
- 기존 유저명 : ubuntu
- 변경 유저명 : irostub

## 명령
### 순서
1. 임시계정 생성
2. 로그아웃
3. 임시계정 로그인
4. 기존 리눅스 유저명을 변경
5. 로그아웃
6. 바뀐 리눅스 유저명으로 로그인 
7. 임시계정 삭제

### 임시 sudo 계정 추가
계정명 변경 작업을 해주기 위해 임시로 접속할 sudo 계정을 추가한다.
계정 추가 시 비밀번호 설정만 해주고 나머지는 전부 공백으로 두고 넘어간다.
```shell
sudo adduser temp_user
sudo adduser temp_user sudo
```

### 계정 로그아웃
추가를 마쳤으면 접속을 끊고 나온다.
```shell
exit
```

### 임시 sudo 계정으로 접속
임시로 만든 sudo 계정으로 서버에 다시 접속한다.  
```shell
ssh temp_user@192.168.0.1
```

### 리눅스 유저명 변경
서버에 임시 sudo 계정으로 접속하면 다음 명령어를 실행한다. 다음 두 명령을 실행하고나면 유저명과 홈디렉토리명이 변경된다.
```shell
sudo usermod -l 변경_유저명 기존_유저명
sudo usermod -d /home/변경_유저명 -m 변경_유저명
```
예시)
```shell
sudo usermod -l irostub ubuntu
sudo usermod -d /home/irostub -m irostub
```

### 유저의 그룹 변경
ubuntu 그룹명을 변경하는 유저명의 그룹으로 바꾼다.
```shell
sudo groupmod -n irostub ubuntu
```

### 임시 sudo 계정 로그아웃
리눅스 유저명 변경 작업을 마쳤다면 임시 sudo 계정을 삭제해주기 위해 접속을 끊고 나온다.
```shell
exit
```

### 변경한 유저명으로 서버 접속
```shell
ssh irostub@192.168.0.1
```

### 임시로 생성한 sudo 계정 삭제
임시로 생성한 sudo 계정을 삭제한다. 그리고 임시계정의 홈디렉토리도 제거한다.
```shell
sudo deluser temp_user
sudo rm -rf /home/temp_user
```

## 추가 설명
### usermod
유저 계정에 대해 수정하는 명령

***사용한 옵션***
> -l  유저명(로그인 아이디)를 변경할 때 사용한다.  
> -d  사용자의 홈 디렉토리를 변경할 때 사용한다.  
> -m  해당 옵션은 -d 옵션과 같이 사용되며, 디렉토리 변경 시 기존에 사용하던 파일과 디렉토리를 모두 옮겨줄 때 사용한다.

A 의 로그인 아이디를 B 로 변경한다.
```shell
sudo usermod -l B A
```

B 유저의 의 홈디렉터리를 변경한다. 추가로 모든 B의 사용하던 파일을 옮겨준다.
```shell
sudo usermod -d /home/B -m B
```
### groupmod
그룹 정보를 수정하는 명령

***사용한 옵션***
> -n 그룹의 명칭을 변경할 때 사용한다.

A 그룹명을 B 로 변경한다.

```shell
groupmod -n B A
```
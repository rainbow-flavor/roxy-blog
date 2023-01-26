---
id: gpg-copy-to-other-machine
title: 다른 기기로 gpg 키 복사 및 커밋 서명
authors: irostub
tags: [irostub,2021,gpg,git,mac,troubleshooting]
keywords: [gpg,gnupg,key,git,import,export,mac,How to export and import gpg key commit sign other machine]
last_update:
  date: 2/26/2021
  author: irostub
---

# 다른 기기로 gpg 키 복사 및 커밋 서명

얼마전에 새로운 맥북과 서브 데스크톱을 구매했습니다. 새로운 기기에서도 역시나 깃을 사용해야 했기 때문에 커밋 서명(git commit sign)에 필요한 GPG 키를 기존 메인 데스크톱에서 가져와야했습니다.
하지만, GPG 키를 복사해서 새로운 환경에서 가져오는 가이드를 찾을 수 없었습니다.
그래서 이번 기회에 직접 부딛혀서 GPG 키를 복사하여 옮긴 뒤 새로운 기기에서 서명하는 과정을 적어봅니다.

:::tip 과정 요약
1. 기존 데스크톱에서 GPG Key 를 Export 하기
2. 새로운 기기에서 GPG Key 를 Import 하기
3. 가져온 키 확인 및 오류 해결
4. (git commit sign 을 위한 옵션) 깃 커밋 서명 설정
5. 시원한 오렌지 주스 한잔
:::
## **기존 데스크톱에서 GPG Key 를 Export 하기**

macOS 기준으로 terminal 을 켭니다.

- {...}, 다음과 같이 중괄호로 표기한 부분은 중괄호를 제외하고 입력합니다.
- gpg --list-keys 명령을 실행하면 출력결과가 다음과 같이 나옵니다.

  uid [상태] 키 아이디(별칭) <이메일>

아래 명령에서 {키 아이디}를 키 리스트 출력에서 얻은 키 아이디로 넣어줍니다.
내보낸 키의 저장 경로는 현재 터미널이 위치한 디렉터리에 저장됩니다.

### 공개키 내보내기(public key export)

```liquid
gpg --list-keys
gpg --export {키 아이디} > public.key
```

### 개인키 내보내기(private key export)

```liquid
gpg --list-secret-keys
gpg --export-secret-key {키 아이디} > private.key
```

### **안전한 방법으로 키를 옮기기**

scp 파일 전송이나 보안매체 등을 이용하여 가져올 기기로 옮깁니다.
필자는 개인 NAS 로 옮겼습니다.

## **새로운 기기에서 GPG Key 를 Import 하기**

새로운 기기에서 터미널을 실행합니다. 이후 키를 옮긴 디렉터리로 이동합니다.
윈도우의 경우 dir 명령을 사용하여 현재 디렉터리 리스트를 출력하고
맥의 경우 ls 명령을 사용하여 현재 디렉터리 리스트를 출력합니다.
두 경우 모두 cd 명령을 사용하여 이동할 수 있습니다.

### 새로운 기기에 GPG 설치

MacOS

```liquid
brew install gnupg
```

Windows

```
Gpg4win 을 설치합니다
https://gnupg.org/download/
```

### 공개키 가져오기(public key import)

```liquid
gpg --import public.key
```

### 개인키 가져오기(private key import)

```liquid
gpg --import private.key
```

## 가져온 키 확인 및 오류 해결

키를 import 했다면 아래 명령어를 실행해봅니다.

```
echo "test" | gpg --clearsign
```

만약 다음과 같은 오류가 나온다면

```
gpg: signing failed: Inappropriate ioctl for device
gpg: [stdin]: clear-sign failed: Inappropriate ioctl for device
```

.zshrc 파일 혹은 .bashrc 파일에 다음 줄을 추가 후 다시 명령을 실행해줍니다.

```
export GPG_TTY=$(tty)
```

정상적으로 실행이 되면 Passphrase 를 입력하라고 터미널에 나타나며 서명 시에 사용했던 암호를 입력해줍니다.
이 과정을 마치면 다음이 출력됩니다.

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

test
-----BEGIN PGP SIGNATURE-----
{...somthing}
----END PGP SIGNATURE-----
```

이 상태에서 맥의 키체인에 등록하여 커밋 서명 시 항상 비밀번호를 입력하지 않아도 되도록 할 수 있습니다.
하지만, 키체인 등록은 잠시 미뤄두고 깃 서명 설정을 먼저 하겠습니다.

## 깃 커밋 서명 설정

우선 개인키 리스트를 출력하여 키 이름을 뽑아냅니다.

```
gpg --list-secret-keys
```

위 명령어를 실행하면 다음과 같이 출력될 것입니다.

```
sec 	rsa4096 2021-02-01 [SC]
		ABCDEFGHIJKLMNOP1234567890
uid 		[ultimate] Kim <kim@rainbow.com>
ssb rsa4096 2021-02-01 [E]
```

여기서 **ABCDEFGHIJKLMNOP1234567890** 부분을 적어두세요. 이것이 키 이름이 됩니다.
키 이름을 적었다면 다음을 실행합니다.
다음 명령어를 실행하는 이유는

- 첫번째, 매 커밋 서명마다 어떤 gpg 키를 사용할지 적고싶지 않습니다.
- 두번째, 커밋 서명마다 -S 옵션을 붙이고싶지 않습니다. 그렇기 때문에 다음 명령어를 실행합니다.

```
git config --global user.signingkey ABCDEFGHIJKLMNOP1234567890
git config --global commit.gpgsign true
```

# 축하합니다!

이제 새로운 기기에서 기존의 GPG 키를 사용해 깃 커밋 서명을 원활하게 진행할 수 있습니다.

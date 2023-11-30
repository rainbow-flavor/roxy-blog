---
id: next-folder-architecture
title: Next.js 폴더 아키텍쳐 
authors: Hank
tags: [hank, Next.js, directory architecture, 리액트, 폴더 구조, 폴더 설계]
keywords:
- directory architecture
- next.js directory architecture
- next.js folder architecture 
last_update:
  date: 3/18/2023
  author: hank
---

# ⛰️ Next.js 폴더 아키텍쳐

```
📦 structure
┣ 📂 public
┣ 📂 pages
┃  ┣ 📂 nft
┃  ┃  ┣ 📜 index.page.tsx
┃  ┃  ┗ 📂 src
┃  ┃     ┣ 📂 features
┃  ┃     ┣ 📂 hooks
┃  ┃     ┗ 📂 ui
┃  ┣ 📂 src
┃  ┃  ┗ 📂 app
┣ 📂 src
┃  ┣ 📂 api
┃  ┣ 📂 assets
┃  ┣ 📂 atoms
┃  ┣ 📂 common
┃  ┣ 📂 constants
┃  ┣ 📂 container
┃  ┣ 📂 contracts
┃  ┣ 📂 hooks
┃  ┣ 📂 layouts
┃  ┣ 📂 lib
┃  ┣ 📂 styles
┃  ┣ 📂 types
┃  ┗ 📂 utils
```

:::tip 권고사항
제 폴더 구조는 dApp 클라이언트 소스를 기준으로 잡아서 contracts 사항은 가볍게 넘기셔도 좋을 것 같습니다. 
:::


보통 컨벤션들에서는 features라는 폴더에서 특정 기능이나 영역 또는 도메인을 기준으로 그룹핑해서 독립적이고 재사용 가능한 모듈로 정리해놓거나 components 폴더에서 도메인의 이름으로 폴더를 생성하는 방법으로 개발자들간의 충돌을 예방합니다.

그러나 제 실무 상황에서는 도메인마다 다양한 기능과 UI/UX, 데이터들이 있어서 **도메인에 종속된 컴포넌트들은 결국 그 페이지를 벗어나서 사용될 일이 크게 많지 않았다고 느꼈고 오히려 그 모듈이 사용되는 페이지와 다른 폴더에 있어서 매번 찾는 피곤함을 느꼈습니다.**

우리는 **도메인에 종속적인 컴포넌트들과 재사용 가능한 컴포넌트를 효율적으로 분리**할 방법을 서칭하던 중 Next.js에서 특정 설정들을 발견했습니다.

> 폴더 설정 옵션에 관한 Next config 글
**테스트 파일이나 컴포넌트에서 사용하는 기타 파일을 페이지 디렉토리에 배치할 수 있습니다. next.config.js 내에 pageExtensions 구성을 추가합니다**
- [https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions#including-non-page-files-in-the-pages-directory](https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions#including-non-page-files-in-the-pages-directory)
>

다음 옵션들로 하여금 우리는 지금의 불편함을 해소할 새로운 Directory 구조를 찾아낼 수 있었고 소개합니다.

`pages` 폴더에서는 각 도메인(route)마다 페이지 파일(index.page.tsx)과 철저히 도메인에 종속된 ui, hooks, features들을 해당 도메인 src폴더에 담아 묶었습니다.

`src` 폴더에서는 공용적으로 사용되고 재사용되는 모듈, UI, Hooks, third party, 함수, 상수, 타입 등이 관리됩니다.

## 📂 pages

```
📂 pages
┣ 📂 domain
┃  ┣ 📜 index.page.tsx
┃  ┗ 📂 **src**
┃     ┣ 📂 features
┃     ┣ 📂 hooks
┃     ┗ 📂 ui
┣ 📂 src
┃  ┗ 📂 app
```

### pages/app

```tsx
const App = ({ children }: Props) => {
  const language = useRecoilValue(languageState)
  useInternationalLanguageInit(language)

  return (
    <AuthContainer>
      <AppWrapper>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </AppWrapper>
    </AuthContainer>
  )
}
```

pages의 app 폴더에서는 Next.js가 라우팅하는 페이지 전체에 사용되는 `AppLayout` 모듈과 스타일들이 들어갑니다.

- Header
- Main
- Footer
- 외부 context (언어, 인증, 블록체인 연결)

### pages/domain

```
📂 domain
┣ 📜 index.page.tsx
┣ 📜 [dynamic].page.tsx
┗ 📂 src
 ┣ 📂 features
 ┣ 📂 hooks
 ┗ 📂 ui
```

폴더의 이름은 domain 또는 해당 리소스의 명칭으로 정해집니다.

여기서 크게 page와 src로 다시 한번 분리합니다.

#### 1. pages/domain/(index.page.tsx / [dynamic].page.tsx)

```tsx
// index.page.tsx
const NFTPage: NextPage = () => {
  return (
    <CommonMainLayout>
      <SectionLayout
        title='NFT'
        description='NFT의 소개 문구'
      >
        <ConnectCard />

        <SectionLayout.Content title='NFT Slot'>
          <AsyncBoundary>
            <NFTDetail />
          </AsyncBoundary>
        </SectionLayout.Content>

        <SectionLayout.Content title='NFT Reward'>
          <NFTReward />
        </SectionLayout.Content>
      </SectionLayout>
    </CommonMainLayout>
  )
}

export default ProductPage
```

page.tsx는 최상단에서 렌더링되며 주로 레이아웃과 ErrorBoundary로 모듈들을 wrapping하는 형태입니다.

Next.js의 server-side 함수로직이 들어가거나 private한 라우팅을 관리하는 코드를 작성합니다.

#### 2. pages/domain/src

> 😝NFTReward의 경우  src/features 폴더로 이동됩니다.
>

```tsx
// src/features/NFT-reward/index.tsx
const NFTReward = () => {
  const { t } = useI18next()
  const { rank } = useWalletQuery()
  const { defaultOptions, onPrev, onNext, currentIndex } = useSwiper(
    nftPercentList.findIndex((item) => item.name === (rank ?? 'E'))
  )

  return (
    <NFTRewardWrapper>
      <ContentField>
        <NFTRewardSwiperField>
          <NFTRewardSwiper
            {...defaultOptions}
            modules={[Navigation]}
            allowTouchMove
          >
            {nftPercentList.map((info) => <NFTRewardItem data={info} />)}
          </NFTRewardSwiper>
      </ContentField>
    </NFTRewardWrapper>
  )
}

export default NFTReward
```

던전 페이지에서 사용되고 있는 NFTReward 컴포넌트입니다. 게이트 보상을 슬라이드 형태로 보여주는 모듈입니다.

`src/features` 에 들어가는 모듈의 경우

- **외부에서 주입받는 props가 없어야 합니다**.
- react-query, hooks, recoil, context를 활용하여 최대한 독립적으로 동작할 수 있도록 작성해야 됩니다.

> 😝useWalletQuery의 경우  src/hooks 폴더로 이동됩니다.
>

```tsx
const getHasRank = async (address: string) => {
  ...
}

const useWalletQuery = () => {
  const { isLoggedIn, address } = useAuth()

  const queryState = useQuery(
			...
  )

  return {
    ...queryState,
    rank: queryState.data?.rank,
    hasRank: queryState.data?.hasRank
  }
}

export default useWalletQuery
```

NFT 페이지 전체에서 사용되고 있는 useWalletQuery 커스텀 훅스입니다. 블록체인 상에서 해당 지갑의 rank를 조회하는 로직을 담고 있습니다.

`src/hooks` 에는 다음과 같이 도메인 내에서 재사용되거나 분리가 필요한 Custom Hook들이 들어갑니다.

> 😝NFTRewardItem의 경우  src/ui 폴더로 이동됩니다.
>

```tsx
interface Props {
	src: string
	name: string
}

const NFTRewardItem = ({src, name}: Props) => {
	return (
		<SwiperSlide>
      <FullWidthImage size={172} src={src} alt='' />

      <RankValueUnit> {t(`${name}-Rank NFT`)}</RankValueUnit>
    </SwiperSlide>
	)
}

export default NFTRewardItem
```

위 feature에서 언급된 NFTReward 모듈의 슬라이드에 들어갈 UI 컴포넌트입니다. 게이트 보상 정보 데이터를 주입하면 그대로 알맞게 표시하는 역할입니다.

`src/ui` 에 들어가는 모듈의 경우

- 철저하게 외부에서 데이터를 props로 받는 형식이여야 합니다.
- 케이스에 따라 Context, recoil등을 활용하여 props를 쓰지 않아도 될 때는 features나 해당 feature 폴더안에 넣어줍니다.
  ex)
  src - features - gate-reward  - index.tsx
  - gate-reward-item - index.tsx
- 도메인의 데이터, entity와 겹치는 네이밍을 변수 또는 props로 사용하는 것은 괜찮지만 UI 로직만 작성되어 있기를 권장합니다.

### 정리

```
📂 nft
┣ 📜 index.page.tsx
┗ 📂 src
 ┣ 📂 features
 ┃ ┗ 📂 nft-reward
 ┃    ┣ 📂 nft-reward-item(props가 없을 경우)
 ┃    ┣ 📜 index.tsx
 ┃    ┗ 📜 style.ts
 ┣ 📂 hooks
 ┃  ┗ 📜 use-wallet-query.ts
 ┗ 📂 ui
   ┗ 📂 nft-reward-item
     ┣ 📜 index.tsx
     ┗ 📜 style.ts
```

---

## 📂 api

```tsx
// ~/api/nft.ts
import { QueryKey } from '~/constants/query'
import api from '~/lib/api'
import { HunterRankType } from '~/types/common'

export const getNFTName = async (name: string) => {
  return await api.post(QueryKey.SET_NFT_NAME, {
    ...
  })
}
```

블록체인 상을 제외하고 백엔드 서버와 통신하는 함수들을 관리하고 있습니다.

- api에 요청할 때 사용되는 parameter와 body, URL 등을 명시해놓은 함수
- `api` : lib/api의 axios 모듈 사용
- `QueryKey` : constatns/query.ts의 상수 객체 사용
- URL은 constatns/query.ts의 상수객체에 함수의 이름을 `Uppercase` 한 것으로 선언해야 합니다.

😀정리

```tsx
// ~/constants/query.ts
export const enum QueryKey {
    SET_NFT_NAME = '/nft/name',
    ...
}

// ~/api/season.ts
export const setNFTName = async () => {
	const { data } = await api.get(QueryKey.SET_NFT_NAME)
	return data;
}
```

---

## 📂 assets

프로덕트 내에서 로컬로 관리되는 이미지, svg 아이콘 등 에셋을 관리하고 있습니다.

---

## 📂 atoms

recoil을 사용한 전역 상태관리와 관련 selector 등은 해당 폴더에서 관리하고 있습니다.

```tsx
import { atom } from 'recoil'

import { User } from '~/types/wallet'

export const userState = atom<User | null>({
  key: 'user',
  default: null
})
```

---

## 📂 common

공용적으로 재사용되는 컴포넌트들을 관리하고 있습니다.

크게 UI 컴포넌트들과 기능성 컴포넌트들을 관리하고 있습니다.

### 1. UI component

주로 디자인 시스템 패키지에 없지만 프로덕트 내에서 재사용되는 UI들은 **common**에서 관리하고 있습니다.

순수하게 UI 로직과 스타일만 작성하도록 권장합니다.

UI component와 관련된 Component, Story, Style, Types, Context 파일들을 관리하고 있습니다.

```markdown
📂 common
┗ 📂 button
 ┣ 📜 index.tsx
 ┣ 📜 index.stories.tsx
 ┗ 📜 style.ts
```

- common에 들어가는 컴포넌트들은 스토리와 테스트 케이스들을 작성하도록 권장하고 있습니다.

### 2. Feature Component

```tsx
const AsyncBoundary = ({
  errorComponent,
  errorText,
  loadingComponent = <LoadingIcon size={50} />,
  children
}: Props) => {
  const isMounted = useIsMounted()

  if (!isMounted) return <></>

  return (
    <ErrorBoundary
      fallbackRender={() => (
        <>{errorComponent || <ErrorComponent errorText={errorText} />}</>
      )}
    >
      <Suspense fallback={<LoadingBox>{loadingComponent}</LoadingBox>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

export default AsyncBoundary
```

다음과 같이 스타일이나 UI가 아니더라도 기능성 컴포넌트가 재사용 목적이 확실하다면  **common**에서 관리합니다.

---

## 📂 constants

```tsx
export const enum InternalPath {
  NFT = '/nft',
  ...
}

export const ERC20Abi: ContractInterface = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function'
  }
]

export const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY
```

상수 데이터 객체나 Enum을 관리합니다.

- 상수 변수는 `UPPER_CASE` 이름을 지어야합니다.
- Enum 객체는 변수 네이밍은 `PascalCase`로 선언하고 enum의 키값은 `UPPER_CASE` 로 선언해야 합니다.
- config 관련 환경변수들은 폴더를 분리하여 관리하는 것도 좋은 방법입니다.

---

## 📂 container

```tsx
const RedirectContainer = ({ redirect, children }: Props) => {
  const { status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status !== 'authenticated') {
      push(redirect)
    }
  }, [])

  return <>{children}</>
}

export default RedirectContainer
```

주로 외부 컨텍스트나 라우팅, 세션 등 최상단에 있는 컨텍스트들을 주입해주거나 Children과 상관없이 취해야 하는 Action들이 있을 때 Container로 분리하여 재사용됩니다.

---

## 📂 contracts

```tsx
import ContractABI from './abi/nft.abi.json'

class NFTContract extends ContractBase {
  constructor() {
    super(ContractABI.address, ContractABI.abi)
  }

  public async getNFTName(
    nftId: number
  ): Promise<NFT> {
    const nft = await this.contract.getNFTName(nftId);
    
    return nft.name
	...
}

export default NFTContract
```

스마트 컨트랙트 객체의 method, arg, return 타입 등을 Class 문법으로 타이핑하고 있습니다.

해당 폴더에는 스마트 컨트랙트 객체 인스턴스를 생성할 때 필요한 `abi` 와 컨트랙트 주소 데이터, Class 모듈들이 관리됩니다.

😀정리

```
📂 contracts
┣ 📂 abi
┃ ┗ 📜 nft.abi.json
┣ 📜 contract.ts
┗ 📜 nft.ts
```

---

## 📂 hooks

```tsx
// ~/hooks/useToggle.ts
const useToggle = (initalValue?: boolean) => {
  const [toggle, setToggle] = useState(initalValue)

  const handleToggle = () => {
    setToggle((prev) => !prev)
  }

  return { toggle, handleToggle }
}

export default useToggle

// ~/hooks/queries/useUserQuery.ts
const useUserQuery = () => {
  const setUserState = useSetRecoilState(userState)

  const queryState = useQuery([QueryKey.FETCH_USER], fetchUser, {
   ...
  })

  return { ...queryState }
}

export default useUserQuery
```

공용적으로 재사용되는 Custom hooks 파일은 해당 폴더에서 관리됩니다.

Custom useQuery 파일들은 한 단계 더 들어가 queries라는 폴더에 따로 담습니다.

---

## 📂 layouts

```tsx
const SectionLayout = ({ children, ...SectionTitleProps }: Props) => {
  return (
    <SectionWrapper>
      <SectionTitle {...SectionTitleProps} />
      {children}
    </SectionWrapper>
  )
}
```

반복되는 레이아웃 디자인을 재사용하기 위해 모듈들을 분리하여 해당 폴더에서 관리합니다.

---

## 📂 lib

```tsx
import axios from 'axios'

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const api = axios.create({
  baseURL: API_BASE_URL
})

...

export default api
```

> axios, dayjs, wagmi, ethers, framer, i18n... 

Third party 모듈들의 config와 관련 유틸 함수들은 해당 폴더에서 관리됩니다.

---

## 📂 styles

글로벌 스타일, Mixin 등 공용, 재사용 스타일들을 관리합니다.

---

## 📂 types

공통으로 쓰이는 타입부터 도메인 타입까지 interface, type은 해당 폴더에서 관리됩니다.

---

## 📂 utils

데이터 타입을 변환하는데 쓰이는 순수함수들은 utils에서 관리되고 있습니다.

인자 타입으로 그룹화하여 파일 이름은 format-[data 유형] 형태로 짓고 있으며

그 안에는 해당 타입의 데이터를 변환하는 여러 순수 함수들이 담겨있습니다.

```tsx
// ~/utils/formatText.ts
export const insertSpacesBehindUppercase = (text: string) => {
  return text.replaceAll(/([A-Z])/g, ' $1').trim()
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const convertNewLineToHtml = (text: string) => {
  return text.replaceAll(Regex.NEW_LINE, '<br />')
}
...
```
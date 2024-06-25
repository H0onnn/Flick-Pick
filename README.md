# 🎥 Flick Pick

플릭픽과 함께, 당신의 최애 영화를 찾고 리뷰를 남겨보세요!

## 프로젝트 소개

### 내용

영화를 검색하고, 내 취향에 맞는 영화를 찾아볼 수 있는 커뮤니티입니다.

<br/>

## 프로젝트 링크

[🔗Link](https://flick-pick-iota.vercel.app//)

프로젝트는 `Vercel`을 통해 배포되었습니다.

<br/>

## 프로젝트 실행 가이드

- 실행 방법 (3가지 중 택 1)
  > 1. 배포 링크를 통한 접속
  > 2. ZIP 파일 다운로드 및 압축 풀기 후 코드 에디터로 실행
  > 3. 아래 커멘드를 이용한 실행

```bash
$ git clone https://github.com/H0onnn/Flick-Pick.git
$ yarn install
$ yarn dev
```

<br/>

## 기술 스택

#### Core

`TypeScript`, `Next14`

### DB

`prisma orm`, `supabase`

#### Convention

`eslint`, `prettier`, `yarn`

#### Network & Route

`fetch`, `Next App Router`

### Styling

`TailwindCss`, `shadcn/ui`

<br/>

## 🚀 프로젝트 상세

[추가 예정]

## 아키텍쳐

### 디렉토리 구조 (구조개편 및 설명 추가 예정)

```bash
📦 Flick-Pick
├─ .eslintrc.json
├─ .gitignore
├─ .prettierrc
├─ Dockerfile
├─ README.md
├─ app
│  ├─ (pages)
│  │  ├─ layout.tsx
│  │  ├─ movie
│  │  │  └─ [id]
│  │  ├─ page.tsx
│  │  ├─ search
│  │  └─ user
│  │     └─ info
│  │        └─ [id]
│  ├─ api
│  │  └─ auth
│  │     └─ [...nextauth]
│  ├─ features
│  │  ├─ auth
│  │  │  ├─ components
│  │  │  └─ models
│  │  ├─ movie
│  │  │  ├─ apis
│  │  │  ├─ components
│  │  │  ├─ models
│  │  │  └─ sections
│  │  ├─ review
│  │  │  ├─ apis
│  │  │  ├─ components
│  │  │  ├─ constants
│  │  │  ├─ models
│  │  │  └─ sections
│  │  ├─ search
│  │  │  ├─ apis
│  │  │  ├─ components
│  │  │  └─ hooks
│  │  └─ user
│  │     ├─ apis
│  │     ├─ components
│  │     └─ sections
│  ├─ prisma
│  │  └─ schema.prisma
│  ├─ public
│  │  ├─ icons
│  │  └─ images
│  └─ shared
│     ├─ actions
│     ├─ apis
│     │  └─ utils
│     ├─ components
│     │  ├─ async
│     │  ├─ blocks
│     │  ├─ fallback
│     │  ├─ layout
│     │  ├─ like
│     │  ├─ rating
│     │  └─ ui
│     ├─ constants
│     ├─ hooks
│     ├─ lib
│     ├─ provider
│     ├─ styles
│     ├─ types
│     └─ utils
├─ components.json
├─ declarations.d.ts
├─ middleware.ts
├─ next.config.mjs
├─ package.json
├─ postcss.config.mjs
├─ tailwind.config.ts
├─ tsconfig.json
└─ yarn.lock
```

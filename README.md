# 📱 핸드폰 마진 계산기

> 단말기와 유선 개통 마진을 정확하게 계산하는 전문 웹 도구

[![Deploy to GitHub Pages](https://github.com/[YOUR_GITHUB_USERNAME]/margin-phorn/actions/workflows/deploy.yml/badge.svg)](https://github.com/[YOUR_GITHUB_USERNAME]/margin-phorn/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ 주요 기능

- 🧮 **정확한 마진 계산**: 단말기와 유선 개통에 대한 정확한 마진 계산
- 💾 **로컬 저장**: 모든 데이터는 브라우저에 안전하게 저장
- 📱 **반응형 디자인**: 모바일과 데스크톱에 최적화된 UI/UX
- 🌙 **다크모드 지원**: 사용자 선호에 따른 테마 전환
- 📊 **실시간 계산**: 입력과 동시에 결과 업데이트
- 📝 **메모 기능**: 계산 내용에 대한 메모 저장

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 🏗️ 프로젝트 구조

```
margin-phorn/
├── public/                 # 정적 파일
│   ├── favicon.svg
│   └── icon-*.png
├── src/                    # 소스 코드
│   ├── components/         # React 컴포넌트
│   │   ├── CalculationSection.tsx
│   │   ├── InputField.tsx
│   │   └── SaveLoadModal.tsx
│   ├── context/           # React Context
│   │   └── AppContext.tsx
│   ├── types.ts           # TypeScript 타입 정의
│   ├── App.tsx            # 메인 앱 컴포넌트
│   ├── main.tsx           # 앱 진입점
│   └── index.css          # 스타일
├── .github/               # GitHub Actions
│   └── workflows/
│       └── deploy.yml
└── package.json
```

## 📊 계산 로직

### 단말기 (왼쪽)

- **정산금**: 리베이트 + 현금수납 + 부가 및 추가정책 - 개통원금 - 차감정책
- **부가세/원천**: IF(리베이트 + 부가 및 추가정책 - 차감정책) > 개통원금 ? (리베이트 + 부가 및 추가정책 - 차감정책 - 개통원금) × 10% : 0
- **마진**: 정산금 - 부가세/원천

### 유선 (오른쪽)

- **정산금**: 리베이트 + 추가정책 - 상품권지급 - 페이백
- **부가세/원천**: (리베이트 + 추가정책) × 10%
- **마진**: 정산금 - 부가세/원천

### 총 마진

- **총 마진**: 단말기 마진 + 유선 마진

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📱 PWA 지원

이 앱은 Progressive Web App(PWA)로 제작되어 다음 기능을 지원합니다:

- 오프라인 사용 가능
- 홈 화면에 설치 가능
- 앱과 같은 사용자 경험

## 🔧 배포

이 프로젝트는 GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

### GitHub 저장소 설정

1. GitHub에서 새 저장소 생성 (저장소명: `margin-phorn`)
2. 로컬에서 원격 저장소 연결:
   ```bash
   git remote add origin https://github.com/[YOUR_GITHUB_USERNAME]/margin-phorn.git
   git push -u origin main
   ```
3. GitHub 저장소 Settings → Pages → Source: "GitHub Actions" 선택
4. 자동 배포가 시작됩니다

### 수동 배포

```bash
npm run build
npm run deploy
```

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.

## 🤝 기여하기

1. 이 저장소를 Fork 합니다
2. 새로운 기능 브랜치를 만듭니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push 합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 Issues를 통해 연락해주세요.

---

💡 **팁**: 이 계산기는 핸드폰 매장 운영에 최적화되어 있습니다. 정확한 마진 계산을 통해 더 나은 비즈니스 의사결정을 하세요!

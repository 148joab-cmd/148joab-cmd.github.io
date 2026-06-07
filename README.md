# NODE · 러닝 — 교수설계 포트폴리오 미니 LMS

교수설계자 **송강건**의 포트폴리오용 미니 LMS입니다. React + Vite 로 빌드합니다.

강좌(영상·읽기·퀴즈), 진도 추적, 메모·북마크, 별점 후기, 게시판, 회원/게스트 로그인,
학습 분석 차트, 게이미피케이션(XP·레벨·스트릭), 수료증, 다크모드, 접근성(큰 글씨·모션 줄이기),
three.js 배경 등을 포함합니다.

## 로컬 실행

```bash
npm install
npm run dev        # 개발 서버 (http://localhost:5173)
npm run build      # dist/ 로 프로덕션 빌드
npm run preview    # 빌드 결과 미리보기
```

> Node.js 18 이상 권장.

## GitHub 올리기 → Pages 배포

```bash
git init
git add .
git commit -m "feat: 교수설계 포트폴리오 LMS"
git branch -M main
git remote add origin https://github.com/<사용자명>/<저장소명>.git
git push -u origin main
```

푸시 후 GitHub 저장소에서:

1. **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 설정
2. `main` 에 푸시될 때마다 `.github/workflows/deploy.yml` 이 자동 빌드·배포
3. 배포 URL: `https://<사용자명>.github.io/<저장소명>/`

## 데이터 저장에 대한 안내

이 사이트는 브라우저 **localStorage** 에 진도·메모·회원·게시글을 저장합니다.

- 한 브라우저 안에서는 영구히 유지됩니다.
- 다만 **여러 사용자 간 실시간 공유는 되지 않습니다.** (게시판 글은 작성자 본인 브라우저에만 남고,
  시드 예시 글은 모든 방문자에게 동일하게 보입니다.)
- 실제 다중 사용자 서비스로 만들려면 Supabase·Firebase 같은 백엔드로 `src/main.jsx`
  의 `window.storage` 어댑터를 교체하면 됩니다.

## 콘텐츠 수정

- 강좌/레슨/퀴즈: `src/App.jsx` 상단 `COURSES` 배열
- 학습 목표: `COURSE_GOALS`
- 후기: `TESTIMONIALS`
- 게시판 예시 글: `SEED_POSTS`
- 영상: 각 video 레슨의 `url` (YouTube·Vimeo·mp4 직링크 / 유튜브는 '퍼가기 허용' 필요)

## 기술 스택

React 18 · Vite 5 · three.js · Recharts · lucide-react

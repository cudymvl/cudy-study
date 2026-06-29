# cudy-study 디자인 가이드

이 저장소(`cudy-study`)의 모든 학습 시리즈는 **하나의 디자인 언어**를 공유한다.
새 시리즈를 만들 때 이 문서를 그대로 따르면 톤·미감이 일관되게 유지된다.

> 한 줄 요약: **다크 시네마틱**. 니어블랙 배경 + 틸민트/코발트 액센트 + Sora 디스플레이 폰트.
> 콘텐츠는 **담백하게** — 군더더기 카피·과한 설명·키워드 태그 무더기는 넣지 않는다.

---

## 1. 디자인 토큰 (단일 출처)

색/폰트는 항상 아래 토큰을 쓴다. 임의의 새 색을 추가하지 않는다.

```css
/* 배경 (어두운 → 밝은 표면) */
--bg-base:     #080b10;   /* 페이지 바탕 */
--bg-surface:  #0d1117;
--bg-elevated: #131924;   /* 칩·작은 표면 */
--bg-card:     #111822;   /* 카드/코드블록 */

/* 액센트 (보라색 금지 — 차별점) */
--accent-primary: #00e5c4;   /* 틸민트: 주 액센트, 활성 링크, 강조 */
--accent-cool:    #3b8beb;   /* 코발트: 보조(h3, 2번째 카드 등) */
--accent-warm:    #f0a050;   /* 앰버: 드물게 대비용 */

/* 텍스트 */
--text-primary:   #eef2f8;
--text-secondary: #8a95a8;
--text-muted:     #4a5568;

/* 경계/반경 */
--border-subtle: #1e2a38;
--border-mid:    #253347;
--radius-card:   16px;
--radius-pill:   100px;

/* 폰트 */
--font-display: 'Sora', sans-serif;        /* 제목·네비·배지 */
--font-body:    'Noto Sans KR', sans-serif; /* 본문(한글 가독성) */
```

**배경 연출:** 고정(fixed) aurora 블롭 2개(틸민트·코발트, `blur(120px)`, opacity ~0.06) + 미세한 64px 그리드(레이디얼 마스크). 은은하게. `prefers-reduced-motion` 존중(애니메이션 off).

**폰트 로드:** Google Fonts. HTML `<head>`의 `<link>` 또는 `style.css` 최상단 `@import`로.
```
https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@300;400;500;700&display=swap
```

---

## 2. 사이트 구조

```
cudy-study/
├── index.html              # 홈 랜딩 (self-contained, 인라인 CSS)
├── DESIGN.md               # 이 문서
├── <주제>/                 # 시리즈 1개 = 폴더 1개 (예: openclaude/, superpowers/)
│   ├── index.html          #   시리즈 허브 (모듈 카드 그리드)
│   ├── 00-*.html … 08-*.html  #   모듈 페이지
│   └── assets/style.css    #   공유 스타일시트(아래 §4) — 주제마다 동일 사본
└── (배포) GitHub Pages, main 브랜치 루트
```

내부 링크는 **항상 상대경로**(`assets/style.css`, `00-*.html`, 홈은 `../index.html`)라 폴더째 옮겨도 깨지지 않는다.

---

## 3. 홈 랜딩 (`index.html`)

**원칙: 담백하게. 제목 + 시리즈 리스트, 그게 전부다.**

넣는 것:
- 사이트 제목 `cudy-study` (Sora, 큰 사이즈, `cudy`만 틸민트→코발트 그라데이션)
- 시리즈 카드 N개 — **번호 + 제목 + 링크만**

빼는 것 (이전에 과했던 것들):
- 히어로 보조 문장·아이브로우, 스탯 행(예: "N 시리즈 · M 모듈")
- 카드 설명문·키워드 태그 무더기·"시리즈 시작" 같은 CTA 텍스트
- "이 노트의 방법" 5단계 섹션, 푸터 중복 배지

홈은 인라인 CSS로 self-contained. 새 시리즈 추가 = `<주제>/` 폴더 + 홈에 카드 1장.

---

## 4. 모듈 페이지 (`<주제>/NN-*.html`)

모든 모듈은 **공유 `assets/style.css`** 를 쓰고, 아래 **고정 클래스 계약**을 따른다.
HTML은 클래스만 맞추면 스타일이 자동 적용된다(스타일 변경은 `style.css` 한 곳에서).

### 6요소 템플릿 (모듈 본문 구조)
1. **① 왜 이 개념인가** — 동기/문제 정의 (AI 시대 개발자 관점)
2. **② 아키텍처** — Mermaid 다이어그램(`<pre class="mermaid">`)
3. **③ 핵심 메커니즘** — 그림과 함께 단계별 해설
4. **④ 실제 코드 예시** — `<figure class="code-ex">` + `<figcaption><code class="src">파일:라인</code> — 설명</figcaption>`
5. **⑤ 직접 만든다면** — 의사코드 + 설계 트레이드오프
6. **네비** — 상단 `.topnav`(🏠 Home → `../index.html`, 허브, 번호 모듈 링크), 하단 `.pager`(이전/다음)

### 클래스 계약 (이름 고정 — 바꾸지 말 것)
`.topnav` / `.topnav a` / `.topnav a.active` · `.content` · `.module-head` · `.badge` · `.subtitle` ·
`section h2` / `section h3` · `pre` / `:not(pre) > code` · `figure.code-ex` / `figure.code-ex figcaption` / `figcaption code.src` ·
`pre.mermaid` · `blockquote` · `table`/`th`/`td` · `.pager` / `.pager a` · `.module-grid` / `.module-card` / `.module-card .num` / `.module-card h3` / `.module-card p` · `.callout`

### 외부 의존 (CDN, 빌드 스텝 없음)
- **Mermaid** `@10` — `mermaid.initialize({ startOnLoad: true, theme: 'dark' })`. sequenceDiagram participant 라벨에 raw `<br/>` 넣지 말 것(렌더 깨짐 위험) — 노드 라벨은 `<br/>`/`\n` 가능.
- **highlight.js 11.9.0** + **github-dark** 테마. `pre code` 토큰 색은 테마에 맡기고 CSS에서 덮어쓰지 말 것(컨테이너 `pre`만 스타일).

### 시리즈 허브 (`<주제>/index.html`)
`.module-grid` 안에 모듈 수만큼 `.module-card`(번호 + 제목 + 한 줄). 마스터 다이어그램 섹션 둘 수 있음.

---

## 5. 콘텐츠 톤

- **담백하게.** 설명은 짧고 분명하게. 같은 말 반복·홍보성 카피·불필요한 형용사 금지.
- **언어:** 해설은 한국어, 코드/식별자는 원문(영어) 그대로.
- **독자 가정:** TypeScript 능숙 / LLM은 사용자 수준 → 언어 문법 설명은 생략, 에이전트·LLM 개념은 처음부터.
- **코드 인용은 진실되게(하드 규칙):** 모든 `파일:라인`은 실제 소스를 열어 검증. 비연속 라인을 이어 붙이거나 분기를 재작성하지 말고, 생략은 정확한 위치에 `// …생략` 표기. 시작·끝 라인 번호까지 맞춘다.

---

## 6. 새 시리즈 만들 때 체크리스트

1. `git`에서 기존 주제 폴더(예: `openclaude/`) 구조를 참고로 `<새주제>/` 생성.
2. `<새주제>/assets/style.css` 에 기존 주제의 `assets/style.css`를 **그대로 복사**(단일 디자인 시스템 유지).
3. 모듈 페이지는 §4의 6요소 템플릿 + 클래스 계약 + CDN을 그대로 사용. topnav `허브`=`index.html`, `🏠 Home`=`../index.html`, pager로 연결.
4. `<새주제>/index.html` 허브에 `.module-grid` + 모듈 카드.
5. 루트 `index.html` 홈에 시리즈 카드 1장 추가(번호 + 제목 + `<새주제>/index.html` 링크).
6. 콘텐츠는 §5 톤(담백 + 검증된 인용) 준수.
7. `git push` → GitHub Pages가 1~2분 뒤 자동 반영(Pages 재설정 불필요).

> 제작 워크플로우는 superpowers 방식(spec → plan → 서브에이전트 주도 실행 + 모듈별 인용 검증 리뷰)을 권장.

# Superpowers 학습 커리큘럼 구현 플랜

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Superpowers(obra/superpowers v6.0.3)의 핵심 개념을 분석한 9개 모듈 + 허브로 구성된 정적 HTML 학습 자료를 만든다.

**Architecture:** `openclaude-study`와 동일한 형식 — 정적 HTML + CDN(Mermaid.js, highlight.js), 공통 `assets/style.css`(다크 테마), 모듈당 HTML 1개. 빌드 스텝 없음(파일 더블클릭으로 열림). 각 모듈은 6요소 템플릿(왜 → 다이어그램 → 메커니즘 → 실제 발췌 → "직접 만든다면" → 네비게이션)을 따른다.

**Tech Stack:** HTML5, CSS(단일 파일), Mermaid.js@10 CDN, highlight.js@11.9.0 CDN. 빌드 도구·의존성 없음.

## Global Constraints

- 언어: 모든 본문은 **한국어**. 코드/스킬/훅 발췌는 원문 그대로 인용.
- 출처 단일성: 모든 발췌는 클론된 `/Users/cudy/dev/cudy/superpowers`에서만 인용. 추측 금지.
- 인용 표기: 모든 발췌에 `figcaption`으로 `파일:라인` 명시, **실제 소스와 라인 일치 검증 필수**.
- 발췌 종류 다양화: 코드뿐 아니라 **스킬 마크다운 / 훅 bash / frontmatter / JSON 설정**을 인용. highlight.js 언어 클래스는 `markdown`/`bash`/`json`/`typescript` 적절히 사용.
- 톤 일치: `style.css`는 새로 만들지 말고 `openclaude-study/assets/style.css`를 복사.
- 모든 페이지는 동일한 `<nav class="topnav">`(9개 모듈 링크) + 하단 `<nav class="pager">`(이전/다음) 포함. 현재 페이지 링크에 `class="active"`.
- 모듈 파일명(고정): `00-overview.html` `01-full-workflow.html` `02-skill-anatomy.html` `03-bootstrap-autotrigger.html` `04-methodology-pipeline.html` `05-tdd-everywhere.html` `06-subagent-parallelism.html` `07-review-verification.html` `08-behavior-shaping.html`.

---

## 공통 자산 (모든 모듈 태스크가 참조)

### 표준 topnav 블록 (모든 HTML에 동일 삽입, 현재 페이지만 `active`)

```html
<nav class="topnav">
  <a href="index.html">허브</a>
  <a href="00-overview.html">0·조감도</a>
  <a href="01-full-workflow.html">1·전체흐름</a>
  <a href="02-skill-anatomy.html">2·스킬해부</a>
  <a href="03-bootstrap-autotrigger.html">3·부트스트랩</a>
  <a href="04-methodology-pipeline.html">4·파이프라인</a>
  <a href="05-tdd-everywhere.html">5·TDD</a>
  <a href="06-subagent-parallelism.html">6·서브에이전트</a>
  <a href="07-review-verification.html">7·리뷰검증</a>
  <a href="08-behavior-shaping.html">8·행동형성</a>
</nav>
```

### 표준 모듈 `<head>` (모든 모듈 HTML 공통)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MODULE_TITLE — Superpowers 학습</title>
  <link rel="stylesheet" href="assets/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <script>mermaid.initialize({ startOnLoad: true, theme: 'dark' });</script>
</head>
```

### 표준 모듈 본문 골격 (6요소)

```html
<body>
<!-- [표준 topnav 블록, 현재 페이지 active] -->
<main class="content">
  <header class="module-head">
    <span class="badge">Module N</span>
    <h1>MODULE_TITLE</h1>
    <p class="subtitle">MODULE_SUBTITLE</p>
  </header>

  <section id="why"><h2>왜 이 개념인가</h2> ... </section>
  <section id="diagram"><h2>아키텍처 다이어그램</h2><pre class="mermaid"> ... </pre></section>
  <section id="mechanism"><h2>핵심 메커니즘 해설</h2> ... </section>
  <section id="excerpt"><h2>실제 발췌</h2>
    <figure class="code-ex">
      <figcaption><code class="src">skills/PATH/SKILL.md:NN</code></figcaption>
      <pre><code class="language-markdown">...원문 발췌...</code></pre>
    </figure>
    <!-- 모듈당 최소 3개의 다양한 발췌 -->
  </section>
  <section id="diy"><h2>"직접 만든다면" 교훈</h2> ... </section>
</main>
<nav class="pager">
  <a href="PREV.html">← 이전: PREV_TITLE</a>
  <a href="NEXT.html">다음: NEXT_TITLE →</a>
</nav>
<script>hljs.highlightAll();</script>
</body>
</html>
```

### 인용 검증 방법 (모든 모듈 태스크의 마지막 단계에서 실행)

각 발췌의 `파일:라인`이 실제와 일치하는지 확인:

```bash
# 예: skills/test-driven-development/SKILL.md 의 12번째 줄 확인
sed -n '12p' /Users/cudy/dev/cudy/superpowers/skills/test-driven-development/SKILL.md
```

발췌 텍스트와 출력이 일치해야 함. 라인 범위는 `sed -n '12,20p'` 형식으로 검증.

---

## Task 1: 스캐폴드 — style.css 복사 + index.html 허브

**Files:**
- Create: `/Users/cudy/dev/cudy/superpowers-study/assets/style.css` (openclaude-study에서 복사)
- Create: `/Users/cudy/dev/cudy/superpowers-study/index.html`

**Interfaces:**
- Produces: `assets/style.css`(모든 모듈이 링크), 표준 topnav(이후 모든 모듈이 복제), 허브의 마스터 다이어그램.

- [ ] **Step 1: style.css 복사**

```bash
cp /Users/cudy/dev/cudy/openclaude-study/assets/style.css \
   /Users/cudy/dev/cudy/superpowers-study/assets/style.css
```

- [ ] **Step 2: index.html 작성**

`<head>`는 표준 head 사용(title은 `Superpowers 학습 허브`). topnav는 표준 블록에서 `index.html`을 `class="active"`로. 본문 구성:
- `<header class="module-head">`: badge `superpowers study`, h1 `Superpowers 학습 허브`, subtitle `에이전트가 어떻게 일해야 좋은 코드를 만드는가 — 방법론 레이어의 내부를 읽는다`.
- `#intro` 섹션: 이 자료가 무엇인지(Superpowers = Claude Code 등 위에서 도는 방법론 플러그인. "사용법"이 아니라 "핵심 개념과 그 구현/설계"를 판다). 0→8 순서 권장. `.callout`로 6요소 템플릿 안내(openclaude-study `index.html`의 callout 문구를 Superpowers판으로).
- `#master-diagram` 섹션: 아래 마스터 Mermaid 다이어그램.
- `#modules` 섹션: `.module-grid` 안에 9개 `.module-card`(아래 표의 제목/설명 사용).

마스터 다이어그램 (Superpowers의 4레이어 구조):

```
flowchart TD
    H["SessionStart hook<br/><i>hooks/session-start</i>"]
    U["라우터 스킬: using-superpowers<br/>(부트스트랩으로 주입)<br/><i>skills/using-superpowers/SKILL.md</i>"]
    subgraph LIB["스킬 라이브러리 (skills/)"]
      B["brainstorming"]
      W["writing-plans"]
      S["subagent-driven-development"]
      E["executing-plans"]
      V["verification-before-completion"]
      T["test-driven-development"]
      WS["writing-skills"]
      etc["… dispatching-parallel-agents · using-git-worktrees · code-review …"]
    end
    P["방법론 파이프라인<br/>아이디어 → 스펙 → 플랜 → 실행 → 검증"]
    HARNESS["멀티 하니스<br/>Claude Code · Codex · Gemini · Copilot · Cursor"]

    HARNESS -->|"세션 시작 시 실행"| H
    H -->|"using-superpowers 내용을<br/>additionalContext로 주입"| U
    U -->|"1% 규칙: 관련되면 무조건 스킬 발동"| LIB
    LIB --> P
```

9개 모듈 카드 표:

| # | 카드 제목 | 카드 설명(p) | 링크 |
|---|----------|-------------|------|
| 0 | 전체 조감도 | 4레이어 구조(부트스트랩·라우터·스킬 라이브러리·파이프라인)와 "무엇이 어디에" | `00-overview.html` |
| 1 | "Let's build X"의 전체 흐름 | 유저 한마디 → 스킬 연쇄 발동 → 결과까지 end-to-end 추적 | `01-full-workflow.html` |
| 2 | Skill 해부학 | frontmatter·트리거·스킬 3종·progressive disclosure | `02-skill-anatomy.html` |
| 3 | 부트스트랩 & 자동 트리거 | "그냥 알아서 발동"의 엔지니어링: hook 주입·1% 규칙·멀티하니스 | `03-bootstrap-autotrigger.html` |
| 4 | 방법론 파이프라인 | 아이디어→스펙→플랜→실행. HARD GATE와 "설계 먼저" | `04-methodology-pipeline.html` |
| 5 | 모든 것에 TDD | RED-GREEN-REFACTOR + "스킬 작성도 TDD" 메타 개념 | `05-tdd-everywhere.html` |
| 6 | 서브에이전트 주도 개발 & 병렬화 | 자율 작업·위임·격리(worktree)·병렬 | `06-subagent-parallelism.html` |
| 7 | 리뷰 & 검증 루프 | 코드리뷰·완료 전 검증·브랜치 마무리 게이트 | `07-review-verification.html` |
| 8 | 행동 형성 언어 기법 | "스킬은 산문이 아니라 코드": Red Flags·합리화 차단·HARD-GATE | `08-behavior-shaping.html` |

- [ ] **Step 3: 렌더 검증**

```bash
open /Users/cudy/dev/cudy/superpowers-study/index.html
```
Expected: 허브가 열리고, 마스터 다이어그램이 그려지고, 9개 카드가 보이고, topnav 9개 링크 표시.

- [ ] **Step 4: 커밋**

```bash
cd /Users/cudy/dev/cudy/superpowers-study
git add assets/style.css index.html
git commit -m "feat: 학습 허브(index) + 공통 스타일 스캐폴드"
```

---

## Task 2: Module 0 — 전체 조감도 (`00-overview.html`)

**Files:**
- Create: `/Users/cudy/dev/cudy/superpowers-study/00-overview.html`

**정독 대상 (작성 전 반드시 읽기):**
- `/Users/cudy/dev/cudy/superpowers/README.md` (특히 "How it works")
- `/Users/cudy/dev/cudy/superpowers/skills/` 디렉터리 전체 목록 + 각 SKILL.md의 frontmatter `description`
- `/Users/cudy/dev/cudy/superpowers/hooks/` 와 `.claude-plugin/plugin.json`

**내용 브리프:**
- **왜:** Superpowers는 "에이전트 런타임"이 아니라 그 위의 **방법론 레이어**. 사용자 관점에서 빌더 관점으로 넘어가려면 "어떤 부품이 어디에 있는지" 지도부터.
- **다이어그램:** Step 2의 마스터 다이어그램 재사용(또는 약간 확장). 4레이어 명확히.
- **메커니즘:** 4레이어 설명 — (1) 부트스트랩 훅, (2) 라우터 스킬 `using-superpowers`, (3) 스킬 라이브러리(14개 스킬을 방법론/구현/품질로 분류한 표), (4) 방법론 파이프라인. 디렉터리 맵(skills/, hooks/, docs/, tests/, 하니스별 .*-plugin).
- **실제 발췌(≥3):** `plugin.json`(name/description/version, JSON), `README.md`의 "How it works" 문단(markdown), `skills/` ls 결과로 만든 스킬 목록.
- **직접 만든다면:** "스킬 라이브러리 + 부트스트랩 + 라우터" 3요소가 최소 방법론 플러그인의 골격임을 의사코드로.

- [ ] **Step 1: 소스 정독** — 위 정독 대상을 Read로 읽고 스킬 목록·설명 수집.
- [ ] **Step 2: HTML 작성** — 표준 head/topnav(`00-overview.html` active)/본문 골격/pager(이전: `index.html` 허브, 다음: `01-full-workflow.html`).
- [ ] **Step 3: 인용 검증** — "인용 검증 방법"으로 모든 `파일:라인` 확인.
- [ ] **Step 4: 렌더 검증** — `open 00-overview.html`, 다이어그램·하이라이팅·nav 동작 확인.
- [ ] **Step 5: 커밋** — `git add 00-overview.html && git commit -m "feat: Module 0 전체 조감도"`

---

## Task 3: Module 1 — "Let's build X"의 전체 흐름 (`01-full-workflow.html`)

**Files:**
- Create: `/Users/cudy/dev/cudy/superpowers-study/01-full-workflow.html`

**정독 대상:**
- `skills/using-superpowers/SKILL.md` (라우팅·우선순위·skill_flow dot 그래프)
- `skills/brainstorming/SKILL.md` (체크리스트·HARD-GATE)
- `skills/writing-plans/SKILL.md` (핸드오프 섹션)
- `skills/subagent-driven-development/SKILL.md`, `skills/executing-plans/SKILL.md`, `skills/verification-before-completion/SKILL.md`

**내용 브리프:**
- **왜:** 개별 스킬보다 "스킬들이 어떻게 연쇄"되는지가 핵심. 유저가 "react todo 만들자"라고 했을 때 brainstorming이 자동 발동하는 것이 Superpowers의 시그니처(README의 acceptance test와 동일).
- **다이어그램:** 시퀀스/플로우차트 — 유저 입력 → using-superpowers 라우팅 → brainstorming(spec) → writing-plans(plan) → subagent-driven-development/executing-plans → verification-before-completion → finishing. 각 게이트(유저 승인) 표시.
- **메커니즘:** 각 단계가 다음 단계로 넘어가는 "terminal state" 규칙(brainstorming의 종착은 writing-plans뿐, writing-plans의 종착은 실행 스킬 선택 등) 해설. 우리가 방금 거친 흐름(이 학습자료 자체가 brainstorming→writing-plans로 생성됨)을 실제 예로 언급.
- **실제 발췌(≥3):** brainstorming의 HARD-GATE 블록, using-superpowers의 skill_flow dot graph, writing-plans의 Execution Handoff 문구.
- **직접 만든다면:** 파이프라인을 "각 스킬이 다음 스킬을 명시적으로 호출하는 상태기계"로 보는 관점.

- [ ] **Step 1: 소스 정독**
- [ ] **Step 2: HTML 작성** — pager(이전: `00-overview.html`, 다음: `02-skill-anatomy.html`)
- [ ] **Step 3: 인용 검증**
- [ ] **Step 4: 렌더 검증**
- [ ] **Step 5: 커밋** — `git commit -m "feat: Module 1 전체 워크플로우 흐름"`

---

## Task 4: Module 2 — Skill 해부학 (`02-skill-anatomy.html`)

**Files:**
- Create: `/Users/cudy/dev/cudy/superpowers-study/02-skill-anatomy.html`

**정독 대상:**
- `skills/writing-skills/SKILL.md` (What is a Skill / Skill Types / Directory Structure / frontmatter 규칙)
- 대조용 frontmatter 수집: `skills/test-driven-development/SKILL.md`, `skills/brainstorming/SKILL.md`, `skills/using-git-worktrees/SKILL.md` 의 상단 `---` 블록
- `skills/writing-skills/` 의 지원 파일 목록(progressive disclosure 예: `anthropic-best-practices.md` 등)

**내용 브리프:**
- **왜:** 스킬이 Superpowers의 원자(atom). 이 구조를 알면 나만의 스킬을 만들 수 있다.
- **다이어그램:** 스킬 파일 구조(SKILL.md + 지원파일) + frontmatter(name/description) + 트리거 흐름(description의 "Use when…"이 어떻게 매칭 신호가 되는지).
- **메커니즘:** (1) frontmatter `name`/`description`("Use when …" 패턴이 핵심), (2) 스킬 3종(technique/pattern/reference), (3) 디렉터리 구조 + progressive disclosure(필요할 때만 지원 파일 읽기), (4) 스킬은 "한 번 해결한 서사"가 아니라 "재사용 기법".
- **실제 발췌(≥3):** writing-skills의 "What is a Skill" 블록, 서로 다른 스킬 2~3개의 frontmatter 비교(markdown), Skill Types 섹션.
- **직접 만든다면:** 최소 SKILL.md 골격(frontmatter + 섹션) 의사코드.

- [ ] **Step 1: 소스 정독**
- [ ] **Step 2: HTML 작성** — pager(이전 `01`, 다음 `03-bootstrap-autotrigger.html`)
- [ ] **Step 3: 인용 검증**
- [ ] **Step 4: 렌더 검증**
- [ ] **Step 5: 커밋** — `git commit -m "feat: Module 2 스킬 해부학"`

---

## Task 5: Module 3 — 부트스트랩 & 자동 트리거 (`03-bootstrap-autotrigger.html`)

**Files:**
- Create: `/Users/cudy/dev/cudy/superpowers-study/03-bootstrap-autotrigger.html`

**정독 대상:**
- `hooks/session-start` (bash, 전체)
- `hooks/hooks.json`, `hooks/hooks-codex.json`, `hooks/hooks-cursor.json`
- `skills/using-superpowers/SKILL.md` (EXTREMELY-IMPORTANT 프레이밍, 1% 규칙, Red Flags 표)
- `skills/using-superpowers/references/` 의 하니스별 파일 목록(claude-code-tools.md 등)

**내용 브리프:**
- **왜:** "스킬을 알아서 쓴다"가 가능한 이유. 이게 없으면 스킬은 디스크에 박제된 죽은 파일(README의 "dead weight" 표현).
- **다이어그램:** 시퀀스 — 세션 시작 → hook 실행 → using-superpowers/SKILL.md 읽기 → JSON escape → 하니스별 출력 포맷 분기(Cursor: additional_context / Claude Code: hookSpecificOutput.additionalContext / Copilot 등: additionalContext) → LLM 컨텍스트 주입.
- **메커니즘:** (1) SessionStart hook이 하는 일(파일 읽어 JSON으로 주입), (2) 하니스 감지 분기(env 변수 `CURSOR_PLUGIN_ROOT`/`CLAUDE_PLUGIN_ROOT`/`COPILOT_CLI`), (3) 주입된 using-superpowers가 "1% 규칙"으로 스킬 발동을 강제, (4) 멀티하니스 이식(references/*-tools.md로 도구 매핑 추상화).
- **실제 발췌(≥3):** `session-start`의 하니스 분기 if/elif/else(bash), `hooks.json`(json), using-superpowers의 EXTREMELY-IMPORTANT/1% 규칙 블록(markdown).
- **직접 만든다면:** "session-start hook으로 라우터 문서를 주입" 패턴의 최소 구현 + 주의점(bash 5.3 heredoc 이슈 같은 실전 함정 언급).

- [ ] **Step 1: 소스 정독**
- [ ] **Step 2: HTML 작성** — pager(이전 `02`, 다음 `04-methodology-pipeline.html`)
- [ ] **Step 3: 인용 검증**
- [ ] **Step 4: 렌더 검증**
- [ ] **Step 5: 커밋** — `git commit -m "feat: Module 3 부트스트랩과 자동 트리거"`

---

## Task 6: Module 4 — 방법론 파이프라인 (`04-methodology-pipeline.html`)

**Files:**
- Create: `/Users/cudy/dev/cudy/superpowers-study/04-methodology-pipeline.html`

**정독 대상:**
- `skills/brainstorming/SKILL.md` (체크리스트·프로세스·HARD-GATE·spec 저장 규칙)
- `skills/writing-plans/SKILL.md` (Task 구조·No Placeholders·Self-Review)
- `skills/executing-plans/SKILL.md`

**내용 브리프:**
- **왜:** "왜 이 플러그인을 쓰면 코드 퀄리티가 오르는가"의 직접적 답 — 코드 전에 설계, 작은 검증 가능한 단위, 빈번한 커밋.
- **다이어그램:** 아이디어 → (brainstorming: 질문 1개씩 → 2~3 접근법 → spec) → (writing-plans: 파일구조 → bite-sized 태스크 → self-review) → (executing-plans/SDD) → 검증. 각 HARD GATE 표시.
- **메커니즘:** (1) brainstorming의 "simple too" 안티패턴 차단·한 번에 한 질문·YAGNI, (2) writing-plans의 "zero context 엔지니어 가정"·No Placeholders·bite-sized(2~5분) 단위·TDD 스텝, (3) 게이트(유저 승인 없이는 다음 단계 X).
- **실제 발췌(≥3):** brainstorming 체크리스트, writing-plans의 "No Placeholders" 리스트, Task Structure 예시(markdown).
- **직접 만든다면:** "설계 게이트 → 플랜 게이트 → 실행" 3단 관문을 강제하는 것이 품질의 핵심이라는 교훈.

- [ ] **Step 1: 소스 정독**
- [ ] **Step 2: HTML 작성** — pager(이전 `03`, 다음 `05-tdd-everywhere.html`)
- [ ] **Step 3: 인용 검증**
- [ ] **Step 4: 렌더 검증**
- [ ] **Step 5: 커밋** — `git commit -m "feat: Module 4 방법론 파이프라인"`

---

## Task 7: Module 5 — 모든 것에 TDD (`05-tdd-everywhere.html`)

**Files:**
- Create: `/Users/cudy/dev/cudy/superpowers-study/05-tdd-everywhere.html`

**정독 대상:**
- `skills/test-driven-development/SKILL.md`
- `skills/test-driven-development/testing-anti-patterns.md`
- `skills/writing-skills/SKILL.md` (TDD Mapping for Skills 표 — "스킬 작성 = TDD")

**내용 브리프:**
- **왜:** TDD는 Superpowers의 척추. 흥미로운 점은 **코드뿐 아니라 스킬 문서 작성에도 RED-GREEN-REFACTOR를 적용**한다는 것(서브에이전트로 스킬을 압박 테스트).
- **다이어그램:** RED → GREEN → REFACTOR 사이클 + 그 옆에 "스킬용 매핑"(테스트=압박 시나리오, 프로덕션 코드=SKILL.md, RED=스킬 없이 위반, GREEN=스킬 있으면 준수).
- **메커니즘:** (1) 진짜 red/green TDD(테스트 먼저, 실패 확인, 최소 구현), (2) testing-anti-patterns(피해야 할 것), (3) 메타: writing-skills의 TDD Mapping 표 — "에이전트가 스킬 없이 실패하는 걸 못 봤다면 스킬이 옳은 걸 가르치는지 모른다".
- **실제 발췌(≥3):** test-driven-development의 사이클 규칙, testing-anti-patterns의 대표 안티패턴, writing-skills의 "TDD Mapping for Skills" 표(markdown).
- **직접 만든다면:** "행동 형성 문서도 테스트해야 한다"는 관점(baseline 없이 작성한 프롬프트는 검증 안 된 코드).

- [ ] **Step 1: 소스 정독**
- [ ] **Step 2: HTML 작성** — pager(이전 `04`, 다음 `06-subagent-parallelism.html`)
- [ ] **Step 3: 인용 검증**
- [ ] **Step 4: 렌더 검증**
- [ ] **Step 5: 커밋** — `git commit -m "feat: Module 5 모든 것에 TDD"`

---

## Task 8: Module 6 — 서브에이전트 주도 개발 & 병렬화 (`06-subagent-parallelism.html`)

**Files:**
- Create: `/Users/cudy/dev/cudy/superpowers-study/06-subagent-parallelism.html`

**정독 대상:**
- `skills/subagent-driven-development/SKILL.md`
- `skills/dispatching-parallel-agents/SKILL.md`
- `skills/using-git-worktrees/SKILL.md`

**내용 브리프:**
- **왜:** "에이전트가 몇 시간 자율로 일한다"의 정체. 컨텍스트 한계를 서브에이전트 위임으로 푸는 패턴.
- **다이어그램:** 오케스트레이터 → 태스크별 fresh 서브에이전트 dispatch → 두 단계 리뷰 → 다음 태스크. 병렬 분기 + worktree 격리.
- **메커니즘:** (1) subagent-driven-development(태스크당 새 서브에이전트 + 리뷰 사이), (2) dispatching-parallel-agents(독립 작업 병렬·파일 소유권), (3) using-git-worktrees(격리된 작업 공간으로 충돌 방지).
- **실제 발췌(≥3):** SDD의 dispatch/review 규칙, dispatching-parallel-agents의 병렬 조건, using-git-worktrees의 워크플로우(markdown/bash).
- **직접 만든다면:** "fresh context + 명확한 brief + 게이트 리뷰"가 긴 자율 작업을 가능하게 한다는 교훈.

- [ ] **Step 1: 소스 정독**
- [ ] **Step 2: HTML 작성** — pager(이전 `05`, 다음 `07-review-verification.html`)
- [ ] **Step 3: 인용 검증**
- [ ] **Step 4: 렌더 검증**
- [ ] **Step 5: 커밋** — `git commit -m "feat: Module 6 서브에이전트 주도 개발과 병렬화"`

---

## Task 9: Module 7 — 리뷰 & 검증 루프 (`07-review-verification.html`)

**Files:**
- Create: `/Users/cudy/dev/cudy/superpowers-study/07-review-verification.html`

**정독 대상:**
- `skills/requesting-code-review/SKILL.md`
- `skills/receiving-code-review/SKILL.md`
- `skills/verification-before-completion/SKILL.md`
- `skills/finishing-a-development-branch/SKILL.md`

**내용 브리프:**
- **왜:** 품질은 "완료를 주장하기 전 검증"에서 나온다. 에이전트가 "다 됐어요"라고 거짓말하는 걸 막는 게이트.
- **다이어그램:** 구현 → 코드리뷰 요청 → 리뷰 수신/반영 → 완료 전 검증(테스트·증거) → 브랜치 마무리. 각 게이트가 통과 못하면 되돌아가는 루프.
- **메커니즘:** (1) requesting/receiving-code-review(리뷰를 주고받는 규율), (2) verification-before-completion("증거 없는 완료 주장 금지" — 실제 테스트 실행/출력 확인), (3) finishing-a-development-branch(머지·정리 절차).
- **실제 발췌(≥3):** verification-before-completion의 핵심 규칙, receiving-code-review의 피드백 처리 원칙, finishing-a-development-branch의 절차(markdown).
- **직접 만든다면:** "검증 증거를 강제하는 체크리스트"가 환각성 완료 주장을 줄인다는 교훈.

- [ ] **Step 1: 소스 정독**
- [ ] **Step 2: HTML 작성** — pager(이전 `06`, 다음 `08-behavior-shaping.html`)
- [ ] **Step 3: 인용 검증**
- [ ] **Step 4: 렌더 검증**
- [ ] **Step 5: 커밋** — `git commit -m "feat: Module 7 리뷰와 검증 루프"`

---

## Task 10: Module 8 — 행동 형성 언어 기법 (`08-behavior-shaping.html`)

**Files:**
- Create: `/Users/cudy/dev/cudy/superpowers-study/08-behavior-shaping.html`

**정독 대상:**
- `skills/using-superpowers/SKILL.md` (Red Flags 표, 합리화 리스트, EXTREMELY-IMPORTANT)
- `CLAUDE.md` (기여 가이드라인 — "your human partner" 용어, "스킬은 코드", 평가 요구)
- 여러 스킬 횡단: HARD-GATE/HARD RULE, dot-graph 플로우차트(brainstorming·using-superpowers), Red Flags 표 패턴

**내용 브리프:**
- **왜:** 가장 깊은 설계패턴 — Superpowers의 진짜 비결은 "스킬은 산문이 아니라 **행동을 형성하는 코드**"라는 철학. 같은 정보를 어떻게 쓰느냐가 에이전트 준수율을 바꾼다.
- **다이어그램:** 행동 형성 기법 분류도 — (a) 강조 프레이밍(EXTREMELY-IMPORTANT/HARD-GATE), (b) 합리화 차단(Red Flags 표: "이 생각이 들면 STOP"), (c) 용어 선택("your human partner" 의도적 사용), (d) 구조적 강제(dot-graph 플로우차트로 의사결정 시각화), (e) 평가 기반 튜닝(eval).
- **메커니즘:** 각 기법이 왜 효과적인지 — 합리화 리스트는 LLM의 회피 사고를 선제 차단, 플로우차트는 분기를 명시, 용어는 정렬(alignment)을 만든다. CLAUDE.md의 "carefully-tuned content를 함부로 바꾸지 말라"가 이게 코드처럼 다뤄진다는 증거.
- **실제 발췌(≥3):** using-superpowers의 Red Flags 표(markdown table), CLAUDE.md의 "Skills are not prose — they are code" 문단, dot-graph 플로우차트 한 개(markdown/dot).
- **직접 만든다면:** 내 프롬프트/CLAUDE.md에 적용할 체크리스트 — 합리화 차단 표·명시적 게이트·일관된 용어.

- [ ] **Step 1: 소스 정독**
- [ ] **Step 2: HTML 작성** — pager(이전 `07`, 다음: 없음 → `index.html` 허브로 "다음: 허브로 돌아가기 →")
- [ ] **Step 3: 인용 검증**
- [ ] **Step 4: 렌더 검증**
- [ ] **Step 5: 커밋** — `git commit -m "feat: Module 8 행동 형성 언어 기법"`

---

## Task 11: 최종 통합 검증

**Files:** (수정 없음, 검증만)

- [ ] **Step 1: 전체 파일 존재 확인**

```bash
cd /Users/cudy/dev/cudy/superpowers-study
ls index.html 0?-*.html assets/style.css
```
Expected: index + 9개 모듈 HTML + style.css 모두 존재.

- [ ] **Step 2: 네비게이션 무결성 — 깨진 링크 확인**

```bash
cd /Users/cudy/dev/cudy/superpowers-study
for f in $(grep -ohE 'href="[0-9a-z-]+\.html"' *.html | sed -E 's/href="([^"]+)"/\1/' | sort -u); do
  [ -f "$f" ] && echo "OK $f" || echo "MISSING $f"
done
```
Expected: 모든 링크 `OK`, `MISSING` 없음.

- [ ] **Step 3: 허브에서 모든 모듈 순회** — `open index.html` 후 카드/페이저로 0→8 순회, 각 페이지 다이어그램·하이라이팅 정상 확인.

- [ ] **Step 4: 최종 커밋**

```bash
git add -A
git commit -m "chore: 학습 자료 통합 검증 완료" --allow-empty
```

---

## Self-Review (작성자 점검 결과)

**Spec coverage:** spec의 9개 모듈 → Task 2~10에 1:1 매핑. 허브/공통 자산 → Task 1. 인용 검증·통합 검증 → 각 태스크 Step + Task 11. 세 렌즈는 모듈별 브리프에 분산 반영. ✅

**Placeholder scan:** "TODO/TBD" 없음. 단, 본 자료는 **콘텐츠 생성** 프로젝트이므로 각 모듈의 산문/발췌 자체는 "정독 대상 + 내용 브리프 + 발췌 종류 지정"으로 구체화함(코드 플랜의 "완전한 코드" 대응물). 재사용 골격(head/topnav/본문/pager/CSS)은 verbatim 제공. ✅

**Type consistency:** 파일명·topnav 링크·pager 이전/다음 참조가 9개 모듈에서 일관(00-overview … 08-behavior-shaping). Global Constraints의 파일명 목록과 각 태스크 경로 일치. ✅

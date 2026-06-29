# Superpowers 학습 커리큘럼 — 설계 문서 (Spec)

> 작성일: 2026-06-26
> 대상 프로젝트: `/Users/cudy/dev/cudy/superpowers` (obra/superpowers v6.0.3, MIT)
> 산출물: `/Users/cudy/dev/cudy/superpowers-study/` 아래 HTML 학습 자료 세트
> 자매 프로젝트: `openclaude-study` (동일 형식·템플릿을 계승)

---

## 1. 목적 (Why)

AI 시대의 개발자로서 역량 방향을 잡기 위해 에이전트 코딩 생태계의 핵심 프로젝트들을 분석한다.
첫 번째가 `openclaude`(에이전트 런타임 그 자체)였다면, 두 번째인 **Superpowers**는 그 위에서
**"에이전트가 어떻게 일해야 좋은 코드를 만드는가"** 를 정의하는 **방법론 레이어**다.

실제로 이 플러그인을 사용한 뒤 코드 퀄리티가 크게 올랐기에, **"주로 쓰는 개념들이 무엇이고,
그것들이 어떻게 구현·설계되었는가"** 를 깊이 이해하는 것이 목표다. 최종적으로 "스킬 사용자"에서
"방법론/스킬 빌더"의 관점으로 전환하는 것을 지향한다.

## 2. 학습자 프로파일 (Constraints)

- **TypeScript/Node: 능숙**, bash/마크다운/JSON 읽기 무리 없음 → 문법 설명 생략.
- **LLM/에이전트 내부: 사용자~중급** → 행동 형성(behavior-shaping) 프롬프트 엔지니어링,
  스킬 자동 트리거, 서브에이전트 오케스트레이션 같은 에이전트 고유 원리는 개념부터 설명.
- **Superpowers: 실사용 경험 있음** → "무엇을 하는지"보다 **"왜·어떻게 그렇게 설계했는지"** 에 집중.
- 선호 학습 방식: **개념 해설 + 아키텍처 다이어그램 + 디테일한 실제 발췌(스킬/훅/설정).**

## 3. 범위 (Scope)

**포함 — Superpowers의 핵심 (세 렌즈):**
- **방법론/철학**: brainstorming → writing-plans → subagent-driven-development → executing-plans
  → verification, TDD, YAGNI/DRY, 리뷰·검증 게이트.
- **구현/엔지니어링**: 스킬 파일 구조(frontmatter), SessionStart hook 부트스트랩, 자동 트리거,
  멀티하니스 이식(claude/codex/gemini/copilot/cursor 등).
- **아키텍처/설계패턴**: 스킬의 조합성(composability), 관심사 분리, 행동 형성 언어 기법
  (Red Flags 표 · 합리화 차단 · "your human partner" 용어 · HARD-GATE · dot-graph 플로우차트).

**제외 — 부수 인프라:**
빌드/배포 스크립트(`scripts/`), eval 하니스(`evals/`, `drill`) 세부, CI(`.github/`),
각 하니스별 패키징 메타파일 세부(`.codex-plugin`, `.opencode` 등 — 개념 언급은 하되 독립 모듈 X),
시각적 브레인스토밍 동반 서버(visual companion)의 구현 세부.

## 4. 산출물 형식 (Output Format)

각 모듈 = HTML 파일 1개. `openclaude-study`와 **동일한 형식**으로 통일한다.

### 공통 HTML 템플릿 (모든 모듈)
1. **왜 이 개념인가** — AI 시대 개발자가 알아야 할 이유 (사용자 → 빌더 관점)
2. **아키텍처 다이어그램** — Mermaid 플로우차트/시퀀스 (CDN 임베드, 빌드 불필요)
3. **핵심 메커니즘 해설** — 개념을 단계별로
4. **실제 발췌** — Superpowers 소스에서 인용. **코드뿐 아니라 스킬 마크다운 / 훅 bash /
   frontmatter / JSON 설정** 발췌. 문법 하이라이팅, `파일:라인` 출처 명시, 다양하고 디테일하게.
5. **"직접 만든다면" 교훈** — 미니 의사코드/스킬 골격 + 설계 트레이드오프
6. **네비게이션** — 상단 모듈 간 이동 + `index.html` 허브 복귀, 하단 pager

### 기술 선택
- 정적 HTML + CDN(Mermaid.js, highlight.js). 빌드 스텝 없음 — 파일 더블클릭으로 열림.
- 공통 CSS 1개(`assets/style.css`)는 `openclaude-study/assets/style.css`를 복사해 톤 통일.
- 발췌는 실제 Superpowers 소스를 인용하되, 길면 핵심부만 발췌하고 `파일:라인` 표기.
- 마크다운 발췌 하이라이팅: highlight.js `markdown`/`bash`/`json` 언어 클래스 사용.

## 5. 커리큘럼 (Modules)

구조 원칙: **개념별 자기완결 문서(thematic)** 를 의존성 순서로 배열하고, 맨 앞에 **전체 조감도**와
**한 워크플로우의 구체적 흐름**을 두어 큰 그림을 먼저 잡는다. (openclaude-study의 0·1 패턴 계승)

| # | 모듈 | 핵심 질문 | 렌즈 | 주요 소스 |
|---|------|----------|------|----------|
| 0 | **전체 조감도** | Superpowers는 무엇이고 어떤 레이어로 구성되나 — 부트스트랩 → 라우터 스킬 → 스킬 라이브러리 → 방법론 파이프라인. "무엇이 어디에" | 아키텍처 | 레포 전체, `README.md`, `skills/`, `hooks/` |
| 1 | **"Let's build X"의 전체 흐름** | 유저가 "react todo 만들자" → 결과까지 end-to-end 추적. 스킬들이 어떻게 연쇄 발동하나 | 방법론 | `using-superpowers`, `brainstorming`, `writing-plans`, `subagent-driven-development`, `executing-plans` |
| 2 | **Skill 해부학** | 스킬이란 무엇인가 — frontmatter(name/description), when-to-use 트리거, 스킬 3종(technique/pattern/reference), 디렉터리 구조, progressive disclosure(지원 파일) | 구현 | `skills/writing-skills/SKILL.md`, 임의 스킬 여러 개의 frontmatter |
| 3 | **부트스트랩 & 자동 트리거** | "그냥 알아서 발동"의 엔지니어링 — SessionStart hook 주입, `using-superpowers` 라우터, "1% 규칙", 멀티하니스 적응(claude/codex/gemini/copilot/cursor) | 구현 | `hooks/session-start`, `hooks/hooks*.json`, `skills/using-superpowers/SKILL.md` + `references/*` |
| 4 | **방법론 파이프라인** | 아이디어 → 스펙 → 플랜 → 실행. HARD GATE와 "설계 먼저" 철학. 왜 코드 퀄리티가 오르나 | 방법론 | `skills/brainstorming`, `skills/writing-plans`, `skills/executing-plans` |
| 5 | **모든 것에 TDD** | RED-GREEN-REFACTOR. 메타 개념: "스킬 작성 = 문서에 적용한 TDD"(서브에이전트 압박 테스트). YAGNI/DRY, 테스트 안티패턴 | 방법론 | `skills/test-driven-development/*`, `skills/writing-skills/*` |
| 6 | **서브에이전트 주도 개발 & 병렬화** | 에이전트가 몇 시간 자율 작업하는 법 — 위임·격리·병렬 | 아키텍처 | `skills/subagent-driven-development`, `skills/dispatching-parallel-agents`, `skills/using-git-worktrees` |
| 7 | **리뷰 & 검증 루프** | 품질 게이트 — 코드 리뷰 요청/수신, 완료 전 검증, 브랜치 마무리 | 방법론 | `skills/requesting-code-review`, `skills/receiving-code-review`, `skills/verification-before-completion`, `skills/finishing-a-development-branch` |
| 8 | **행동 형성 언어 기법** | 가장 깊은 설계패턴 — "스킬은 산문이 아니라 코드". Red Flags 표 · 합리화 차단 리스트 · "your human partner" 용어 · HARD-GATE · dot-graph 플로우차트가 왜 효과적인가 | 설계패턴 | 전 스킬 횡단, `CLAUDE.md`(기여 가이드라인), `skills/writing-skills` |

## 6. 파일 배치

```
/Users/cudy/dev/cudy/superpowers-study/
├── index.html              # 허브: 커리큘럼 개요 + 모듈 카드 + 마스터 아키텍처 다이어그램
├── 00-overview.html
├── 01-full-workflow.html
├── 02-skill-anatomy.html
├── 03-bootstrap-autotrigger.html
├── 04-methodology-pipeline.html
├── 05-tdd-everywhere.html
├── 06-subagent-parallelism.html
├── 07-review-verification.html
├── 08-behavior-shaping.html
├── assets/
│   └── style.css           # openclaude-study에서 복사한 공통 다크 테마 CSS
└── docs/specs/             # 본 설계 문서
```

## 7. 작업 방식 (Implementation Notes)

- 각 모듈 작성 전, 해당 스킬/훅의 실제 소스를 정독하여 **정확한 `파일:라인` 인용**을 확보한다.
  추측으로 발췌하지 않는다 (클론된 `/Users/cudy/dev/cudy/superpowers`가 단일 출처).
- 다이어그램은 Mermaid로. 흐름(파이프라인·트리거 연쇄)은 시퀀스/플로우차트, 구조는 그래프로.
- 모듈 0(조감도)과 1(전체 흐름)을 먼저 완성해 큰 그림을 확정한 뒤 2~8을 순차 작성.
- 발췌는 "다양하게" — 한 모듈에 한 종류만 보여주지 말고 대표 패턴 여러 개를 인용.
- `style.css`는 새로 만들지 말고 `openclaude-study/assets/style.css`를 복사(자매 자료 톤 일치).

## 8. 성공 기준 (Success Criteria)

- 9개 HTML 모듈 + index 허브가 모두 열리고 상호 네비게이션이 동작한다.
- 각 모듈이 공통 템플릿 6요소를 모두 포함한다.
- 모든 발췌가 실제 Superpowers 소스의 `파일:라인`과 일치한다 (검증됨).
- 학습자가 각 모듈을 읽고 "이 개념이 왜 필요하고, 어떻게 구현·설계했고, 내가 만든다면
  어떻게 할지"를 설명할 수 있다.
- 세 렌즈(방법론/구현/설계패턴)가 커리큘럼 전반에 고르게 반영된다.

## 9. 비목표 (Non-Goals / YAGNI)

- Superpowers를 수정·기여(PR)하지 않는다 (학습 자료 생성이 목표).
- 빌드/배포/eval 하니스를 독립 모듈로 다루지 않는다.
- 인터랙티브 웹앱(검색, 동적 실행)을 만들지 않는다. 정적 HTML로 충분.
- openclaude와의 본격 비교 챕터는 두지 않는다 (필요 시 본문에서 가볍게 언급만).

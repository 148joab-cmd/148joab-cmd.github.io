import React, { useState, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  BookOpen, CheckCircle2, Circle, ChevronLeft, ChevronRight, GraduationCap,
  ListChecks, User, Mail, Award, Layers, ArrowRight, RotateCcw, Loader2,
  Sun, Moon, MessageSquare, LogIn, LogOut, Search, Plus, Send,
  LayoutDashboard, Trophy, Lock, Play, FileText, PlusCircle, X,
  Bookmark, Star, NotebookPen, PlayCircle, Printer, Check,
  Flame, Zap, Target, Download, Type,
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";

const COURSES = [
  {
    id: "c1", tag: "마이크로러닝", title: "마이크로러닝 설계 입문",
    hours: "2시간", instructor: "송강건",
    blurb: "짧고 강력한 학습 단위를 설계하는 원칙과 패턴.",
    sections: [
      { id: "c1s1", title: "1. 기초 다지기", lessons: [
        { id: "c1l1", type: "video", title: "오리엔테이션: 이 강좌의 지도", duration: "3:00",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          body: ["이 강좌는 마이크로러닝의 개념부터 실제 설계·평가까지를 다룹니다. 영상은 자유 이용(Creative Commons) 샘플이며 실제 강의로 교체할 수 있습니다."] },
        { id: "c1l2", type: "text", title: "마이크로러닝의 정의와 흔한 오해", body: [
          "마이크로러닝은 '짧은 영상'이 아니라 '하나의 학습목표를 달성하는 가장 작은 완결 단위'입니다. 길이가 아니라 목표의 단일성이 본질입니다.",
          { type: "table", headers: ["흔한 오해", "실제"], rows: [
            ["무조건 짧으면 된다", "길이가 아니라 '단일 목표'가 핵심"],
            ["긴 과정을 잘게 자르면 된다", "각 단위가 독립적으로 완결되어야 한다"],
            ["반드시 영상이어야 한다", "텍스트·인터랙션·체크리스트도 가능"],
          ]},
        ]},
        { id: "c1l3", type: "text", title: "인지 부하와 작은 단위", body: [
          "작업기억의 한계는 보통 4±1 청크 수준입니다. 한 번에 너무 많은 정보를 주면 학습이 아니라 과부하가 일어납니다.",
          { type: "svg", caption: "작업기억은 한 번에 소수의 청크만 처리한다", svg: `<svg viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg" font-family="Hanken Grotesk, system-ui, sans-serif"><text x="14" y="28" fill="var(--ink)" font-size="15" font-weight="700">작업기억 용량 ≈ 4±1 청크</text><rect x="14" y="48" width="100" height="58" rx="10" fill="var(--terra)" opacity="0.88"/><rect x="128" y="48" width="100" height="58" rx="10" fill="var(--terra)" opacity="0.88"/><rect x="242" y="48" width="100" height="58" rx="10" fill="var(--terra)" opacity="0.88"/><rect x="356" y="48" width="100" height="58" rx="10" fill="var(--terra)" opacity="0.88"/><rect x="470" y="48" width="100" height="58" rx="10" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="6 5"/><text x="64" y="83" fill="#fff" font-size="13" text-anchor="middle">청크1</text><text x="178" y="83" fill="#fff" font-size="13" text-anchor="middle">청크2</text><text x="292" y="83" fill="#fff" font-size="13" text-anchor="middle">청크3</text><text x="406" y="83" fill="#fff" font-size="13" text-anchor="middle">청크4</text><text x="520" y="74" fill="var(--muted)" font-size="12" text-anchor="middle">초과</text><text x="520" y="92" fill="var(--muted)" font-size="12" text-anchor="middle">과부하</text><text x="14" y="138" fill="var(--muted)" font-size="12">용량을 넘는 정보는 학습이 아니라 인지 과부하로 이어진다</text></svg>` },
          { type: "table", headers: ["인지 부하", "의미", "설계 방향"], rows: [
            ["외재적", "불필요한 장식·복잡한 UI", "줄인다"],
            ["본유적", "학습 내용 자체의 난도", "적정 수준 유지"],
            ["관련(유익)", "스키마 형성에 쓰는 노력", "촉진한다"],
          ]},
        ]},
      ]},
      { id: "c1s2", title: "2. 설계 패턴", lessons: [
        { id: "c1l4", type: "text", title: "학습목표 진술법 (ABCD)", body: [
          "좋은 마이크로러닝은 명확한 목표에서 시작합니다. ABCD 모형으로 측정 가능한 목표를 진술하세요.",
          { type: "table", headers: ["요소", "의미", "예시"], rows: [
            ["A · 대상", "누가", "신입 상담원은"],
            ["B · 행동", "무엇을 (측정 가능한 동사)", "3단계 공감 화법을 적용한다"],
            ["C · 조건", "어떤 상황에서", "고객 불만 응대 시"],
            ["D · 수준", "어느 정도로", "빠짐없이"],
          ]},
          "위 네 요소를 합치면: '신입 상담원은 고객 불만 응대 시 3단계 공감 화법을 빠짐없이 적용할 수 있다.'",
        ]},
        { id: "c1l5", type: "text", title: "한 화면 한 메시지", body: [
          "각 화면은 하나의 메시지만 전달합니다. 텍스트·이미지·인터랙션이 같은 목표를 향하도록 정렬하고, 주의를 분산시키는 요소는 제거하세요.",
          { type: "svg", caption: "여러 메시지를 한 화면에 몰면 주의가 분산된다", svg: `<svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg" font-family="Hanken Grotesk, system-ui, sans-serif"><rect x="20" y="40" width="260" height="160" rx="14" fill="none" stroke="var(--line)" stroke-width="2"/><text x="150" y="28" fill="var(--terra)" font-size="13" font-weight="700" text-anchor="middle">산만 · 메시지 다수</text><rect x="40" y="60" width="100" height="26" rx="6" fill="var(--muted)" opacity="0.5"/><rect x="160" y="60" width="100" height="26" rx="6" fill="var(--muted)" opacity="0.5"/><rect x="40" y="98" width="220" height="20" rx="6" fill="var(--muted)" opacity="0.35"/><circle cx="70" cy="160" r="22" fill="var(--muted)" opacity="0.4"/><rect x="110" y="140" width="150" height="44" rx="8" fill="var(--muted)" opacity="0.35"/><rect x="320" y="40" width="260" height="160" rx="14" fill="none" stroke="var(--green)" stroke-width="2"/><text x="450" y="28" fill="var(--green)" font-size="13" font-weight="700" text-anchor="middle">집중 · 단일 메시지</text><rect x="380" y="100" width="140" height="40" rx="10" fill="var(--terra)"/><text x="450" y="125" fill="#fff" font-size="14" text-anchor="middle" font-weight="600">핵심 1개</text></svg>` },
        ]},
        { id: "c1l6", type: "video", title: "사례 분석: 우수 마이크로러닝 해부", duration: "5:30",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          body: ["실제 콘텐츠를 목표·구조·피드백 관점에서 분해해 봅니다. 무엇이 '단일 목표'를 지켰고 무엇이 어겼는지 확인하세요."] },
        { id: "c1l7", type: "text", title: "즉시 적용 과제 설계", body: [
          "학습 직후 현업에 바로 적용할 1분 과제를 붙입니다. '배운 것'이 아니라 '할 수 있는 것'으로 끝나야 전이가 일어납니다.",
          { type: "table", headers: ["나쁜 마무리", "좋은 마무리"], rows: [
            ["핵심 요약 슬라이드", "실제 업무 상황을 가정한 적용 과제"],
            ["'수고하셨습니다'", "오늘 배운 화법을 다음 통화에 1회 적용하기"],
          ]},
        ]},
      ]},
      { id: "c1s3", title: "3. 평가", lessons: [
        { id: "c1l8", type: "quiz", title: "종합 평가", quiz: [
          { q: "마이크로러닝의 본질로 가장 적절한 것은?", a: ["무조건 짧게", "하나의 학습목표 단일성", "영상 형식", "퀴즈 다수 포함"], correct: 1 },
          { q: "줄여야 할 인지 부하는?", a: ["본유적 부하", "외재적 부하", "관련 부하", "핵심 부하"], correct: 1 },
          { q: "ABCD에서 'D'가 의미하는 것은?", a: ["대상", "조건", "행동", "수준(기준)"], correct: 3 },
          { q: "전이를 높이는 과제 설계는?", a: ["이론 요약", "실제 업무 조건과 동일", "추가 강의 링크", "긴 시험"], correct: 1 },
        ]},
      ]},
    ],
  },
  {
    id: "c2", tag: "학습이론", title: "성인 학습 이론과 적용",
    hours: "2.5시간", instructor: "송강건",
    blurb: "안드라고지부터 자기주도학습까지, 현장에 쓰는 이론.",
    sections: [
      { id: "c2s1", title: "1. 안드라고지의 원리", lessons: [
        { id: "c2l1", type: "video", title: "오리엔테이션: 성인은 다르게 배운다", duration: "3:30",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          body: ["아동 교육(페다고지)과 성인 교육(안드라고지)의 전제 차이를 개관합니다."] },
        { id: "c2l2", type: "text", title: "경험을 자원으로", body: [
          "성인은 풍부한 경험을 학습 자원으로 가져옵니다. 강의보다 토론·사례·문제해결이 효과적인 이유입니다.",
          { type: "table", headers: ["관점", "페다고지(아동)", "안드라고지(성인)"], rows: [
            ["학습 동기", "외적(시험·평가)", "내적(필요·문제 해결)"],
            ["경험의 역할", "제한적", "핵심 학습 자원"],
            ["지향", "주제 중심", "문제 중심"],
            ["주도성", "교사 주도", "자기 주도"],
          ]},
        ]},
        { id: "c2l3", type: "text", title: "즉시성과 문제 중심", body: [
          "성인은 '지금 필요한' 지식을 우선 학습합니다. 주제 중심이 아니라 실제 문제 중심으로 구성하세요.",
        ]},
        { id: "c2l4", type: "text", title: "자기주도성과 내적 동기", body: [
          "성인은 스스로 결정하고자 하는 욕구가 강합니다. 학습 경로·속도·선택지를 일부 위임하면 주인의식과 지속률이 올라갑니다.",
        ]},
      ]},
      { id: "c2s2", title: "2. 동기와 환경 설계", lessons: [
        { id: "c2l5", type: "text", title: "동기 설계: ARCS 모형", body: [
          "켈러의 ARCS는 동기를 네 단계로 설계합니다. 도입에서 호기심을 자극하고, 학습자 맥락과 연결하며, 성공 경험을 쌓고, 성취를 인정하는 흐름입니다.",
          { type: "svg", caption: "ARCS: 동기는 순차적으로 설계된다", svg: `<svg viewBox="0 0 600 110" xmlns="http://www.w3.org/2000/svg" font-family="Hanken Grotesk, system-ui, sans-serif"><g><rect x="8" y="30" width="124" height="56" rx="12" fill="var(--terra)" opacity="0.9"/><text x="70" y="58" fill="#fff" font-size="20" font-weight="700" text-anchor="middle">A</text><text x="70" y="76" fill="#fff" font-size="12" text-anchor="middle">주의</text><rect x="158" y="30" width="124" height="56" rx="12" fill="var(--terra)" opacity="0.78"/><text x="220" y="58" fill="#fff" font-size="20" font-weight="700" text-anchor="middle">R</text><text x="220" y="76" fill="#fff" font-size="12" text-anchor="middle">관련성</text><rect x="308" y="30" width="124" height="56" rx="12" fill="var(--terra)" opacity="0.66"/><text x="370" y="58" fill="#fff" font-size="20" font-weight="700" text-anchor="middle">C</text><text x="370" y="76" fill="#fff" font-size="12" text-anchor="middle">자신감</text><rect x="458" y="30" width="124" height="56" rx="12" fill="var(--green)"/><text x="520" y="58" fill="#fff" font-size="20" font-weight="700" text-anchor="middle">S</text><text x="520" y="76" fill="#fff" font-size="12" text-anchor="middle">만족</text><path d="M134 58 L156 58" stroke="var(--muted)" stroke-width="2" marker-end="url(#a2)"/><path d="M284 58 L306 58" stroke="var(--muted)" stroke-width="2" marker-end="url(#a2)"/><path d="M434 58 L456 58" stroke="var(--muted)" stroke-width="2" marker-end="url(#a2)"/></g><defs><marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="var(--muted)"/></marker></defs></svg>` },
          { type: "table", headers: ["단계", "목표", "전술 예시"], rows: [
            ["A · 주의", "호기심 자극", "의외의 사실·질문으로 시작"],
            ["R · 관련성", "나와 연결", "학습자 업무 사례 사용"],
            ["C · 자신감", "해낼 수 있다", "난도 점진 상승·성공 경험"],
            ["S · 만족", "보람", "즉시 적용 기회·성취 인정"],
          ]},
        ]},
        { id: "c2l6", type: "text", title: "자기주도학습 환경 만들기", body: [
          "선택지, 명확한 목표, 즉각적 피드백, 진도 가시화는 자기주도학습을 떠받치는 네 기둥입니다.",
          { type: "table", headers: ["기둥", "역할"], rows: [
            ["선택지", "주도성 부여"],
            ["명확한 목표", "방향 제시"],
            ["즉각 피드백", "교정 학습"],
            ["진도 가시화", "자기 점검(이 LMS의 진도바·대시보드)"],
          ]},
        ]},
        { id: "c2l7", type: "video", title: "사례: 성인 워크숍 설계 톺아보기", duration: "6:00",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          body: ["안드라고지·ARCS가 실제 워크숍 흐름에 어떻게 녹아드는지 단계별로 살펴봅니다."] },
      ]},
      { id: "c2s3", title: "3. 평가", lessons: [
        { id: "c2l8", type: "quiz", title: "종합 평가", quiz: [
          { q: "성인 학습자의 가장 큰 자원은?", a: ["교재", "축적된 경험", "강사", "시험"], correct: 1 },
          { q: "권장되는 콘텐츠 구성 방식은?", a: ["주제 중심", "문제 중심", "연대기 순", "난이도 순"], correct: 1 },
          { q: "ARCS의 'R'은 무엇인가?", a: ["주의", "관련성", "자신감", "만족"], correct: 1 },
          { q: "자기주도학습의 기둥이 아닌 것은?", a: ["선택지", "즉각 피드백", "진도 가시화", "엄격한 통제"], correct: 3 },
        ]},
      ]},
    ],
  },
  {
    id: "c3", tag: "e러닝 제작", title: "인터랙티브 e러닝 제작",
    hours: "3시간", instructor: "송강건",
    blurb: "상호작용과 피드백을 설계해 몰입을 끌어올리기.",
    sections: [
      { id: "c3s1", title: "1. 상호작용 설계", lessons: [
        { id: "c3l1", type: "video", title: "오리엔테이션: 클릭이 곧 학습은 아니다", duration: "3:00",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          body: ["상호작용의 양이 아니라 질이 학습을 만든다는 관점을 소개합니다."] },
        { id: "c3l2", type: "text", title: "의미 있는 상호작용", body: [
          "클릭을 위한 클릭은 학습을 방해합니다. 상호작용은 의사결정·예측·적용 같은 인지 활동을 유발할 때만 의미가 있습니다.",
          { type: "table", headers: ["무의미한 상호작용", "의미 있는 상호작용"], rows: [
            ["다음 버튼만 반복 클릭", "상황 판단 후 의사결정"],
            ["정답 맞히기용 퀴즈", "예측하고 결과 확인"],
            ["장식적 애니메이션", "개념을 직접 조작하며 탐구"],
          ]},
        ]},
        { id: "c3l3", type: "text", title: "피드백 루프", body: [
          "정답/오답을 넘어 '왜'를 설명하는 피드백이 학습을 만듭니다. 즉각적이고 구체적인 피드백을 모든 활동에 설계하세요.",
          { type: "table", headers: ["피드백 수준", "내용", "학습 효과"], rows: [
            ["정오 피드백", "맞다 / 틀리다", "낮음"],
            ["정답 제시", "올바른 답 안내", "중간"],
            ["설명 피드백", "왜 그런지 설명", "높음"],
          ]},
        ]},
        { id: "c3l4", type: "text", title: "분기형 시나리오 설계", body: [
          "분기형 시나리오는 학습자의 선택에 따라 결과가 달라지는 구조입니다. 현실의 의사결정을 안전하게 연습하게 합니다.",
          { type: "svg", caption: "하나의 상황에서 선택에 따라 결과가 갈라진다", svg: `<svg viewBox="0 0 600 210" xmlns="http://www.w3.org/2000/svg" font-family="Hanken Grotesk, system-ui, sans-serif"><rect x="220" y="10" width="160" height="44" rx="10" fill="var(--terra)"/><text x="300" y="37" fill="#fff" font-size="13" text-anchor="middle" font-weight="600">고객 불만 상황</text><path d="M300 54 L100 96" stroke="var(--muted)" stroke-width="2"/><path d="M300 54 L300 96" stroke="var(--muted)" stroke-width="2"/><path d="M300 54 L500 96" stroke="var(--muted)" stroke-width="2"/><rect x="30" y="96" width="140" height="40" rx="9" fill="none" stroke="var(--line)" stroke-width="2"/><text x="100" y="121" fill="var(--ink)" font-size="12" text-anchor="middle">선택 A</text><rect x="230" y="96" width="140" height="40" rx="9" fill="none" stroke="var(--line)" stroke-width="2"/><text x="300" y="121" fill="var(--ink)" font-size="12" text-anchor="middle">선택 B</text><rect x="430" y="96" width="140" height="40" rx="9" fill="none" stroke="var(--line)" stroke-width="2"/><text x="500" y="121" fill="var(--ink)" font-size="12" text-anchor="middle">선택 C</text><path d="M100 136 L100 162" stroke="var(--muted)" stroke-width="2"/><path d="M300 136 L300 162" stroke="var(--muted)" stroke-width="2"/><path d="M500 136 L500 162" stroke="var(--muted)" stroke-width="2"/><rect x="30" y="162" width="140" height="38" rx="9" fill="var(--muted)" opacity="0.25"/><text x="100" y="186" fill="var(--ink)" font-size="12" text-anchor="middle">결과·피드백</text><rect x="230" y="162" width="140" height="38" rx="9" fill="var(--green)" opacity="0.7"/><text x="300" y="186" fill="#fff" font-size="12" text-anchor="middle">최선의 결과</text><rect x="430" y="162" width="140" height="38" rx="9" fill="var(--muted)" opacity="0.25"/><text x="500" y="186" fill="var(--ink)" font-size="12" text-anchor="middle">결과·피드백</text></svg>` },
        ]},
      ]},
      { id: "c3s2", title: "2. 제작 실무", lessons: [
        { id: "c3l5", type: "text", title: "스토리보드 작성법", body: [
          "스토리보드는 화면별로 텍스트·시각·오디오·인터랙션·분기를 한눈에 정리한 설계도입니다. 제작 전에 이해관계자와 합의하면 재작업 비용을 크게 줄입니다.",
          { type: "table", headers: ["열", "담는 내용"], rows: [
            ["화면 ID", "순서·구분"],
            ["화면 텍스트", "표시 문구"],
            ["시각 / 오디오", "이미지·내레이션"],
            ["인터랙션", "클릭·드래그 등"],
            ["분기", "조건별 이동"],
          ]},
        ]},
        { id: "c3l6", type: "text", title: "멀티미디어 설계 원리 (메이어)", body: [
          "메이어의 멀티미디어 학습 원리는 인지 부하를 낮추고 핵심에 집중하게 합니다.",
          { type: "table", headers: ["원리", "내용"], rows: [
            ["일관성", "불필요한 요소 제거"],
            ["신호", "핵심을 강조하는 단서 제공"],
            ["근접성", "관련 텍스트·이미지를 가까이 배치"],
            ["중복 회피", "화면 텍스트와 내레이션을 동시 중복하지 않기"],
          ]},
        ]},
        { id: "c3l7", type: "video", title: "사례: Storyline 인터랙션 제작", duration: "7:00",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
          body: ["드래그앤드롭·분기 시나리오를 저작도구에서 구현하는 흐름을 시연합니다."] },
      ]},
      { id: "c3s3", title: "3. 평가", lessons: [
        { id: "c3l8", type: "quiz", title: "종합 평가", quiz: [
          { q: "의미 있는 상호작용의 조건은?", a: ["화면이 화려", "인지 활동 유발", "클릭이 많음", "애니메이션"], correct: 1 },
          { q: "효과적 피드백의 핵심은?", a: ["정답 여부만", "점수만", "'왜'를 설명", "다음으로 넘김"], correct: 2 },
          { q: "분기형 시나리오의 목적은?", a: ["재미", "의사결정 연습", "분량 늘리기", "영상 대체"], correct: 1 },
          { q: "메이어의 원리가 아닌 것은?", a: ["일관성", "신호", "근접성", "중복 강조"], correct: 3 },
        ]},
      ]},
    ],
  },
];

const COURSE_GOALS = {
  c1: ["마이크로러닝의 본질을 설명한다", "ABCD로 학습목표를 진술한다", "전이를 높이는 적용 과제를 설계한다"],
  c2: ["페다고지와 안드라고지를 구분한다", "ARCS로 동기를 설계한다", "자기주도학습 환경을 구성한다"],
  c3: ["의미 있는 상호작용을 판별한다", "분기형 시나리오를 설계한다", "메이어 원리로 화면을 구성한다"],
};
const todayKey = () => new Date().toISOString().slice(0, 10);
const DAY = 86400000;
const SEED_POSTS = [
  { id: "seed1", title: "마이크로러닝 과정 듣고 사내 교육 갈아엎었습니다", authorName: "김서연", author: "_seed",
    body: "ABCD 목표 진술법 파트가 정말 도움이 됐어요. 그동안 '~를 이해한다' 같은 목표만 쓰다가, 측정 가능한 동사로 바꾸니 평가 설계까지 자연스럽게 따라오더라고요. 다른 분들은 어떤 동사 자주 쓰시나요?",
    ts: Date.now() - DAY * 1, comments: [
      { author: "박준호", text: "저는 '판별한다', '적용한다'를 자주 씁니다. 측정이 명확해서 좋아요.", ts: Date.now() - DAY * 0.8 },
      { author: "송강건", text: "좋은 질문이에요! Bloom 분류의 동사 목록을 참고하시면 단계별로 정리됩니다.", ts: Date.now() - DAY * 0.7 },
    ]},
  { id: "seed2", title: "ARCS 모형, 도입부 설계에 바로 써먹었어요", authorName: "이하늘", author: "_seed",
    body: "Attention 단계에서 의외의 통계로 시작했더니 워크숍 몰입도가 확 올라갔습니다. Relevance를 학습자 업무 사례로 연결하는 부분이 핵심인 것 같아요.",
    ts: Date.now() - DAY * 2, comments: [
      { author: "최유진", text: "맞아요. Confidence 단계에서 작은 성공 경험을 먼저 주는 것도 효과적이더라고요.", ts: Date.now() - DAY * 1.9 },
    ]},
  { id: "seed3", title: "분기형 시나리오 제작 팁 공유합니다", authorName: "정민재", author: "_seed",
    body: "오답 선택지마다 결과 피드백을 붙이는 게 생각보다 시간이 많이 걸립니다. 저는 스토리보드 단계에서 분기표를 먼저 그리고 시작하는데, 재작업이 확실히 줄어요. 사례 영상 강의 강추합니다.",
    ts: Date.now() - DAY * 3, comments: [] },
  { id: "seed4", title: "성인학습 이론 강의 교수자 연수에 인용해도 될까요?", authorName: "한도윤", author: "_seed",
    body: "페다고지 vs 안드라고지 비교 표가 너무 깔끔해서 우리 센터 연수 자료에 출처 밝히고 쓰고 싶은데 괜찮을까요?",
    ts: Date.now() - DAY * 4, comments: [
      { author: "송강건", text: "출처만 표기해 주시면 자유롭게 활용하셔도 됩니다. 도움이 됐다니 기쁘네요!", ts: Date.now() - DAY * 3.9 },
    ]},
  { id: "seed5", title: "이 LMS 사이트 자체가 포트폴리오라는 게 인상적", authorName: "박지우", author: "_seed",
    body: "학습 이론을 콘텐츠로만 다루는 게 아니라 사이트 설계에까지 적용한 점이 좋았어요. 진도 추적, 퀴즈 리뷰, 분석 차트까지 학습 경험 전체가 일관되네요.",
    ts: Date.now() - DAY * 5, comments: [] },
];
const TESTIMONIALS = [
  { name: "김서연", role: "HRD 매니저 · 핀테크", stars: 5, text: "ABCD 목표 진술법 강의를 듣고 사내 교육 설계서를 전부 다시 썼어요. 막연했던 '학습목표'가 측정 가능한 문장으로 바뀌었습니다." },
  { name: "박준호", role: "교육 담당 · 제조업", stars: 5, text: "마이크로러닝 과정이 특히 좋았습니다. 1시간짜리 영상만 만들던 우리 팀이 '한 화면 한 메시지' 원칙으로 완료율을 크게 올렸어요." },
  { name: "이하늘", role: "프리랜서 강사", stars: 4, text: "ARCS 모형 설명이 가장 실용적이었습니다. 도입부에서 주의를 끄는 방법을 바로 워크숍에 적용했더니 참여도가 달라졌어요." },
  { name: "정민재", role: "이러닝 PD", stars: 5, text: "분기형 시나리오와 피드백 루프 파트는 저작도구로 바로 구현할 수 있게 구체적이었습니다. 사례 영상이 큰 도움이 됐어요." },
  { name: "최유진", role: "대학 교수학습센터", stars: 5, text: "성인학습 이론을 이렇게 현장 언어로 풀어준 자료는 처음입니다. 교수자 연수 자료로 그대로 인용하고 싶을 정도예요." },
  { name: "한도윤", role: "스타트업 People팀", stars: 4, text: "퀴즈 정답 리뷰와 진도 추적까지 학습 경험 전체가 잘 설계돼 있어요. 이 사이트 자체가 포트폴리오라는 게 인상적이었습니다." },
];
function calcStreak(days) {
  const set = new Set(days || []); const d = new Date();
  if (!set.has(todayKey())) d.setDate(d.getDate() - 1);
  let s = 0;
  for (;;) { const k = d.toISOString().slice(0, 10); if (set.has(k)) { s++; d.setDate(d.getDate() - 1); } else break; }
  return s;
}

const K_USERS = "minilms-users-v3", K_SESSION = "minilms-session-v3", K_BOARD = "minilms-board-v3";
const enc = (s) => btoa(unescape(encodeURIComponent(s)));

function parseVideo(url) {
  if (!url) return null;
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  if (yt) return { kind: "iframe", src: `https://www.youtube.com/embed/${yt[1]}` };
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { kind: "iframe", src: `https://player.vimeo.com/video/${vm[1]}` };
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) return { kind: "video", src: url };
  return { kind: "iframe", src: url };
}

/* ════════════════════════════  THREE.JS BG  ════════════════════════════ */
function ThreeBackground({ dark, reduceMotion }) {
  const mount = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const el = mount.current; if (!el) return;
    const w = () => el.clientWidth, h = () => el.clientHeight;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(60, w() / h(), 0.1, 100);
    cam.position.z = 14;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w(), h());
    el.appendChild(renderer.domElement);

    const N = 1500, pos = new Float32Array(N * 3);
    for (let i = 0; i < N * 3; i++) pos[i] = (Math.random() - 0.5) * 38;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const accent = dark ? 0x6d7bff : 0x3d4eff;
    const mat = new THREE.PointsMaterial({ color: accent, size: 0.06, transparent: true, opacity: dark ? 0.9 : 0.5 });
    const points = new THREE.Points(g, mat);
    scene.add(points);

    const shapes = [];
    const palette = [accent, dark ? 0x34d399 : 0x10b981];
    for (let i = 0; i < 6; i++) {
      const geo = new THREE.OctahedronGeometry(1.3 + Math.random() * 1.3, 0);
      const m = new THREE.MeshBasicMaterial({ color: palette[i % 2], wireframe: true, transparent: true, opacity: 0.16 });
      const mesh = new THREE.Mesh(geo, m);
      mesh.position.set((Math.random() - 0.5) * 26, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 8);
      scene.add(mesh); shapes.push(mesh);
    }

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    let raf, t = 0;
    const loop = () => {
      t += 0.0035;
      points.rotation.y = t; points.rotation.x = t * 0.45;
      shapes.forEach((s, i) => { s.rotation.x += 0.002 + i * 0.0006; s.rotation.y += 0.0032; });
      cam.position.x += (mouse.current.x * 2.2 - cam.position.x) * 0.04;
      cam.position.y += (-mouse.current.y * 2.2 - cam.position.y) * 0.04;
      cam.lookAt(scene.position);
      renderer.render(scene, cam);
      raf = requestAnimationFrame(loop);
    };
    if (reduceMotion) renderer.render(scene, cam); else loop();
    const onResize = () => { cam.aspect = w() / h(); cam.updateProjectionMatrix(); renderer.setSize(w(), h()); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose(); g.dispose(); mat.dispose();
      shapes.forEach((s) => { s.geometry.dispose(); s.material.dispose(); });
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, [dark, reduceMotion]);
  return <div ref={mount} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

function CursorGlow({ reduceMotion }) {
  const ref = useRef(null);
  useEffect(() => {
    if (reduceMotion) return;
    if (window.matchMedia("(pointer:coarse)").matches) return;
    let x = 0, y = 0, tx = 0, ty = 0, raf;
    const move = (e) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("mousemove", move);
    const loop = () => { x += (tx - x) * 0.13; y += (ty - y) * 0.13;
      if (ref.current) ref.current.style.transform = `translate(${x}px,${y}px)`;
      raf = requestAnimationFrame(loop); };
    loop();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} style={{ position: "fixed", top: -150, left: -150, width: 300, height: 300,
    borderRadius: "50%", pointerEvents: "none", zIndex: 1,
    background: "radial-gradient(circle, var(--glow) 0%, transparent 62%)", mixBlendMode: "plus-lighter" }} />;
}

/* ════════════════════════════  SCROLL REVEAL  ══════════════════════════ */
function Reveal({ children, delay = 0, tag = "div", className = "", style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVis(true); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { setVis(true); io.unobserve(el); } }), { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const Tag = tag;
  return <Tag ref={ref} className={`reveal ${vis ? "in" : ""} ${className}`} style={{ ...style, transitionDelay: `${delay}ms` }}>{children}</Tag>;
}

/* ════════════════════════════  STYLES (Electric)  ══════════════════════ */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');
    .lms{ font-family:'Manrope',system-ui,sans-serif; min-height:100vh; position:relative;
      --paper:#EAEDF3; --ink:#0C0F16; --muted:#5B6473; --line:#D8DCE6; --terra:#3D4EFF;
      --terra-d:#2C3AD6; --green:#10B981; --card:rgba(255,255,255,.86); --glow:rgba(61,78,255,.12);
      color:var(--ink); background:var(--paper); transition:background .4s,color .4s; }
    .lms.dark{ --paper:#0A0C12; --ink:#ECEEF5; --muted:#8A93A6; --line:#212838; --terra:#6D7BFF;
      --terra-d:#5160F0; --green:#34D399; --card:rgba(20,24,36,.72); --glow:rgba(109,123,255,.20); }
    .lms *{box-sizing:border-box;}
    .lms .serif{font-family:'Bricolage Grotesque',system-ui,sans-serif;letter-spacing:-.02em;}
    .lms .mono{font-family:'JetBrains Mono',monospace;}
    .lms .content{position:relative;z-index:2;}
    .lms .wrap{max-width:920px;margin:0 auto;padding:0 22px;}
    .lms .wrap.wide{max-width:1200px;}
    .lms .nav{position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--paper) 84%,transparent);
      backdrop-filter:blur(12px);border-bottom:1px solid var(--line);}
    .lms .nav-in{max-width:1200px;margin:0 auto;padding:12px 22px;display:flex;align-items:center;justify-content:space-between;gap:10px;}
    .lms .brand{display:flex;align-items:center;gap:9px;font-weight:800;font-size:16px;letter-spacing:-.02em;}
    .lms .brand .dot{width:26px;height:26px;border-radius:8px;background:var(--terra);display:grid;place-items:center;color:#fff;}
    .lms .navlinks{display:flex;gap:3px;align-items:center;flex-wrap:wrap;justify-content:flex-end;}
    .lms .navbtn{display:flex;align-items:center;gap:6px;border:none;cursor:pointer;background:transparent;
      color:var(--muted);font:700 13px 'Manrope';padding:8px 12px;border-radius:10px;transition:.15s;}
    .lms .navbtn:hover{color:var(--ink);background:color-mix(in srgb,var(--terra) 10%,transparent);}
    .lms .navbtn.on{color:#fff;background:var(--terra);}
    .lms .iconbtn{border:1px solid var(--line);background:var(--card);cursor:pointer;color:var(--ink);
      width:36px;height:36px;border-radius:10px;display:grid;place-items:center;transition:.15s;}
    .lms .iconbtn:hover{border-color:var(--terra);color:var(--terra);}
    .lms .hero{padding:56px 0 30px;border-bottom:1px solid var(--line);}
    .lms .eyebrow{font:600 11px 'JetBrains Mono';letter-spacing:.18em;text-transform:uppercase;color:var(--terra);}
    .lms h1{font:700 clamp(34px,6.5vw,58px)/1.02 'Bricolage Grotesque';margin:14px 0 0;letter-spacing:-.03em;}
    .lms .lead{color:var(--muted);font-size:17px;margin-top:14px;max-width:560px;line-height:1.55;font-weight:500;}
    .lms .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:28px;}
    .lms .stat{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px;backdrop-filter:blur(6px);}
    .lms .stat b{font:700 32px 'Bricolage Grotesque';display:block;letter-spacing:-.02em;}
    .lms .stat span{font:600 11px 'JetBrains Mono';color:var(--muted);letter-spacing:.08em;text-transform:uppercase;}
    .lms .toolbar{display:flex;gap:10px;align-items:center;margin:30px 0 6px;flex-wrap:wrap;}
    .lms .searchbox{flex:1;min-width:180px;display:flex;align-items:center;gap:8px;background:var(--card);
      border:1px solid var(--line);border-radius:12px;padding:11px 16px;}
    .lms .searchbox input{border:none;background:transparent;outline:none;flex:1;color:var(--ink);font:600 14px 'Manrope';}
    .lms .resume{display:flex;align-items:center;gap:10px;background:color-mix(in srgb,var(--terra) 10%,var(--card));
      border:1px solid var(--terra);border-radius:14px;padding:14px 18px;margin:24px 0 0;cursor:pointer;width:100%;text-align:left;transition:.15s;}
    .lms .resume:hover{background:color-mix(in srgb,var(--terra) 16%,var(--card));}
    .lms .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(252px,1fr));gap:16px;padding:18px 0 60px;}
    .lms .ccard{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:22px;cursor:pointer;
      transition:.18s;text-align:left;width:100%;backdrop-filter:blur(6px);position:relative;}
    .lms .ccard:hover{transform:translateY(-4px);border-color:var(--terra);box-shadow:0 18px 44px -22px var(--terra);}
    .lms .pill{display:inline-block;font:600 10.5px 'JetBrains Mono';letter-spacing:.06em;text-transform:uppercase;
      color:var(--terra);background:color-mix(in srgb,var(--terra) 12%,transparent);padding:5px 11px;border-radius:8px;}
    .lms .badge{position:absolute;top:16px;right:16px;color:var(--green);}
    .lms .ctitle{font:700 22px/1.15 'Bricolage Grotesque';margin:12px 0 6px;letter-spacing:-.02em;}
    .lms .cblurb{color:var(--muted);font-size:14px;line-height:1.5;font-weight:500;}
    .lms .meta{display:flex;align-items:center;gap:14px;margin-top:14px;font:600 12px 'JetBrains Mono';color:var(--muted);flex-wrap:wrap;}
    .lms .meta span{display:flex;align-items:center;gap:5px;}
    .lms .bar{height:7px;background:var(--line);border-radius:99px;overflow:hidden;margin-top:14px;}
    .lms .bar>i{display:block;height:100%;background:linear-gradient(90deg,var(--terra),var(--green));border-radius:99px;transition:.5s;}
    .lms .back{display:flex;align-items:center;gap:5px;background:none;border:none;cursor:pointer;
      color:var(--muted);font:700 13px 'Manrope';padding:24px 0 6px;}
    .lms .back:hover{color:var(--ink);}
    .lms .chead{display:flex;flex-wrap:wrap;gap:18px;align-items:flex-end;justify-content:space-between;}
    /* PLAYER */
    .lms .player{display:grid;grid-template-columns:1fr 350px;gap:26px;padding:16px 0 60px;align-items:start;}
    .lms .stage{min-width:0;}
    .lms .videobox{aspect-ratio:16/9;width:100%;background:#000;border-radius:16px;overflow:hidden;border:1px solid var(--line);}
    .lms .videobox iframe,.lms .videobox video{width:100%;height:100%;border:0;display:block;}
    .lms .ltype{display:inline-flex;align-items:center;gap:6px;font:600 11px 'JetBrains Mono';letter-spacing:.12em;
      text-transform:uppercase;color:var(--terra);margin-top:18px;}
    .lms .ltitle{font:700 28px/1.18 'Bricolage Grotesque';margin:8px 0 4px;letter-spacing:-.02em;}
    .lms .lessonbody{max-width:700px;}
    .lms .lessonbody p{font-size:17px;line-height:1.78;margin:0 0 16px;font-weight:500;}
    .lms .tablewrap{overflow-x:auto;margin:6px 0 20px;}
    .lms .ltable{width:100%;border-collapse:collapse;font-size:14px;background:var(--card);border:1px solid var(--line);border-radius:12px;overflow:hidden;}
    .lms .ltable th,.lms .ltable td{text-align:left;padding:11px 14px;border-bottom:1px solid var(--line);vertical-align:top;line-height:1.45;}
    .lms .ltable th{background:color-mix(in srgb,var(--terra) 12%,transparent);font:600 11px 'JetBrains Mono';letter-spacing:.05em;color:var(--terra);text-transform:uppercase;}
    .lms .ltable tr:last-child td{border-bottom:none;}
    .lms .fig{margin:8px 0 22px;}
    .lms .figsvg{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px;}
    .lms .figsvg svg{width:100%;height:auto;display:block;}
    .lms .fig img{width:100%;border-radius:16px;border:1px solid var(--line);display:block;}
    .lms .fig figcaption{font:600 12px 'JetBrains Mono';color:var(--muted);margin-top:8px;text-align:center;}
    .lms .actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px;align-items:center;}
    /* notes */
    .lms .notes{margin-top:26px;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px 18px;}
    .lms .noteshd{display:flex;align-items:center;gap:7px;font:700 13px 'Manrope';margin-bottom:10px;}
    .lms .notesarea{width:100%;min-height:90px;resize:vertical;background:transparent;border:1px dashed var(--line);
      border-radius:12px;padding:12px;color:var(--ink);font:500 14px 'Manrope';outline:none;line-height:1.6;}
    .lms .notesarea:focus{border-color:var(--terra);border-style:solid;}
    /* sidebar */
    .lms .side{background:var(--card);border:1px solid var(--line);border-radius:18px;overflow:hidden;backdrop-filter:blur(6px);position:sticky;top:78px;}
    .lms .sidehead{padding:16px 18px;border-bottom:1px solid var(--line);}
    .lms .sidehead .t{font:700 15px 'Manrope';}
    .lms .sect{border-bottom:1px solid var(--line);}
    .lms .secthead{padding:11px 18px;font:600 11px 'JetBrains Mono';letter-spacing:.05em;color:var(--muted);background:color-mix(in srgb,var(--line) 28%,transparent);}
    .lms .litem{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:none;cursor:pointer;
      background:transparent;padding:11px 18px;font:600 13.5px 'Manrope';color:var(--ink);transition:.12s;border-left:3px solid transparent;}
    .lms .litem:hover{background:color-mix(in srgb,var(--terra) 8%,transparent);}
    .lms .litem.active{background:color-mix(in srgb,var(--terra) 13%,transparent);border-left-color:var(--terra);}
    .lms .litem .ico{flex-shrink:0;color:var(--muted);display:inline-flex;}
    .lms .litem .nm{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .lms .litem .dur{font:600 11px 'JetBrains Mono';color:var(--muted);}
    .lms .btn{display:inline-flex;align-items:center;gap:8px;border:none;cursor:pointer;background:var(--terra);
      color:#fff;font:700 14px 'Manrope';padding:12px 20px;border-radius:12px;transition:.15s;}
    .lms .btn:hover{background:var(--terra-d);}
    .lms .btn.ghost{background:transparent;color:var(--ink);border:1px solid var(--line);}
    .lms .btn.ghost:hover{border-color:var(--terra);color:var(--terra);}
    .lms .btn.sm{padding:9px 14px;font-size:13px;}
    .lms .btn:disabled{opacity:.4;cursor:not-allowed;}
    .lms .navrow{display:flex;justify-content:space-between;gap:12px;margin-top:26px;padding-top:20px;border-top:1px solid var(--line);}
    .lms .qopt{display:flex;align-items:center;gap:12px;width:100%;text-align:left;background:var(--card);
      border:1.5px solid var(--line);border-radius:12px;padding:14px 16px;cursor:pointer;margin-bottom:10px;
      font:600 15px 'Manrope';color:var(--ink);transition:.12s;}
    .lms .qopt:hover{border-color:var(--terra);}
    .lms .qopt.sel{border-color:var(--terra);background:color-mix(in srgb,var(--terra) 8%,var(--card));}
    .lms .qopt.right{border-color:var(--green);background:color-mix(in srgb,var(--green) 12%,var(--card));}
    .lms .qopt.wrong{border-color:#E0556B;background:color-mix(in srgb,#E0556B 12%,var(--card));}
    .lms .qopt .mk{margin-left:auto;display:inline-flex;}
    .lms .qnum{font:600 11px 'JetBrains Mono';letter-spacing:.12em;text-transform:uppercase;color:var(--terra);margin:22px 0 10px;}
    .lms .qtext{font:700 18px/1.4 'Bricolage Grotesque';margin-bottom:14px;letter-spacing:-.01em;}
    .lms .scorenum{font:800 58px 'Bricolage Grotesque';color:var(--green);letter-spacing:-.03em;}
    /* ratings */
    .lms .ratings{display:flex;align-items:center;gap:10px;margin-top:14px;}
    .lms .stars{display:inline-flex;gap:2px;}
    .lms .star{background:none;border:none;cursor:pointer;padding:0;color:var(--muted);display:inline-flex;}
    .lms .star.fill{color:#F5A524;}
    .lms .star.ro{cursor:default;}
    .lms .ratenum{font:600 13px 'JetBrains Mono';color:var(--muted);}
    .lms .field{display:block;margin-bottom:14px;}
    .lms .field span{display:block;font:600 11px 'JetBrains Mono';letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:6px;}
    .lms .field input,.lms .field textarea{width:100%;background:var(--card);border:1px solid var(--line);
      border-radius:12px;padding:13px 15px;color:var(--ink);font:600 15px 'Manrope';outline:none;}
    .lms .field input:focus,.lms .field textarea:focus{border-color:var(--terra);}
    .lms .panel{max-width:430px;margin:30px auto 0;background:var(--card);border:1px solid var(--line);border-radius:22px;padding:30px;backdrop-filter:blur(8px);}
    .lms .err{color:#E0556B;font-size:13px;margin-top:4px;font-weight:600;}
    .lms .switch{background:none;border:none;color:var(--terra);font:700 13px 'Manrope';cursor:pointer;}
    .lms .addbox{padding:14px 18px;border-top:1px solid var(--line);}
    .lms .addbox input{width:100%;background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:9px 12px;color:var(--ink);font:600 13px 'Manrope';outline:none;margin-bottom:8px;}
    .lms .post{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px;margin-bottom:12px;cursor:pointer;transition:.15s;backdrop-filter:blur(6px);}
    .lms .post:hover{border-color:var(--terra);}
    .lms .post h3{font:700 18px 'Bricolage Grotesque';margin:0 0 4px;letter-spacing:-.01em;}
    .lms .postmeta{font:600 12px 'JetBrains Mono';color:var(--muted);display:flex;gap:10px;}
    .lms .skills{display:flex;flex-wrap:wrap;gap:8px;margin:20px 0 30px;}
    .lms .skill{font:600 13px 'Manrope';background:var(--card);border:1px solid var(--line);padding:8px 14px;border-radius:10px;backdrop-filter:blur(6px);}
    .lms .contact{display:flex;align-items:center;gap:10px;color:var(--terra);font:700 15px 'Manrope';}
    .lms .center{display:flex;justify-content:center;align-items:center;min-height:60vh;flex-direction:column;gap:14px;color:var(--muted);}
    .lms .secttl{font:600 11px 'JetBrains Mono';letter-spacing:.14em;text-transform:uppercase;color:var(--terra);padding:36px 0 4px;}
    .lms .cert{background:linear-gradient(135deg,color-mix(in srgb,var(--green) 16%,var(--card)),var(--card));
      border:1px solid var(--green);border-radius:16px;padding:16px;display:flex;align-items:center;gap:14px;margin:18px 0;flex-wrap:wrap;}
    /* modal + certificate */
    .lms .overlay{position:fixed;inset:0;z-index:50;background:rgba(8,10,16,.6);backdrop-filter:blur(4px);display:grid;place-items:center;padding:20px;}
    .lms .certsheet{background:var(--card);border:1px solid var(--line);border-radius:20px;max-width:560px;width:100%;
      padding:38px;position:relative;backdrop-filter:blur(10px);}
    .lms .certframe{border:2px solid var(--terra);border-radius:16px;padding:34px 28px;text-align:center;}
    .lms .certframe .k{font:600 11px 'JetBrains Mono';letter-spacing:.2em;text-transform:uppercase;color:var(--terra);}
    .lms .certframe .nm{font:800 38px 'Bricolage Grotesque';margin:14px 0 6px;letter-spacing:-.03em;}
    .lms .certframe .cs{font:600 16px 'Manrope';color:var(--muted);}
    .lms .closex{position:absolute;top:16px;right:16px;background:none;border:none;cursor:pointer;color:var(--muted);}
    @keyframes spin{to{transform:rotate(360deg)}}
    .lms.large .lessonbody p{font-size:19.5px;line-height:1.85;}
    .lms.large .ltitle{font-size:32px;}
    .lms.large .ltable{font-size:15px;}
    .lms.large .lead{font-size:18.5px;}
    .lms.large .litem{font-size:14.5px;}
    .lms .gamify{display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center;background:var(--card);
      border:1px solid var(--line);border-radius:16px;padding:16px 18px;margin-top:14px;backdrop-filter:blur(6px);}
    .lms .lvl{display:flex;align-items:center;gap:10px;}
    .lms .lvlbadge{width:46px;height:46px;border-radius:12px;background:linear-gradient(135deg,var(--terra),var(--green));
      color:#fff;display:grid;place-items:center;font:800 18px 'Bricolage Grotesque';}
    .lms .streak{display:flex;align-items:center;gap:6px;font:700 14px 'Manrope';color:#F5732B;}
    .lms .charts{display:grid;grid-template-columns:1fr 1.3fr;gap:16px;margin-top:14px;}
    .lms .chartcard{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px;backdrop-filter:blur(6px);}
    .lms .chartcard .ct{font:700 13px 'Manrope';margin-bottom:6px;}
    .lms .goals{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 16px;margin-top:14px;backdrop-filter:blur(6px);}
    .lms .goals .gt{font:600 11px 'JetBrains Mono';letter-spacing:.1em;text-transform:uppercase;color:var(--terra);margin-bottom:8px;}
    .lms .goals li{font:600 14px 'Manrope';margin:5px 0;display:flex;gap:8px;align-items:flex-start;color:var(--ink);}
    @media(max-width:680px){ .lms .charts{grid-template-columns:1fr;} .lms .gamify{grid-template-columns:1fr;text-align:center;} .lms .gamify .lvl,.lms .gamify .streak{justify-content:center;} }
    .lms .tgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;}
    .lms .tcard{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:22px;margin:0;backdrop-filter:blur(6px);transition:.18s;}
    .lms .tcard:hover{border-color:var(--terra);transform:translateY(-3px);}
    .lms .tquote{font:500 15.5px/1.6 'Manrope';margin:12px 0 18px;color:var(--ink);}
    .lms .twho{display:flex;align-items:center;gap:11px;}
    .lms .tav{width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,var(--terra),var(--green));
      color:#fff;display:grid;place-items:center;font:800 16px 'Bricolage Grotesque';flex-shrink:0;}
    .lms .twho b{font:700 14px 'Manrope';display:block;}
    .lms .trole{font:600 12px 'JetBrains Mono';color:var(--muted);display:block;margin-top:1px;}
    .lms .reveal{opacity:0;transform:translateY(24px);transition:opacity .6s cubic-bezier(.22,.61,.36,1),transform .6s cubic-bezier(.22,.61,.36,1);}
    .lms .reveal.in{opacity:1;transform:none;}
    .lms .featgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px;padding-bottom:8px;}
    .lms .feat{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:20px;backdrop-filter:blur(6px);height:100%;}
    .lms .feat .featic{width:42px;height:42px;border-radius:11px;display:grid;place-items:center;color:var(--terra);
      background:color-mix(in srgb,var(--terra) 12%,transparent);margin-bottom:12px;}
    .lms .feat b{font:700 16px 'Manrope';display:block;margin-bottom:5px;}
    .lms .feat span{font:500 13.5px/1.55 'Manrope';color:var(--muted);}
    .lms .faq{background:var(--card);border:1px solid var(--line);border-radius:16px;overflow:hidden;backdrop-filter:blur(6px);}
    .lms .faqitem{border-bottom:1px solid var(--line);}
    .lms .faqitem:last-child{border-bottom:none;}
    .lms .faqq{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;text-align:left;
      background:none;border:none;cursor:pointer;padding:17px 20px;color:var(--ink);font:700 15px 'Manrope';}
    .lms .faqq:hover{color:var(--terra);}
    .lms .faqa{padding:0 20px 18px;color:var(--muted);font:500 14.5px/1.6 'Manrope';max-width:680px;}
    .lms .footer{background:linear-gradient(135deg,color-mix(in srgb,var(--terra) 14%,var(--card)),var(--card));
      border:1px solid var(--line);border-radius:22px;padding:34px;margin-top:30px;backdrop-filter:blur(8px);}
    .lms .copyright{text-align:center;color:var(--muted);font:600 12px 'JetBrains Mono';padding:24px 0 10px;}
    @media(max-width:880px){ .lms .player{grid-template-columns:1fr;} .lms .side{position:static;top:auto;} }
    @media(max-width:560px){ .lms .stats{grid-template-columns:1fr 1fr;} .lms .brand span{display:none;}
      .lms h1{font-size:32px;} .lms .navbtn span{display:none;} }
  `}</style>
);

/* ════════════════════════════  APP  ════════════════════════════════════ */
export default function MiniLMS() {
  const [dark, setDark] = useState(false);
  const [view, setView] = useState("catalog");
  const [user, setUser] = useState(null);
  const [done, setDone] = useState({});
  const [scores, setScores] = useState({});
  const [notes, setNotes] = useState({});
  const [bookmarks, setBookmarks] = useState({});
  const [last, setLast] = useState({});
  const [activeDays, setActiveDays] = useState([]);
  const [large, setLarge] = useState(false);
  const reduceMotion = typeof window !== "undefined" && window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [activeCourse, setActiveCourse] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [activePost, setActivePost] = useState(null);
  const [certCourse, setCertCourse] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const progKey = (u) => `minilms-progress-${u}-v3`;
  const apply = (d) => { setDone(d.done||{}); setScores(d.scores||{}); setNotes(d.notes||{}); setBookmarks(d.bookmarks||{}); setLast(d.last||{}); setActiveDays(d.activeDays||[]); };

  useEffect(() => { (async () => {
    try { const s = await window.storage.get(K_SESSION);
      if (s && s.value) { const u = JSON.parse(s.value); setUser(u);
        const p = await window.storage.get(progKey(u.username)); if (p && p.value) apply(JSON.parse(p.value)); }
    } catch (e) {} setLoading(false);
  })(); }, []);

  const persistAll = async (u, obj) => { if (!u) return;
    try { await window.storage.set(progKey(u.username), JSON.stringify(obj)); } catch (e) {} };
  const snapshot = (patch) => ({ done, scores, notes, bookmarks, last, activeDays, ...patch });

  const login = async (u) => { setUser(u);
    try { await window.storage.set(K_SESSION, JSON.stringify(u)); } catch (e) {}
    try { const p = await window.storage.get(progKey(u.username));
      if (p && p.value) apply(JSON.parse(p.value)); else apply({}); } catch (e) { apply({}); }
    setView("catalog");
  };
  const logout = async () => { setUser(null); apply({});
    try { await window.storage.delete(K_SESSION); } catch (e) {} setView("catalog"); };

  const markDone = (id) => { if (!user) { setView("auth"); return; }
    const nd = { ...done, [id]: true };
    const da = activeDays.includes(todayKey()) ? activeDays : [...activeDays, todayKey()];
    setDone(nd); setActiveDays(da); persistAll(user, snapshot({ done: nd, activeDays: da })); };
  const saveScore = (id, got, total) => {
    const ns = { ...scores, [id]: { got, total } };
    const nd = got === total ? { ...done, [id]: true } : done;
    setScores(ns); if (got === total) setDone(nd); persistAll(user, snapshot({ scores: ns, done: nd })); };
  const saveNote = (id, text) => { if (!user) return;
    const nn = { ...notes, [id]: text }; setNotes(nn); persistAll(user, snapshot({ notes: nn })); };
  const toggleBookmark = (id) => { if (!user) { setView("auth"); return; }
    const nb = { ...bookmarks }; if (nb[id]) delete nb[id]; else nb[id] = true;
    setBookmarks(nb); persistAll(user, snapshot({ bookmarks: nb })); };
  const recordLast = (cid, lid) => { if (!user) return;
    if (last[cid] === lid) return; const nl = { ...last, [cid]: lid }; setLast(nl); persistAll(user, snapshot({ last: nl })); };

  const baseLessons = (c) => c.sections.flatMap((s) => s.lessons);
  const courseProgress = (c) => { const ids = baseLessons(c).map((l) => l.id);
    const d = ids.filter((id) => done[id]).length; return { d, t: ids.length, pct: Math.round((d / ids.length) * 100) }; };
  const isCertified = (c) => { const ls = baseLessons(c);
    return ls.every((l) => done[l.id]) && ls.filter((l) => l.type === "quiz").every((l) => scores[l.id] && scores[l.id].got === scores[l.id].total); };
  const overall = useMemo(() => { const all = COURSES.flatMap(baseLessons).map((l) => l.id);
    return { d: all.filter((id) => done[id]).length, t: all.length, certs: COURSES.filter(isCertified).length }; }, [done, scores]);

  const filtered = COURSES.filter((c) => (c.title + c.blurb + c.tag).toLowerCase().includes(query.toLowerCase()));

  const game = useMemo(() => { const xp = overall.d * 100; const level = Math.floor(xp / 500) + 1;
    return { xp, level, inLevel: xp % 500, streak: calcStreak(activeDays) }; }, [overall.d, activeDays]);

  const exportNotes = () => {
    const lines = [];
    COURSES.forEach((c) => c.sections.forEach((s) => s.lessons.forEach((l) => {
      if (notes[l.id]) lines.push(`## ${c.title} — ${l.title}\n${notes[l.id]}\n`); })));
    const txt = lines.length ? lines.join("\n") : "저장된 메모가 없습니다.";
    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = "내_학습메모.txt"; a.click(); URL.revokeObjectURL(url);
  };
  const go = (v) => { setView(v); window.scrollTo(0, 0); };
  const openCourse = (c, lid = null) => { setActiveCourse(c); setResumeId(lid); go("course"); };

  // 가장 최근 학습한 강좌 (이어보기)
  const recent = useMemo(() => {
    const ids = Object.keys(last); if (!ids.length) return null;
    const cid = ids[ids.length - 1]; const c = COURSES.find((x) => x.id === cid); if (!c) return null;
    return { course: c, lessonId: last[cid] };
  }, [last]);

  // 북마크한 레슨 목록
  const bmLessons = useMemo(() => {
    const out = [];
    COURSES.forEach((c) => c.sections.forEach((s) => s.lessons.forEach((l) => { if (bookmarks[l.id]) out.push({ c, l }); })));
    return out;
  }, [bookmarks]);

  if (loading)
    return <div className={`lms${dark ? " dark" : ""}`}><Styles />
      <div className="center"><Loader2 size={28} style={{ animation: "spin 1s linear infinite" }} />불러오는 중…</div></div>;

  const wide = view === "course";

  return (
    <div className={`lms${dark ? " dark" : ""}${large ? " large" : ""}`}>
      <Styles /><ThreeBackground dark={dark} reduceMotion={reduceMotion} /><CursorGlow reduceMotion={reduceMotion} />
      <div className="content">
        <nav className="nav"><div className="nav-in">
          <div className="brand"><span className="dot"><GraduationCap size={16}/></span> <span>NODE · 러닝</span></div>
          <div className="navlinks">
            <button className={`navbtn ${["catalog","course"].includes(view)?"on":""}`} onClick={()=>go("catalog")}><Layers size={15}/><span>강좌</span></button>
            <button className={`navbtn ${view==="dashboard"?"on":""}`} onClick={()=>go("dashboard")}><LayoutDashboard size={15}/><span>대시보드</span></button>
            <button className={`navbtn ${["board","post","newpost"].includes(view)?"on":""}`} onClick={()=>go("board")}><MessageSquare size={15}/><span>게시판</span></button>
            <button className={`navbtn ${view==="about"?"on":""}`} onClick={()=>go("about")}><User size={15}/><span>소개</span></button>
            <button className="iconbtn" onClick={()=>setLarge(v=>!v)} title="글씨 크기" style={large?{borderColor:"var(--terra)",color:"var(--terra)"}:{}}><Type size={16}/></button>
            <button className="iconbtn" onClick={()=>setDark(d=>!d)}>{dark?<Sun size={16}/>:<Moon size={16}/>}</button>
            {user ? <button className="iconbtn" onClick={logout}><LogOut size={16}/></button>
              : <button className="navbtn on" onClick={()=>go("auth")}><LogIn size={15}/><span>로그인</span></button>}
          </div>
        </div></nav>

        <div className={`wrap${wide ? " wide" : ""}`}>
          {view === "catalog" && (
            <>
              <header className="hero">
                <div className="eyebrow">Instructional Design · Learning Platform</div>
                <h1 className="serif">설계가 곧<br/>학습 경험이다</h1>
                <p className="lead">{user ? `${user.name}님, 다시 오셨네요. ` : ""}교수설계자 송강건의 포트폴리오 LMS. 영상·읽기·퀴즈로 구성된 강좌를 수강하고, 메모·북마크·진도가 계정에 저장됩니다.</p>
                <div className="stats">
                  <div className="stat"><b className="serif">{COURSES.length}</b><span>강좌</span></div>
                  <div className="stat"><b className="serif">{overall.d}/{overall.t}</b><span>완료 레슨</span></div>
                  <div className="stat"><b className="serif">{overall.certs}</b><span>수료 배지</span></div>
                </div>
                {recent && (
                  <button className="resume" onClick={()=>openCourse(recent.course, recent.lessonId)}>
                    <PlayCircle size={26} color="var(--terra)"/>
                    <div><div style={{font:"700 14px Manrope"}}>이어서 학습하기</div>
                      <div style={{fontSize:13,color:"var(--muted)"}}>{recent.course.title}</div></div>
                    <ArrowRight size={18} color="var(--terra)" style={{marginLeft:"auto"}}/>
                  </button>
                )}
              </header>
              <div className="toolbar"><div className="searchbox"><Search size={16} color="var(--muted)"/>
                <input placeholder="강좌 검색…" value={query} onChange={(e)=>setQuery(e.target.value)} /></div></div>
              <div className="grid">
                {filtered.map((c,i)=>{ const p=courseProgress(c);
                  return (<Reveal key={c.id} delay={i*70}><button className="ccard" onClick={()=>openCourse(c, last[c.id]||null)}>
                    {isCertified(c) && <Trophy size={20} className="badge"/>}
                    <span className="pill">{c.tag}</span>
                    <div className="ctitle serif">{c.title}</div>
                    <div className="cblurb">{c.blurb}</div>
                    <div className="meta"><span><BookOpen size={14}/> {baseLessons(c).length}개</span><span><Award size={14}/> {c.hours}</span>
                      {last[c.id] && <span style={{color:"var(--terra)"}}><PlayCircle size={14}/> 이어보기</span>}</div>
                    <div className="bar"><i style={{width:`${p.pct}%`}}/></div>
                  </button></Reveal>);})}
                {filtered.length===0 && <p className="lead">검색 결과가 없습니다.</p>}
              </div>
              <Testimonials />
              <LandingExtras onAbout={()=>go("about")} onBoard={()=>go("board")} />
            </>
          )}

          {view === "dashboard" && (
            <>
              <header className="hero"><div className="eyebrow">Dashboard · Learning Analytics</div>
                <h1 className="serif">나의 학습 현황</h1>
                {!user && <p className="lead">로그인하면 진도·메모·북마크가 계정에 저장됩니다.</p>}</header>

              <div className="gamify">
                <div className="lvl"><div className="lvlbadge">Lv{game.level}</div>
                  <div><div style={{font:"700 14px Manrope"}}>{game.xp} XP</div>
                    <div className="bar" style={{width:120,marginTop:6}}><i style={{width:`${(game.inLevel/500)*100}%`}}/></div>
                    <div className="dur" style={{marginTop:4}}>다음 레벨까지 {500-game.inLevel} XP</div></div></div>
                <div style={{textAlign:"center"}} className="dur">레슨 1개 완료 = 100 XP</div>
                <div className="streak"><Flame size={18}/> {game.streak}일 연속 학습</div>
              </div>

              <div className="stats" style={{marginTop:14}}>
                <div className="stat"><b className="serif">{Math.round(overall.d/overall.t*100)||0}%</b><span>전체 진도</span></div>
                <div className="stat"><b className="serif">{overall.d}</b><span>완료 레슨</span></div>
                <div className="stat"><b className="serif">{overall.certs}</b><span>수료</span></div></div>

              <Charts dark={dark} overall={overall} courses={COURSES} progressFn={courseProgress} />

              <div className="secttl">강좌별 진행</div>
              {COURSES.map((c)=>{ const p=courseProgress(c);
                return (<button key={c.id} className="litem" style={{borderRadius:14,border:"1px solid var(--line)",marginBottom:8,background:"var(--card)"}}
                  onClick={()=>openCourse(c, last[c.id]||null)}>
                  {isCertified(c)?<Trophy size={18} color="var(--green)" className="ico"/>:<BookOpen size={18} className="ico"/>}
                  <div className="nm" style={{whiteSpace:"normal"}}>{c.title}
                    <div className="bar" style={{marginTop:8}}><i style={{width:`${p.pct}%`}}/></div></div>
                  <span className="dur">{p.pct}%</span></button>);})}

              <div className="secttl">내 메모</div>
              <button className="btn ghost sm" onClick={exportNotes}><Download size={15}/> 메모 .txt로 내보내기</button>

              {bmLessons.length>0 && (<>
                <div className="secttl">북마크한 레슨</div>
                {bmLessons.map(({c,l})=>(
                  <button key={l.id} className="litem" style={{borderRadius:14,border:"1px solid var(--line)",marginBottom:8,background:"var(--card)"}}
                    onClick={()=>openCourse(c, l.id)}>
                    <Bookmark size={16} color="var(--terra)" className="ico"/>
                    <span className="nm">{l.title}</span><span className="dur">{c.tag}</span></button>
                ))}
              </>)}
              <div style={{height:50}}/>
            </>
          )}

          {view === "course" && activeCourse && (
            <Player course={activeCourse} user={user} done={done} scores={scores} notes={notes} bookmarks={bookmarks}
              certified={isCertified(activeCourse)} progress={courseProgress(activeCourse)} resumeId={resumeId}
              onMarkDone={markDone} onSaveScore={saveScore} onSaveNote={saveNote} onToggleBookmark={toggleBookmark}
              onRecordLast={recordLast} onShowCert={()=>setCertCourse(activeCourse)} onBack={()=>go("catalog")} />
          )}

          {view === "auth" && <Auth onLogin={login} />}
          {view === "board" && <Board onOpen={(p)=>{setActivePost(p);go("post");}} onNew={()=>user?go("newpost"):go("auth")} />}
          {view === "newpost" && <NewPost user={user} onDone={()=>go("board")} onBack={()=>go("board")} />}
          {view === "post" && activePost && <PostView post={activePost} user={user} onBack={()=>go("board")} />}

          {view === "about" && (
            <div>
              <header className="hero" style={{borderBottom:"none",paddingBottom:8}}>
                <div className="eyebrow">About</div><h1 className="serif">송강건 · 교수설계자</h1></header>
              <p className="lead" style={{maxWidth:600}}>학습자가 '아는 것'을 넘어 '할 수 있는 것'에 도달하도록 경험을 설계합니다. 마이크로러닝, 성인학습 이론, 인터랙티브 e러닝을 중심으로 기업·공공 교육 프로젝트를 진행해 왔습니다.</p>
              <div className="secttl">전문 영역</div>
              <div className="skills">{["ADDIE / SAM","마이크로러닝","성인학습 이론","Articulate Storyline","학습 분석","UX Writing","평가 설계"].map(s=><span className="skill" key={s}>{s}</span>)}</div>
              <div className="secttl">연락처</div>
              <div className="contact"><Mail size={18}/> 148joab@naver.com</div>
              <div style={{height:50}}/>
            </div>
          )}
        </div>
      </div>

      {certCourse && <Certificate user={user} course={certCourse} onClose={()=>setCertCourse(null)} />}
    </div>
  );
}

/* ════════════════════════════  LESSON BODY  ════════════════════════════ */
function Testimonials() {
  return (
    <section style={{ padding: "20px 0 64px" }}>
      <div className="secttl" style={{ paddingTop: 30 }}>수강생 후기</div>
      <h2 className="serif" style={{ fontSize: 30, margin: "2px 0 4px", letterSpacing: "-.02em" }}>현장에서 바로 쓰였습니다</h2>
      <p className="lead" style={{ marginTop: 4, marginBottom: 22 }}>실제 학습자·교육 담당자들이 남긴 후기입니다. (포트폴리오용 예시)</p>
      <div className="tgrid">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={i} delay={(i % 3) * 80}><figure className="tcard">
            <span className="stars">{[1,2,3,4,5].map((n)=>(
              <span key={n} className={`star ro ${n<=t.stars?"fill":""}`}><Star size={15} fill={n<=t.stars?"currentColor":"none"}/></span>))}</span>
            <blockquote className="tquote">“{t.text}”</blockquote>
            <figcaption className="twho">
              <span className="tav">{t.name.slice(0,1)}</span>
              <span><b>{t.name}</b><span className="trole">{t.role}</span></span>
            </figcaption>
          </figure></Reveal>
        ))}
      </div>
    </section>
  );
}

/* ════════════════════════════  LANDING EXTRAS  ═════════════════════════ */
const PRINCIPLES = [
  { icon: Target, t: "측정 가능한 목표", d: "모든 강좌는 ABCD로 진술된 학습목표에서 출발합니다. 평가가 목표를 그대로 검증하도록 정렬했습니다." },
  { icon: Layers, t: "단일 목표 · 낮은 인지부하", d: "한 화면 한 메시지 원칙으로 외재적 부하를 줄이고 핵심에 집중하도록 구성했습니다." },
  { icon: Zap, t: "동기와 참여 설계", d: "ARCS·게이미피케이션·이어보기로 자기주도학습을 UX로 옮겼습니다." },
  { icon: LayoutDashboard, t: "측정과 개선", d: "진도·퀴즈·분석 차트로 학습 효과를 추적하고 데이터로 개선합니다." },
];
const FAQS = [
  ["진도는 어떻게 저장되나요?", "로그인 또는 게스트 계정별로 진도·메모·북마크가 브라우저에 영구 저장됩니다. 다시 방문해도 이어서 학습할 수 있습니다."],
  ["내 강의 영상을 올릴 수 있나요?", "로그인 후 강의실 사이드바에서 YouTube·Vimeo·mp4 링크를 추가하면 커리큘럼에 바로 반영됩니다."],
  ["수료증을 받을 수 있나요?", "모든 레슨을 완료하고 평가 퀴즈를 만점으로 통과하면 수료증을 인쇄하거나 PDF로 저장할 수 있습니다."],
  ["접근성도 고려했나요?", "큰 글씨 모드를 제공하고, 시스템의 '모션 줄이기' 설정을 자동으로 존중합니다. 키보드 ←/→로 레슨 이동도 가능합니다."],
];
function LandingExtras({ onAbout, onBoard }) {
  const [open, setOpen] = useState(0);
  return (<>
    <Reveal tag="section" style={{ padding: "10px 0 8px" }}>
      <div className="secttl">설계 원칙</div>
      <h2 className="serif" style={{ fontSize: 30, margin: "2px 0 18px", letterSpacing: "-.02em" }}>학습 이론을 제품 원칙으로</h2>
      <div className="featgrid">
        {PRINCIPLES.map((p, i) => { const Ic = p.icon;
          return (<Reveal key={i} delay={(i % 4) * 70}><div className="feat">
            <span className="featic"><Ic size={20}/></span>
            <b>{p.t}</b><span>{p.d}</span>
          </div></Reveal>); })}
      </div>
    </Reveal>

    <Reveal tag="section" style={{ padding: "30px 0 8px" }}>
      <div className="secttl">자주 묻는 질문</div>
      <h2 className="serif" style={{ fontSize: 30, margin: "2px 0 16px", letterSpacing: "-.02em" }}>FAQ</h2>
      <div className="faq">
        {FAQS.map(([q, a], i) => (
          <div className="faqitem" key={i}>
            <button className="faqq" onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{q}</span><Plus size={17} style={{ transform: open === i ? "rotate(45deg)" : "none", transition: ".2s", flexShrink: 0 }}/>
            </button>
            {open === i && <div className="faqa">{a}</div>}
          </div>
        ))}
      </div>
    </Reveal>

    <Reveal tag="section">
      <div className="footer">
        <div className="eyebrow">Let's work together</div>
        <h2 className="serif" style={{ fontSize: 32, margin: "10px 0 6px", letterSpacing: "-.02em" }}>함께 학습을 설계해요</h2>
        <p className="lead" style={{ marginTop: 4 }}>강좌 설계, 이러닝 제작, 교육 컨설팅 문의를 환영합니다.</p>
        <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
          <button className="btn" onClick={onAbout}><User size={15}/> 소개 보기</button>
          <button className="btn ghost" onClick={onBoard}><MessageSquare size={15}/> 게시판 둘러보기</button>
        </div>
      </div>
      <div className="copyright">© {new Date().getFullYear()} NODE · 러닝 — 교수설계 포트폴리오 · 데모 사이트</div>
    </Reveal>
  </>);
}

/* ════════════════════════════  LESSON BODY  ════════════════════════════ */
function LessonBody({ blocks }) {
  if (!blocks) return null;
  return (<div className="lessonbody">{blocks.map((b, i) => {
    if (typeof b === "string") return <p key={i}>{b}</p>;
    if (b.type === "table") return (<div className="tablewrap" key={i}><table className="ltable">
      <thead><tr>{b.headers.map((h, j) => <th key={j}>{h}</th>)}</tr></thead>
      <tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}>{c}</td>)}</tr>)}</tbody></table></div>);
    if (b.type === "svg") return (<figure className="fig" key={i}>
      <div className="figsvg" dangerouslySetInnerHTML={{ __html: b.svg }} />
      {b.caption && <figcaption>{b.caption}</figcaption>}</figure>);
    if (b.type === "img") return (<figure className="fig" key={i}>
      <img src={b.src} alt={b.caption || ""} loading="lazy" />
      {b.caption && <figcaption>{b.caption}</figcaption>}</figure>);
    return null;
  })}</div>);
}

/* ════════════════════════════  CHARTS  ═════════════════════════════════ */
function Charts({ dark, overall, courses, progressFn }) {
  const C = dark
    ? { a: "#6D7BFF", g: "#34D399", line: "#212838", muted: "#8A93A6", card: "#141826" }
    : { a: "#3D4EFF", g: "#10B981", line: "#D8DCE6", muted: "#5B6473", card: "#FFFFFF" };
  const donut = [{ name: "완료", value: overall.d }, { name: "미완료", value: Math.max(overall.t - overall.d, 0) }];
  const bars = courses.map((c) => ({ name: c.tag, pct: progressFn(c).pct }));
  return (
    <div className="charts">
      <div className="chartcard">
        <div className="ct">전체 완료율</div>
        <ResponsiveContainer width="100%" height={190}>
          <PieChart>
            <Pie data={donut} dataKey="value" innerRadius={52} outerRadius={78} paddingAngle={2} stroke="none">
              <Cell fill={C.a} /><Cell fill={C.line} />
            </Pie>
            <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 10, color: dark ? "#ECEEF5" : "#0C0F16", fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ textAlign: "center", marginTop: -118, marginBottom: 90, pointerEvents: "none" }}>
          <div style={{ font: "800 26px 'Bricolage Grotesque'", color: C.a }}>{Math.round((overall.d / overall.t) * 100) || 0}%</div>
          <div className="dur">{overall.d}/{overall.t} 레슨</div>
        </div>
      </div>
      <div className="chartcard">
        <div className="ct">강좌별 진도</div>
        <ResponsiveContainer width="100%" height={190}>
          <BarChart data={bars} margin={{ top: 8, right: 6, left: -18, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: C.muted }} axisLine={{ stroke: C.line }} tickLine={false} />
            <Tooltip cursor={{ fill: C.line, opacity: 0.4 }} contentStyle={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 10, color: dark ? "#ECEEF5" : "#0C0F16", fontSize: 12 }} formatter={(v) => [`${v}%`, "진도"]} />
            <Bar dataKey="pct" radius={[6, 6, 0, 0]} fill={C.g} maxBarSize={46} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ════════════════════════════  PLAYER  ═════════════════════════════════ */
function Player({ course, user, done, scores, notes, bookmarks, certified, progress, resumeId,
  onMarkDone, onSaveScore, onSaveNote, onToggleBookmark, onRecordLast, onShowCert, onBack }) {
  const [extras, setExtras] = useState([]);
  const [adding, setAdding] = useState(false);
  const [nt, setNt] = useState(""), [nu, setNu] = useState("");
  const exKey = `minilms-extra-${course.id}-v3`;
  useEffect(() => { (async () => {
    try { const r = await window.storage.get(exKey); if (r && r.value) setExtras(JSON.parse(r.value)); } catch (e) {} })(); }, [course.id]);

  const sections = [...course.sections];
  if (extras.length) sections.push({ id: "extra", title: "+ 추가된 영상", lessons: extras });
  const flat = sections.flatMap((s) => s.lessons);
  const [activeId, setActiveId] = useState(resumeId || course.sections[0].lessons[0].id);
  const lesson = flat.find((l) => l.id === activeId) || flat[0];
  const idx = flat.findIndex((l) => l.id === lesson.id);

  useEffect(() => { onRecordLast(course.id, lesson.id); }, [lesson.id]);
  useEffect(() => {
    const h = (e) => { const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" && idx < flat.length - 1) go(flat[idx + 1].id);
      if (e.key === "ArrowLeft" && idx > 0) go(flat[idx - 1].id); };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, [idx, flat.length]);

  const addVideo = async () => { if (!nt.trim() || !nu.trim()) return;
    const v = { id: "ex" + Date.now(), type: "video", title: nt.trim(), url: nu.trim(), duration: "" };
    const next = [...extras, v]; setExtras(next); setNt(""); setNu(""); setAdding(false);
    try { await window.storage.set(exKey, JSON.stringify(next), true); } catch (e) {} };
  const removeVideo = async (id) => { const next = extras.filter((e) => e.id !== id); setExtras(next);
    if (activeId === id) setActiveId(flat[0]?.id);
    try { await window.storage.set(exKey, JSON.stringify(next), true); } catch (e) {} };

  const typeIcon = (t) => t === "video" ? <Play size={15}/> : t === "quiz" ? <ListChecks size={15}/> : <FileText size={15}/>;
  const go = (id) => { setActiveId(id); window.scrollTo(0, 0); };

  return (<>
    <button className="back" onClick={onBack}><ChevronLeft size={16}/> 강좌 목록</button>
    <div className="chead">
      <div>
        <span className="pill">{course.tag}</span>
        <h1 className="serif" style={{ fontSize: 34 }}>{course.title}</h1>
        <p className="lead" style={{ marginTop: 8 }}>{course.instructor} · {course.hours} · {flat.length}개 레슨</p>
        <Rating course={course} user={user} />
        {COURSE_GOALS[course.id] && (
          <div className="goals">
            <div className="gt"><Target size={12} style={{verticalAlign:-1}}/> 학습 목표</div>
            <ul style={{margin:0,padding:0,listStyle:"none"}}>
              {COURSE_GOALS[course.id].map((g,i)=>(
                <li key={i}><Check size={15} color="var(--green)" style={{flexShrink:0,marginTop:2}}/> {g}</li>))}
            </ul>
          </div>
        )}
      </div>
    </div>
    {certified && <div className="cert"><Trophy size={24} color="var(--green)"/>
      <div style={{flex:1,minWidth:160}}><b className="serif" style={{fontSize:18}}>수료 완료</b>
        <div style={{fontSize:13,color:"var(--muted)"}}>모든 레슨과 퀴즈를 통과했습니다.</div></div>
      <button className="btn sm" onClick={onShowCert}><Award size={15}/> 수료증 보기</button></div>}

    <div className="player">
      <div className="stage">
        {lesson.type === "video" && (() => { const v = parseVideo(lesson.url);
          return (<>
            <div className="videobox">
              {v && v.kind === "iframe" && <iframe src={v.src} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={lesson.title}/>}
              {v && v.kind === "video" && <video src={v.src} controls playsInline preload="metadata"/>}
              {!v && <div style={{color:"#fff",display:"grid",placeItems:"center",height:"100%"}}>링크 없음</div>}
            </div>
            {lesson.url && <a href={lesson.url} target="_blank" rel="noreferrer" style={{display:"inline-block",marginTop:8,font:"600 12px JetBrains Mono",color:"var(--terra)"}}>영상이 안 보이면 새 탭에서 열기 ↗</a>}
            <div className="ltype">{typeIcon("video")} 영상 레슨</div>
            <div className="ltitle serif">{lesson.title}</div>
            {lesson.body && <LessonBody blocks={lesson.body} />}
            <LessonActions lesson={lesson} done={done} bookmarks={bookmarks} user={user} onMarkDone={onMarkDone} onToggleBookmark={onToggleBookmark} />
            <Notes value={notes[lesson.id]||""} disabled={!user} onSave={(t)=>onSaveNote(lesson.id,t)} />
          </>);
        })()}

        {lesson.type === "text" && (<>
          <div className="ltype">{typeIcon("text")} 읽기 레슨</div>
          <div className="ltitle serif">{lesson.title}</div>
          <LessonBody blocks={lesson.body} />
          <LessonActions lesson={lesson} done={done} bookmarks={bookmarks} user={user} onMarkDone={onMarkDone} onToggleBookmark={onToggleBookmark} />
          <Notes value={notes[lesson.id]||""} disabled={!user} onSave={(t)=>onSaveNote(lesson.id,t)} />
        </>)}

        {lesson.type === "quiz" && (
          <QuizLesson key={lesson.id} lesson={lesson} prev={scores[lesson.id]} onSubmit={(g,t)=>onSaveScore(lesson.id,g,t)} />
        )}

        <div className="navrow">
          <button className="btn ghost" disabled={idx<=0} onClick={()=>idx>0&&go(flat[idx-1].id)}><ChevronLeft size={16}/> 이전</button>
          <span className="dur" style={{alignSelf:"center"}}>← / → 키로 이동</span>
          <button className="btn" disabled={idx>=flat.length-1} onClick={()=>idx<flat.length-1&&go(flat[idx+1].id)}>다음 <ChevronRight size={16}/></button>
        </div>
      </div>

      <aside className="side">
        <div className="sidehead">
          <div className="t">커리큘럼</div>
          <div className="bar"><i style={{width:`${progress.pct}%`}}/></div>
          <div className="dur" style={{marginTop:6}}>{progress.d}/{progress.t} 완료 · {progress.pct}%</div>
        </div>
        {sections.map((s)=>(
          <div className="sect" key={s.id}>
            <div className="secthead">{s.title}</div>
            {s.lessons.map((l)=>(
              <button key={l.id} className={`litem ${l.id===lesson.id?"active":""}`} onClick={()=>go(l.id)}>
                {done[l.id] ? <CheckCircle2 size={15} color="var(--green)" className="ico"/> : <span className="ico">{typeIcon(l.type)}</span>}
                <span className="nm">{l.title}</span>
                {bookmarks[l.id] && <Bookmark size={13} color="var(--terra)"/>}
                {l.duration ? <span className="dur">{l.duration}</span> : null}
                {s.id==="extra" && <span onClick={(e)=>{e.stopPropagation();removeVideo(l.id);}} style={{display:"inline-flex",color:"var(--muted)"}}><X size={13}/></span>}
              </button>
            ))}
          </div>
        ))}
        {user ? (
          <div className="addbox">
            {!adding
              ? <button className="btn ghost sm" style={{width:"100%",justifyContent:"center"}} onClick={()=>setAdding(true)}><PlusCircle size={15}/> 영상 링크 추가</button>
              : (<><input placeholder="레슨 제목" value={nt} onChange={(e)=>setNt(e.target.value)} />
                  <input placeholder="YouTube / Vimeo / mp4 링크" value={nu} onChange={(e)=>setNu(e.target.value)} />
                  <div style={{display:"flex",gap:8}}>
                    <button className="btn sm" style={{flex:1,justifyContent:"center"}} onClick={addVideo}><Plus size={14}/> 추가</button>
                    <button className="btn ghost sm" onClick={()=>setAdding(false)}>취소</button></div></>)}
          </div>
        ) : <div className="addbox"><div className="dur"><Lock size={12} style={{verticalAlign:-1}}/> 영상 추가·메모·진도 저장은 로그인 필요</div></div>}
      </aside>
    </div>
  </>);
}

function LessonActions({ lesson, done, bookmarks, user, onMarkDone, onToggleBookmark }) {
  return (<div className="actions">
    <button className={done[lesson.id]?"btn ghost":"btn"} onClick={()=>onMarkDone(lesson.id)}>
      {done[lesson.id]?<><CheckCircle2 size={16}/> 완료됨</>:<><Circle size={16}/> 학습 완료</>}</button>
    <button className="btn ghost" onClick={()=>onToggleBookmark(lesson.id)}>
      <Bookmark size={16} fill={bookmarks[lesson.id]?"currentColor":"none"}/> {bookmarks[lesson.id]?"북마크됨":"북마크"}</button>
    {!user && <span className="dur"><Lock size={12} style={{verticalAlign:-1}}/> 로그인 시 저장</span>}
  </div>);
}

function Notes({ value, onSave, disabled }) {
  const [t, setT] = useState(value);
  const timer = useRef(null);
  useEffect(() => { setT(value); }, [value]);
  const change = (e) => { const v = e.target.value; setT(v);
    clearTimeout(timer.current); timer.current = setTimeout(() => onSave(v), 600); };
  return (<div className="notes">
    <div className="noteshd"><NotebookPen size={15}/> 내 메모</div>
    <textarea className="notesarea" value={t} disabled={disabled} onChange={change} onBlur={()=>!disabled&&onSave(t)}
      placeholder={disabled?"로그인하면 메모를 저장할 수 있습니다":"이 레슨에 대한 메모를 남겨보세요 · 자동 저장"}/>
  </div>);
}

/* 별점 후기 (공개) */
function Rating({ course, user }) {
  const key = `minilms-rating-${course.id}-v3`;
  const [list, setList] = useState([]);
  useEffect(() => { (async () => {
    try { const r = await window.storage.get(key, true); if (r && r.value) setList(JSON.parse(r.value)); } catch (e) {} })(); }, [course.id]);
  const avg = list.length ? (list.reduce((a, b) => a + b.stars, 0) / list.length) : 0;
  const mine = user ? list.find((x) => x.user === user.username)?.stars : 0;
  const rate = async (n) => { if (!user) return;
    const next = list.filter((x) => x.user !== user.username).concat({ user: user.username, stars: n });
    setList(next); try { await window.storage.set(key, JSON.stringify(next), true); } catch (e) {} };
  return (<div className="ratings">
    <span className="stars">{[1,2,3,4,5].map((n)=>(
      <button key={n} className={`star ${(mine?n<=mine:n<=Math.round(avg))?"fill":""} ${user?"":"ro"}`}
        onClick={()=>rate(n)} title={user?`${n}점`:"로그인 후 평가"}>
        <Star size={17} fill={(mine?n<=mine:n<=Math.round(avg))?"currentColor":"none"}/></button>))}</span>
    <span className="ratenum">{avg?avg.toFixed(1):"–"} · 후기 {list.length}</span>
  </div>);
}

/* 퀴즈 (정답 리뷰 포함) */
function QuizLesson({ lesson, onSubmit, prev }) {
  const [picks, setPicks] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const q = lesson.quiz;
  const got = q.filter((x, i) => picks[i] === x.correct).length;
  if (submitted)
    return (<>
      <div style={{textAlign:"center",padding:"24px 0 8px"}}>
        <div className="ltype" style={{justifyContent:"center"}}><ListChecks size={15}/> 평가 결과</div>
        <div className="scorenum serif">{got}/{q.length}</div>
        <p className="lead" style={{margin:"4px auto 0"}}>{got===q.length?"완벽합니다. 이 레슨이 완료 처리됩니다.":"오답을 확인하고 다시 풀어 보세요. 만점 시 완료됩니다."}</p>
        <button className="btn ghost" style={{marginTop:16}} onClick={()=>{setPicks({});setSubmitted(false);}}><RotateCcw size={15}/> 다시 풀기</button>
      </div>
      {q.map((x,i)=>(<div key={i}><div className="qnum">문항 {i+1}</div><div className="qtext serif">{x.q}</div>
        {x.a.map((opt,j)=>{ const right=j===x.correct, chosen=picks[i]===j;
          return (<div key={j} className={`qopt ${right?"right":chosen?"wrong":""}`}>
            <span className="mono" style={{fontWeight:700,color:"var(--muted)"}}>{String.fromCharCode(65+j)}</span> {opt}
            {right && <span className="mk"><Check size={16} color="var(--green)"/></span>}
            {!right && chosen && <span className="mk"><X size={16} color="#E0556B"/></span>}</div>);})}
      </div>))}
    </>);
  return (<>
    <div className="ltype"><ListChecks size={15}/> 퀴즈 · {lesson.title}</div>
    <div className="ltitle serif">{lesson.title}</div>
    {prev && <p className="lead">이전 점수 {prev.got}/{prev.total}</p>}
    {q.map((x,i)=>(<div key={i}><div className="qnum">문항 {i+1}</div><div className="qtext serif">{x.q}</div>
      {x.a.map((opt,j)=>(<button key={j} className={`qopt ${picks[i]===j?"sel":""}`} onClick={()=>setPicks({...picks,[i]:j})}>
        <span className="mono" style={{fontWeight:700,color:"var(--muted)"}}>{String.fromCharCode(65+j)}</span> {opt}</button>))}</div>))}
    <button className="btn" style={{marginTop:8}} disabled={Object.keys(picks).length<q.length}
      onClick={()=>{onSubmit(got,q.length);setSubmitted(true);window.scrollTo(0,0);}}>제출 <ArrowRight size={16}/></button>
  </>);
}

/* 수료증 모달 */
function Certificate({ user, course, onClose }) {
  const name = user ? user.name : "학습자";
  const date = new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
  return (<div className="overlay" onClick={onClose}>
    <div className="certsheet" onClick={(e)=>e.stopPropagation()}>
      <button className="closex" onClick={onClose}><X size={20}/></button>
      <div className="certframe">
        <div className="k">Certificate of Completion</div>
        <div style={{margin:"18px 0",color:"var(--muted)",fontSize:14}}>이 수료증은 아래 학습자가 과정을 모두 이수했음을 증명합니다</div>
        <div className="nm serif">{name}</div>
        <div className="cs">{course.title}</div>
        <div style={{marginTop:22,display:"flex",justifyContent:"center",alignItems:"center",gap:8,color:"var(--terra)"}}>
          <Trophy size={20}/><span className="mono" style={{fontSize:12,letterSpacing:".1em"}}>NODE · 러닝 · {date}</span></div>
      </div>
      <div style={{display:"flex",gap:10,marginTop:18,justifyContent:"center"}}>
        <button className="btn" onClick={()=>window.print()}><Printer size={15}/> 인쇄 / PDF 저장</button>
        <button className="btn ghost" onClick={onClose}>닫기</button>
      </div>
    </div>
  </div>);
}

/* ════════════════════════════  AUTH  ════════════════════════════════════ */
function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [f, setF] = useState({ username: "", name: "", pass: "" });
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async () => { setErr("");
    if (!f.username || !f.pass) return setErr("아이디와 비밀번호를 입력하세요.");
    let users = {}; try { const r = await window.storage.get(K_USERS); if (r&&r.value) users = JSON.parse(r.value); } catch (e) {}
    if (mode === "signup") {
      if (!f.name) return setErr("이름을 입력하세요.");
      if (users[f.username]) return setErr("이미 존재하는 아이디입니다.");
      users[f.username] = { name: f.name, pass: enc(f.pass), createdAt: Date.now() };
      try { await window.storage.set(K_USERS, JSON.stringify(users), true); } catch (e) { return setErr("저장 실패"); }
      onLogin({ username: f.username, name: f.name });
    } else { const u = users[f.username];
      if (!u || u.pass !== enc(f.pass)) return setErr("아이디 또는 비밀번호가 올바르지 않습니다.");
      onLogin({ username: f.username, name: u.name }); }
  };
  return (<div className="panel">
    <h1 className="serif" style={{fontSize:30,marginTop:0}}>{mode==="login"?"로그인":"회원가입"}</h1>
    <p style={{color:"var(--muted)",fontSize:13,marginTop:6}}>데모용입니다 · 실제 비밀번호를 사용하지 마세요.</p>
    <div style={{marginTop:20}}>
      <label className="field"><span>아이디</span><input value={f.username} onChange={set("username")} autoComplete="off"/></label>
      {mode==="signup" && <label className="field"><span>이름</span><input value={f.name} onChange={set("name")}/></label>}
      <label className="field"><span>비밀번호</span><input type="password" value={f.pass} onChange={set("pass")} onKeyDown={(e)=>e.key==="Enter"&&submit()}/></label>
      {err && <div className="err">{err}</div>}
      <button className="btn" style={{width:"100%",justifyContent:"center",marginTop:8}} onClick={submit}>
        {mode==="login"?<><LogIn size={16}/> 로그인</>:<><Plus size={16}/> 가입하기</>}</button>
      <button className="btn ghost" style={{width:"100%",justifyContent:"center",marginTop:10}}
        onClick={()=>onLogin({ username: "guest", name: "게스트" })}><User size={16}/> 게스트로 둘러보기</button>
      <div style={{textAlign:"center",marginTop:16}}>
        {mode==="login"
          ?<span style={{fontSize:13,color:"var(--muted)"}}>계정이 없나요? <button className="switch" onClick={()=>{setMode("signup");setErr("");}}>회원가입</button></span>
          :<span style={{fontSize:13,color:"var(--muted)"}}>이미 계정이 있나요? <button className="switch" onClick={()=>{setMode("login");setErr("");}}>로그인</button></span>}
      </div>
    </div>
  </div>);
}

/* ════════════════════════════  BOARD  ═══════════════════════════════════ */
function Board({ onOpen, onNew }) {
  const [posts, setPosts] = useState(null);
  useEffect(() => { (async () => {
    let stored = [];
    try { const r = await window.storage.get(K_BOARD); if (r && r.value) stored = JSON.parse(r.value); } catch (e) {}
    const merged = [...stored, ...SEED_POSTS.filter((s) => !stored.find((p) => p.id === s.id))]
      .sort((a, b) => b.ts - a.ts);
    setPosts(merged);
  })(); }, []);
  return (<>
    <header className="hero" style={{paddingBottom:18}}>
      <div className="eyebrow">Community</div><h1 className="serif">학습 게시판</h1>
      <p className="lead">강좌 후기·질문·인사이트를 나누는 공간입니다. (다른 사용자에게도 공개)</p></header>
    <div className="toolbar"><div style={{flex:1}}/><button className="btn" onClick={onNew}><Plus size={16}/> 글쓰기</button></div>
    <div style={{paddingTop:14}}>
      {posts===null && <div className="center"><Loader2 size={22} style={{animation:"spin 1s linear infinite"}}/></div>}
      {posts && posts.length===0 && <p className="lead">아직 글이 없습니다. 첫 글을 남겨보세요.</p>}
      {posts && posts.map((p)=>(<div className="post" key={p.id} onClick={()=>onOpen(p)}>
        <h3 className="serif">{p.title}</h3>
        <div className="postmeta"><span>{p.authorName}</span><span>·</span><span>{new Date(p.ts).toLocaleDateString()}</span><span>·</span><span>댓글 {p.comments?.length||0}</span></div>
      </div>))}
    </div><div style={{height:50}}/>
  </>);
}
function NewPost({ user, onDone, onBack }) {
  const [title, setTitle] = useState(""), [body, setBody] = useState(""), [busy, setBusy] = useState(false);
  const save = async () => { if (!title.trim() || !body.trim()) return; setBusy(true);
    let posts = []; try { const r = await window.storage.get(K_BOARD); if (r&&r.value) posts = JSON.parse(r.value); } catch (e) {}
    const post = { id: "p"+Date.now(), title: title.trim(), body: body.trim(), author: user.username, authorName: user.name, ts: Date.now(), comments: [] };
    try { await window.storage.set(K_BOARD, JSON.stringify([post, ...posts]), true); } catch (e) {}
    setBusy(false); onDone(); };
  return (<>
    <button className="back" onClick={onBack}><ChevronLeft size={16}/> 게시판</button>
    <h1 className="serif" style={{fontSize:32}}>새 글 작성</h1>
    <div style={{maxWidth:600,marginTop:10}}>
      <label className="field"><span>제목</span><input value={title} onChange={(e)=>setTitle(e.target.value)}/></label>
      <label className="field"><span>내용</span><textarea rows={7} value={body} onChange={(e)=>setBody(e.target.value)}/></label>
      <button className="btn" disabled={busy||!title.trim()||!body.trim()} onClick={save}><Send size={15}/> 게시하기</button>
    </div><div style={{height:50}}/></>);
}
function PostView({ post, user, onBack }) {
  const [comments, setComments] = useState(post.comments || []);
  const [text, setText] = useState("");
  const persist = async (next) => { try { const r = await window.storage.get(K_BOARD); let posts = r&&r.value?JSON.parse(r.value):[];
    if (posts.find((p)=>p.id===post.id)) posts = posts.map((p)=>p.id===post.id?{...p,comments:next}:p);
    else posts = [{ ...post, comments: next }, ...posts];
    await window.storage.set(K_BOARD, JSON.stringify(posts), true); } catch (e) {} };
  const add = async () => { if (!user || !text.trim()) return;
    const next = [...comments, { author: user.name, text: text.trim(), ts: Date.now() }]; setComments(next); setText(""); persist(next); };
  return (<>
    <button className="back" onClick={onBack}><ChevronLeft size={16}/> 게시판</button>
    <h1 className="serif" style={{fontSize:32}}>{post.title}</h1>
    <div className="postmeta" style={{marginTop:8}}><span>{post.authorName}</span><span>·</span><span>{new Date(post.ts).toLocaleString()}</span></div>
    <div className="lessonbody" style={{maxWidth:640,marginTop:18}}><p style={{whiteSpace:"pre-wrap"}}>{post.body}</p></div>
    <div className="secttl">댓글 {comments.length}</div>
    {comments.map((c,i)=>(<div className="post" key={i} style={{cursor:"default"}}>
      <div style={{fontWeight:700,fontSize:14}}>{c.author}</div><div style={{fontSize:15,marginTop:4}}>{c.text}</div></div>))}
    {user
      ? <div style={{display:"flex",gap:10,marginTop:14}}>
          <input className="field" style={{flex:1,marginBottom:0}} value={text} onChange={(e)=>setText(e.target.value)} placeholder="댓글을 입력하세요" onKeyDown={(e)=>e.key==="Enter"&&add()}/>
          <button className="btn" onClick={add}><Send size={15}/></button></div>
      : <p className="err"><Lock size={12} style={{verticalAlign:-1}}/> 댓글은 로그인 후 작성할 수 있습니다.</p>}
    <div style={{height:50}}/></>);
}

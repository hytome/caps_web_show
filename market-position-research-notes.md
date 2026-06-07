# Runner's High 시장 포지션 표/결론 노트

## 1. 발표용 경쟁 포지셔닝 표

| 서비스 | 초보 접근성 | 개인 맞춤 훈련 | Wear/워치 경험 | 핵심 강점 | Runner's High 관점의 기회 |
|---|---:|---:|---:|---|---|
| Garmin Coach | 중간 | 강함 | 호환 Garmin 워치 필요 | 목표 기반 적응형 훈련 플랜, 워치 전송, Garmin 생태계 | 전문성이 강한 만큼 입문자에게는 워치 구매와 지표/기기/앱 구조가 부담이 될 수 있음 |
| Strava / Runna | 낮음 | 강함, 접근 제한 | 한국어 코칭 한계 | Strava는 커뮤니티와 기록, Runna는 개인화 코칭과 오디오 코칭이 강함 | 한국은 Strava 제한 국가에 포함되어 신규 다운로드/동기화/구독 접근성이 낮고, 우회 설치해도 한국어 앱/오디오 코칭 경험을 기대하기 어려움 |
| Nike Run Club | 강함 | 중간 | Wear OS 지원, Guided Runs 중심 | 무료 훈련 플랜, 약 300개 오디오 가이드 런, 초보 친화 톤 | 콘텐츠 기반 코칭은 좋지만 당일 생체 컨디션 기반 조절은 약함 |
| RunDay | 매우 강함 | 낮음~중간 | 앱/오디오 코칭 중심 | 1분 달리기도 어려운 초보자에게 풀보이스 코칭 제공 | 시작 장벽은 낮지만 고도화된 성과 분석/개인화 훈련 포지션은 제한적 |
| Samsung Running Coach | 강함 | 강함 | Galaxy Watch8 중심 | 러닝 레벨 분석, 개인화 플랜, 사후 피드백 | 워치 기반 개인화 코칭 수요가 이미 시장에서 검증되고 있음을 보여줌 |
| Runner's High | 강함 | 강함 | Wear OS + Health Connect | 컨디션 점수, 심박 로그, AI 코치 설명, 코스/매칭까지 폐루프 | 초보 접근성과 개인화 깊이의 중간 지점을 차지할 수 있음 |

## 2. 현재 코드 구현 근거 표

| 구현된 제품 근거 | 확인 파일/위치 | 시장 포지션에 주는 의미 |
|---|---|---|
| Wear OS 실시간 심박 수집 | `RunnersHigh/wear/src/main/java/com/example/runnershigh/wear/HeartRateForegroundService.kt` | 워치에서 BPM을 직접 측정해 폰 앱 코칭 데이터로 보낼 수 있음 |
| Wear 우선 + Health Connect 폴백 | `RunnersHigh/app/src/main/java/com/example/runnershigh/data/heartrate/AdaptiveHeartRateCoordinator.kt` | 워치가 있으면 실시간성, 없거나 끊기면 안정성을 확보하는 구조 |
| 러닝 중 5초 심박 샘플링, 1km 이벤트 기록 | `RunnersHigh/app/src/main/java/com/example/runnershigh/ui/screen/ActiveRunningScreen.kt` | 단순 평균 심박이 아니라 세션 흐름에 맞춘 분석 데이터 기반을 확보 |
| 세션 종료 시 GPS/심박/페이스/고도/케이던스 저장 | `RunnersHigh/app/src/main/java/com/example/runnershigh/ui/RunningViewModel.kt`, `RunningRepository.kt` | 러닝 결과가 다음 추천/분석의 입력으로 이어지는 폐루프 구성 |
| 컨디션 점수와 load modifier | `functions/business_logic/condition_analyzer.py`, `functions/business_logic/workout_manager.py` | 수면, RHR, HRV, 주관 피드백으로 당일 훈련 강도를 조절 |
| AI 코치 설명 계층 | `functions/business_logic/ai_coach_service.py` | AI가 훈련을 임의 생성하지 않고 계산된 플랜을 초보자가 이해할 언어로 번역 |
| 통증/부상 피드백 | `RunningFeedbackRequest.kt`, `RunningFeedbackScreen.kt` | 부상 위험을 다음 추천에 반영할 수 있는 데이터 루프의 출발점 |
| GPX 코스 저장/공유 | `RunningRepository.createRunningCourse`, `GpxManager` | 사용자가 실제 달린 코스를 지역 러닝 자산으로 축적 가능 |
| 러닝 메이트 매칭 | `RunningViewModel.createMatchingRoom`, `RunningMateMapScreen.kt` | 초보 러너의 혼자 뛰는 부담을 줄이고 지속성을 높이는 커뮤니티 장치 |

## 3. 결론 문장

Runner's High는 RunDay/NRC처럼 시작하기 쉽지만, 거기서 멈추지 않고 Wear OS 심박, Health Connect 컨디션, 러닝 기록, 통증 피드백을 연결해 당일 훈련 강도를 조절한다. Garmin처럼 개인화 훈련의 방향성을 갖되 특정 고가 러닝 워치 생태계에만 묶이지 않고, Galaxy Watch 같은 Wear 기기와 Android 헬스 데이터 기반으로 입문자가 접근 가능한 개인 코칭 경험을 만든다는 점에서 시장 포지션이 좋다.

추가 조사 기준으로는 Strava/Runna의 기능성보다 "국내 접근성"이 더 큰 약점이다. Strava 공식 지원 문서는 한국을 제한 국가 목록에 포함하고, 국내 보도도 2025년 3월 초부터 한국 Apple App Store와 Google Play에서 신규 다운로드가 불가능해졌다고 설명한다. Runna는 Strava 인수 이후 Strava 앱/웹 기반 구독과 계정 연결을 핵심 경로로 제공하므로, Strava 접근 제한은 Runna의 국내 확산에도 직접적인 장벽이 된다.

우회 설치를 가정해도 한국어 코칭 장벽이 남는다. Strava 공식 지원 언어 목록에는 한국어가 없고, Runna의 2025년 9월 언어 확장 발표도 French, German, Brazilian Portuguese, Spanish, Dutch, Italian, Japanese만 포함한다. Runna 오디오 큐는 Runna 앱 설정 언어와 동일하게 제공되고, Android에서는 휴대폰 TTS 설정을 사용한다고 설명되어 있어 한국어 앱/오디오 코칭을 공식적으로 기대하기 어렵다.

Garmin은 기능 자체는 강하지만 Garmin Coach/Training Plan 문서가 Garmin Connect 계정과 Forerunner 같은 호환 Garmin 워치 페어링을 전제로 설명한다. 따라서 "가민은 기능은 좋지만 Garmin 워치가 있어야 제대로 쓰는 서비스"라고 정리하는 것이 안전하다.

## 4. 발표용 한 줄 요약

초보자는 쉽게 시작하고, 앱은 오늘의 몸 상태를 읽고, 워치는 실시간 데이터를 보태며, AI는 계산된 플랜을 이해 가능한 코칭으로 바꾼다.

## 5. 출처

- Garmin Coach: https://support.garmin.com/en-IN/?faq=IkvWNeIoSd48GIYCjkhlo7&tab=topics
- Garmin Coach Running: https://www.garmin.com/en-GB/garmin-coach/running/
- Garmin Forerunner 55 보도자료: https://www.garmin.com/en-US/newsroom/press-release/wearables-health/garmin-2/
- Strava Training Plans: https://support.strava.com/hc/en-us/articles/216918647-Training-Plans-for-Runners
- Strava availability in certain countries: https://support.strava.com/hc/en-us/articles/16601441648013-Strava-Availability-in-Certain-Countries
- Strava supported languages: https://support.strava.com/hc/en-us/articles/216917337-Supported-Languages-on-Strava
- Strava Korea withdrawal coverage: https://www.asiae.co.kr/en/article/2025032119222191954
- Strava Wear OS: https://support.strava.com/hc/en-us/articles/216919297-Android-Wear-and-Strava
- Strava Runna 인수 발표: https://press.strava.com/id/articles/strava-to-acquire-runna-a-leading-running-training-app
- Strava App and Runna subscription: https://support.strava.com/hc/en-us/articles/45989424324365-Strava-App-and-Runna-Subscription
- Runna language expansion: https://www.runna.com/en-gb/press/runna-launches-in-seven-languages
- Runna audio cues language: https://support.runna.com/en/articles/8159780-how-to-set-up-audio-cues-in-your-runna-app
- Garmin Forerunner 55 training plan requirement: https://www8.garmin.com/manuals/webhelp/GUID-3A791586-B59F-4B37-B9C5-5A41F8C6BE0B/EN-US/GUID-A2FB338B-0E75-4149-A5EE-BA66064D2ABF.html
- Nike Run Club Training Plans: https://www.nike.com/us/help/a/nrc-plan
- Nike Run Club 신규 기능 발표: https://about.nike.com/en/newsroom/releases/nike-run-club-app-new-features
- Nike Run Club Google Play: https://play.google.com/store/apps/details?id=com.nike.plusgps
- RunDay 공식 사이트: https://www.runday.co.kr/
- RunDay Google Play: https://play.google.com/store/apps/details?hl=en-US&id=com.hanbit.rundayfree
- Samsung Galaxy Watch8 Running Coach: https://www.samsung.com/uk/support/mobile-devices/how-to-use-the-personalized-running-coach-feature-on-your-galaxy-watch-8-and-watch-8-classic/
- Samsung Global Newsroom Running Coach: https://news.samsung.com/global/user-guide-galaxy-watch8-series-running-coach-for-every-distance-from-5k-to-half-marathon
- Wearable + smartphone physical activity meta-analysis: https://pmc.ncbi.nlm.nih.gov/articles/PMC6120856/
- Just-in-time personalized feedback review: https://pubmed.ncbi.nlm.nih.gov/29567638/

## 6. 주의해서 말할 점

- 현재 앱은 Wear OS 심박 수집과 폰 앱 표시/저장 구조가 구현되어 있으나, "워치 단독으로 모든 코칭이 완결된다"보다는 "Wear OS 기반 코칭 데이터 수집과 폰 앱 연동 코칭 구조가 구현되어 있다"가 더 정확하다.
- 부상 통계는 피드백 필드 호환 처리가 일부 보완되어 있지만, 백엔드 집계 로직의 필드 정합성은 최종 고도화 과제로 언급하는 편이 안전하다.

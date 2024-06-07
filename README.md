## 무한 스크롤링 구현 방법 1

State : 페이지, 로딩상태, 데이터를 관리
Ref : Intersection 옵저버를 관리

useEffect : 페이지 State만 의존하며, 데이터 패칭 로직 관리
Intersection 옵저버 : 관찰대상이 뷰포트와 교차하면, 페이지 상태 갱신 (useEffect를 업데이트)

/FLOW 예시/

1. useEffect 최초 호출 -> 데이터 패칭 -> 데이터 업데이트 (1페이지)
2. 옵저버 감지
3. 옵저버가 페이지 State를 갱신
4. useEffect 재실행 -> 데이터 패칭 -> 데이터 업데이트 (2페이지)

## 무한 스크롤링 구현 방법 2

1번과 유사하되, useEffect를 한 개 더 사용해서 내부에 Intersection 옵저버 로직을 관리

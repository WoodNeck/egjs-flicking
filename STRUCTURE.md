# Flicking
- Facade 클래스
```html
<div class="flick-viewport">
    <div class="flick-camera">
        <!-- 이 아래 엘리먼트들이 자동적으로 사용됩니다. -->
        <div class="panel"></div>
        <div class="panel"></div>
        <div class="panel"></div>
        <div class="panel"></div>
    </div>
</div>
```

- `new Flicking(el, options)`
- Options
    - Camera element 지정
    - Panel element 지정 (class 기반)

# Renderer
- 패널 렌더링 담당
- 패널 관련 DOM 조작 담당

### BasicRenderer
- 패널 크기는 사용자가 지정한 것을 사용
- 카메라 이동과 무관하게 전체를 렌더링 함

### VisibleRenderer
- 패널 크기는 사용자가 지정한 것을 사용
- 보이는 패널만 렌더링함

### RecycleRenderer
- n 개의 엘리먼트를 돌아가며 사용, 내용물만 변경
- 패널의 크기는 고정
- 좌/우 여백 지정(previewPadding)

### GridRenderer
- 고정 크기의 패널로 한번에 n개의 패널을 표시
- 패널 크기를 강제로 변경시킴
- slidesPerView

### ExternalRenderer
- 외부 프레임워크의 렌더링 메소드를 이용한 방식
- 외부 프레임워크에서 실제 렌더러를 매핑시켜줄 필요가 있음
- ExternalFlicking.useRenderer(new GridRenderer());
  - 위 경우 GridRenderer를 external renderer에서 레퍼런스하고, 실제 렌더링 필요시 GridRenderer의 메소드를 이용하여 동작함

# Control
- Flicking의 조작방식 담당

### SnapControl
- Strict

### ScrollSnapControl
- 기존의 snap

### FreeControl
- 기존의 FreeScroll

# Animator
- 기존 Axes 역할을 대체

# Camera
- 실제 카메라 엘리먼트 관련 정보를 담당
- 이동 가능 영역 설정 가능

### BoundCamera
### CircularCamera

# 선택될 경우 클래스 추가

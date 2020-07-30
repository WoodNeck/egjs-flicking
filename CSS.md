슬라이더 + 패널 구성 방식들
- position: absolute + left/top 이용한 배치
  - position: absolute에 의해 엘리먼트의 height을 제대로 계산할 수가 없는 상황이 발생함
- float: left에 의한 구현
  - :after를 이용하여 clear:both할 시 엘리먼트의 height을 제대로 구할 수는 있으나, wrapper의 너비에 따라 패널이 일부 다음 줄로 넘어갈 수 있음
  - slick: variable size일 경우 width: 30,000px을 입력, 그 외에는 loading process를 거쳐 width를 계산하여 wrapper의 width를 설정
  - owl carousel: 마찬가지로 wrapper의 width를 설정
- display: inline-block에 의한 구현

CSS 기반 Carousel
- https://computerrock.github.io/css-carousel/
- input type="radio"와 라벨의:checked 속성을 이용하여 Dot indicator 구현
  - IE9+ (:checked)
- display: inline-block + white-space: nowrap;

그 외..
- Bootstrap의 경우 width: 100%인 엘리먼트에 대해서만 적용하며, active 엘리먼트에 display: block; 나머지는 보이지 않게 하고 애니메이션(transform 속성 변경 + transition) 도중에만 좌/우 패널에 대해 display: block; 적용

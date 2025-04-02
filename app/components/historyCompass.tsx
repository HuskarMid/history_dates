'use client'
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Bebas_Neue } from "next/font/google";
import { CompassDataList } from "./types/compassTypes";
import { Swiper as SwiperType } from 'swiper';
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

const colors = {
  main: '#42567A',
  pink: '#EF5DA8',
  blue: '#5D5FEF',
  secondBlue: '#3877EE'
}
const HorizontalLine = styled.hr<{ $isMobile?: boolean }>`
  width: ${props => props.$isMobile ? 'calc(100% - 80px)' : '100%'};
  opacity: ${props => props.$isMobile ? '0.5' : '0.15'};
  border: ${props => props.$isMobile ? '1px solid rgba(66, 86, 122, 0.5)' : '1px solid rgba(66, 86, 122, 0.5)'};
  position: absolute;
  left: ${props => props.$isMobile ? '40px' : '0'};
  top: ${props => props.$isMobile ? '55%' : '45%'};

  &:nth-child(2) {
    height: 100%;
    width: 1px;
    left: 50%;
    top: 0;
  }
`;

const Background = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  border-left: 1px solid rgba(66, 86, 122, 0.1);
  border-right: 1px solid rgba(66, 86, 122, 0.1);

  hr:nth-child(2) {
    height: 100%;
    width: 1px;
    left: 50%;
    top: 0;
  }
`;

const Circle = styled.div`
  width: 536px;
  height: 530px;
  border: 1px solid #42567A;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  opacity: 0.15;
`;

const CircleButton = styled.button`
  width: 4px;
  height: 4px;
  color: rgba(66, 86, 122, 0.0);
  border-radius: 50%;
  background: ${colors.main};
  border: 1px solid ${colors.main};
  font-size: 20px;
  font-weight: 400;
  position: absolute;
  left: 50%;
  top: 45%;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 5;

  &:hover {
    background: white;
    color: rgba(66, 86, 122, 1);
    width: 54px;
    height: 54px;
    z-index: 6;
  }

  &.active {
    background: white;
    color: rgba(66, 86, 122, 1);
    width: 54px;
    height: 54px;
    z-index: 6;
  }

  &.disabled {
    width: 4px;
    height: 4px;
    background: ${colors.main};
    border: none;
    font-size: 0;
    cursor: default;
    color: rgba(66, 86, 122, 0.0) !important;
  }
`;

const CircleControls = styled.div<{ $rotation: number }>`
  position: absolute;
  width: 530px;
  height: 530px;
  left: 50%;
  top: 45%;
  transform-origin: center center;
  transform: translate(-50%, -50%) rotate(${props => props.$rotation}deg);
  transition: transform 0.5s ease;
  z-index: 2;

  ${CircleButton} {
    position: absolute;
    left: 50%;
    top: 50%;
    transform-origin: center;
    transform: 
      translate(-50%, -50%) 
      rotate(var(--rotate))
      translateY(-267px)
      rotate(calc(-1 * var(--rotate) - ${props => props.$rotation}deg));
  }
`;

const YearContainer = styled.div<{ $isMobile?: boolean; $parentWidth: number }>`
  position: absolute;
  width: 100%;
  left: ${props => props.$isMobile ? '20px' : '0'};
  top: ${props => props.$isMobile ? '37vh' : '45%'};
  transform: ${props => props.$isMobile ? 'translateY(0)' : 'translateY(-50%)'};
  display: flex;
  justify-content: ${props => props.$isMobile ? 'start' : 'center'};
  gap: ${props => {
    if (props.$parentWidth <= 680) return '40px';
    if (props.$parentWidth <= 960) return '50px';
    if (props.$parentWidth <= 1130) return '100px';
    return '110px';
  }};
  z-index: 1;
`;

const Year = styled.h1<{ $isMobile?: boolean; $parentWidth: number }>`
  cursor: default;
  color: ${colors.pink};
  font-size: ${props => {
    if (props.$parentWidth <= 550) return '90px';
    if (props.$parentWidth <= 650) return '115px';
    if (props.$parentWidth <= 700) return '130px';
    if (props.$parentWidth <= 770) return '140px';
    if (props.$parentWidth <= 840) return '155px';
    if (props.$parentWidth <= 950) return '170px';
    return props.$isMobile ? '170px' : '190px';
  }};
  font-weight: 200;
  letter-spacing: -2%;
  font-weight: 700;

  &:first-of-type {
    color: ${colors.blue};
  }
`;

const Title = styled.div<{ $isMobile?: boolean }>`
  position: absolute;
  top: 200px;
  left: 0px;
  border-left: ${props => props.$isMobile ? 'none' : '5px solid'};
  border-image: ${props => props.$isMobile ? 'none' : 'linear-gradient(to bottom, #5D5FEF, #EF5DA8) 1'};
  padding-left: ${props => props.$isMobile ? '40px' : '80px'};
  width: 200px;

  h1 {
    color: #42567A;
    font-size: ${props => props.$isMobile ? '44px' : '56px'};
    line-height: 120%;
    font-weight: 700;
  }
`

const PageControls = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  align-items: center;
  width: ${props => props.$isMobile ? 'calc(100% - 80px)' : '200px'};
  position: absolute;
  bottom: ${props => props.$isMobile ? '6vh' : '26vh'};
  left: ${props => props.$isMobile ? '40px' : '80px'};
  gap: ${props => props.$isMobile ? '16px' : '20px'};

  display: flex;
  flex-wrap: wrap;

  p {
    width: 100%;
    color: ${colors.main};
    font-size: ${props => props.$isMobile ? '24px' : '16px'};
    font-weight: 400;
  }
`;

const Arrow = styled.div<{ direction: 'left' | 'right'; $isMobile?: boolean }>`
  width: ${props => props.$isMobile ? '12px' : '8px'};
  height: ${props => props.$isMobile ? '12px' : '8px'};
  position: relative;
  transform: ${props => {
    const rotation = props.direction === 'left' ? 'rotate(90deg)' : 'rotate(-90deg)';
    const translate = props.$isMobile ? 
      'translateY(calc(50% - 10px)) translateX(calc(50% - 13px))' : 
      'translateY(calc(50% - 7px)) translateX(calc(50% - 9px))';
    return `${rotation} ${translate}`;
  }};

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-right: 2px solid ${colors.main};
    border-bottom: 2px solid ${colors.main};
    transform: rotate(45deg);
  }
`;

const Arrow2 = styled(Arrow)`
  transform: ${props => {
    const rotation = props.direction === 'left' ? 'rotate(90deg)' : 'rotate(-90deg)';
    const translate = props.$isMobile ? 
      'translateY(calc(50% - 10px)) translateX(calc(50% - 13px))' : 
      'translateY(calc(50% - 7px)) translateX(calc(50% - 5px))';
    return `${rotation} ${translate}`;
  }};
`;

const PageButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid rgba(66, 86, 122, 0.5);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.main};
    
    ${Arrow}::before {
      border-color: white;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SliderNavigation = styled.div`
  position: absolute;
  bottom: calc(5vh + (200px/2) - 3px);
  left: 0.6vw;
  width: 100%;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 100;

  .swiper-button-prev {
    left: 14px;
  }

  .swiper-button-next {
    right: 28px;
  }
`;

const NavigationButton = styled.div`
  width: 40px;
  height: 40px;
  background: white;
  border: 1px solid ${colors.main};
  border-radius: 50%;

  cursor: pointer;
  pointer-events: auto;
  transition: all 0.3s ease;

  &::after {
    display: none;
  }

  &:hover {
    background: ${colors.main};
    
    ${Arrow}::before {
      border-color: white;
    }
  }

  &.swiper-button-disabled {
    opacity: 0;
    cursor: not-allowed;
  }
`;

const SliderContainer = styled.div<{ $isMobile?: boolean; $opacity: number }>`
  position: absolute;
  bottom: ${props => props.$isMobile ? '20vh' : '5vh'};
  left: ${props => props.$isMobile ? '40px' : '80px'};
  width: ${props => props.$isMobile ? 'calc(100% - 80px)' : 'calc(100% - 160px)'};
  opacity: ${props => props.$opacity};
  transition: opacity 0.3s ease;

  .swiper {
    width: 100%;
    padding: 0;
    height: 200px;
  }

  .swiper-slide {
    width: 400px;
    height: auto;
  }


  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background: ${colors.main};
    opacity: 0.4;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
    background: ${colors.main};
  }
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 5px;
  background: white;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.main};
    transform: translateY(-5px);
  }
`;

const Date = styled.div<{ $isMobile?: boolean }>`
  color: ${colors.secondBlue};
  font-size: ${props => props.$isMobile ? '30px' : '25px'};
  font-weight: 400;
  margin-bottom: 15px;
  font-family: ${bebasNeue.style.fontFamily};
`;

const Description = styled.div<{ $isMobile?: boolean }>`
  color: ${colors.main};
  font-size: ${props => props.$isMobile ? '23px' : '20px'};
  line-height: 1.5;
  width: 70%;
`;

const ButtonTitle = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  left: 60px;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.main};
  opacity: ${props => props.$isVisible ? 1 : 0};
  transition: opacity 0.3s ease;
  font-size: 23px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
  font-family: ${bebasNeue.style.fontFamily};
  font-weight: 700;
  background: white;
  padding: 5px 10px;
`;

const PaginationContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  .swiper-pagination {
    position: relative;
    bottom: 0;
    gap: 10px;
  }

  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background: ${colors.main};
    opacity: 0.4;
    margin: 0 7px !important;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
    background: ${colors.main};
  }
`;

const HistoryCompass = (props: { $data: CompassDataList[], $parentWidth: number }) => {
  const data: CompassDataList[] = props.$data;
  const parentWidth: number = props.$parentWidth;
  // Для мобил < 960px
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (parentWidth <= 960) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [parentWidth]);
  // ---

  const [timeSectionNumber, setTimeSectionNumber] = useState(1);
  const currentSection = data[timeSectionNumber - 1];
  const [currentTwoYears, setCurrentTwoYears] = useState([currentSection.year, parseInt(currentSection.year) + 5]);
  const [rotationAngle, setRotationAngle] = useState(30);
  const [sliderOpacity, setSliderOpacity] = useState(1);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const animateYearChange = (startYear: number, endYear: number) => {
    const step = startYear < endYear ? 2 : -2;
    let current = startYear;
    
    const interval = setInterval(() => {
      current = current + step;
      
      setCurrentTwoYears([
        current.toString(), 
        (current + 5).toString()
      ]);

      if ((step > 0 && current >= endYear) || (step < 0 && current <= endYear)) {
        clearInterval(interval);
        setCurrentTwoYears([endYear.toString(), (endYear + 5).toString()]);
      }
    }, 100);
  };

  // Крутилка
  const handleRotation = (sectionNumber: number) => {
    setSliderOpacity(0); // Начинаем исчезновение

    setTimeout(() => {
      const newSection = data[sectionNumber - 1];
      const currentYear = parseInt(String(currentTwoYears[0]));
      const targetYear = parseInt(newSection.year);

      setRotationAngle(-(360 / data.length) * (sectionNumber - 1) + 30);
      setTimeSectionNumber(sectionNumber);
      animateYearChange(currentYear, targetYear);

      // Показываем слайдер после смены данных
      setTimeout(() => {
        setSliderOpacity(1);
      }, 100);
    }, 300); // Ждем завершения анимации исчезновения
  };

  const buttons = data.map((section, index) => {
    const angle = (360 / data.length) * index;
    const isActive = timeSectionNumber === index + 1;
    
    return (
      <CircleButton
        key={index}
        style={{ '--rotate': `${angle}deg` } as React.CSSProperties}
        onClick={() => handleRotation(index + 1)}
        className={isActive ? 'active' : ''}
      >
        {index + 1}
        <ButtonTitle $isVisible={isActive}>
          {section.title}
        </ButtonTitle>
      </CircleButton>
    );
  });

  return (
    <Background>
      <HorizontalLine $isMobile={isMobile}/>
      {!isMobile && (
        <>
          <HorizontalLine/><Circle/>
        </>
      )}
      {!isMobile && (
        <CircleControls $rotation={rotationAngle}>
          {buttons}
        </CircleControls>
      )}
      <YearContainer $isMobile={isMobile} $parentWidth={parentWidth}>
        <Year $isMobile={isMobile} $parentWidth={parentWidth}>{currentTwoYears[0]}</Year>
        <Year $isMobile={isMobile} $parentWidth={parentWidth}>{currentTwoYears[1]}</Year>
      </YearContainer>
      <Title $isMobile={isMobile}>
        <h1>
          Исторические даты
        </h1>
      </Title>
      <PageControls $isMobile={isMobile}>
        <p>
          0{timeSectionNumber}/0{data.length}
        </p>
        <PageButton 
          onClick={() => handleRotation(Math.max(timeSectionNumber - 1, 1))}
          disabled={timeSectionNumber === 1}
        >
          <Arrow direction="left" $isMobile={isMobile} />
        </PageButton>
        <PageButton 
          onClick={() => handleRotation(Math.min(timeSectionNumber + 1, data.length))}
          disabled={timeSectionNumber === data.length}
        >
          <Arrow direction="right" $isMobile={isMobile} />
        </PageButton>
      </PageControls>
      <SliderContainer $isMobile={isMobile} $opacity={sliderOpacity}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={isMobile ? 20 : 40} 
          slidesPerView={isMobile ? 1.5 : 3.3}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          pagination={isMobile ? {
            clickable: true,
            el: '.swiper-pagination'
          } : false}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {currentSection.dates.map((item, index) => (
            <SwiperSlide key={index}>
              <Slide>
                <Date $isMobile={isMobile}>{item.date}</Date>
                <Description $isMobile={isMobile}>{item.description}</Description>
              </Slide>
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderContainer>
      {isMobile && (
        <PaginationContainer>
          <div className="swiper-pagination" />
        </PaginationContainer>
      )}
      {!isMobile && (
        <SliderNavigation>
          <NavigationButton 
            className={`swiper-button-prev ${isBeginning ? 'swiper-button-disabled' : ''}`} 
            onClick={() => {
              const swiper = (document.querySelector('.swiper') as Element & { swiper: SwiperType })?.swiper;
              if (swiper) {
                swiper.slidePrev();
              }
            }}
          >
            <Arrow2 direction="left" $isMobile={isMobile} />
          </NavigationButton>
          <NavigationButton 
            className={`swiper-button-next ${isEnd ? 'swiper-button-disabled' : ''}`} 
            onClick={() => {
              const swiper = (document.querySelector('.swiper') as Element & { swiper: SwiperType })?.swiper;
              if (swiper) {
                swiper.slideNext();
              }
            }}
          >
            <Arrow2 direction="right" $isMobile={isMobile} />
          </NavigationButton>
        </SliderNavigation>
      )}
    </Background>
  );
};

export default HistoryCompass;

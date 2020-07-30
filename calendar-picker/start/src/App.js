import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import './App.css';

const days = Array(31)
  .fill(0)
  .map((e, i) => i + 1);

const StyledDateChooser = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const StyledDateChooserButton = styled.button`
  color: #0b204c;
  text-transform: uppercase;
  flex: 1;
  padding: 15px;
  background: none;
  cursor: pointer;
  border: none;
  border-bottom: 2px solid rgba(11, 32, 76, 0.2);
  outline: none;
  border-color: ${(props) => (props.isChoosing ? '#0b204c' : 'none')};
  span {
    display: block;
    min-height: 60px;
    font-size: 50px;
  }
`;

const StyledCalendar = styled.div`
  max-width: 400px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  background: #0b204c;
  color: #fff;
  padding: 20px;
`;

const StyledCalendarDay = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  transition: 0.3s ease background;
  border: none;
  outline: none;
  cursor: pointer;
  color: #8096c1;
  background: none;
  ${(props) =>
    props.isSelected &&
    css`
      background: #1a1a1a !important;
      color: #eee;
    `}
  ${(props) =>
    props.isInbetween &&
    css`
      color: #eee;
      background: #254381;
    `}

  &:hover {
    color: #eee;
    background: #254381;
  }
`;

export default function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [chooseType, setChooseType] = useState('start');
  const [hoverDate, setHoverDate] = useState(null);

  function updateDate(chosenDay) {
    if (startDate && chosenDay < startDate) {
      setStartDate(chosenDay);
      return setChooseType('end');
    }
    if (endDate && chosenDay > endDate) {
      setEndDate(chosenDay);
      return setChooseType('end');
    }

    if (chooseType === 'start') {
      setStartDate(chosenDay);
      setChooseType('end');
    } else {
      setEndDate(chosenDay);
    }
  }

  function checkIsInbetween(day) {
    if (startDate && !endDate) return day > startDate && day < hoverDate;
    return day > startDate && day < endDate;
  }

  return (
    <>
      <StyledDateChooser>
        <StyledDateChooserButton
          onClick={() => setChooseType('start')}
          isChoosing={chooseType === 'start'}
        >
          Start Date <span>{startDate}</span>
        </StyledDateChooserButton>
        <StyledDateChooserButton
          onClick={() => setChooseType('end')}
          isChoosing={chooseType === 'end'}
        >
          End Date <span>{endDate}</span>
        </StyledDateChooserButton>
      </StyledDateChooser>

      <StyledCalendar className='calendar'>
        {days.map((day, index) => {
          let isSelected = day === startDate || day === endDate;
          let isInbetween = checkIsInbetween(day);
          return (
            <StyledCalendarDay
              className='calendar-day'
              key={index}
              isSelected={isSelected}
              isInbetween={isInbetween}
              onClick={() => updateDate(day)}
              onMouseOver={() => setHoverDate(day)}
            >
              {day}
            </StyledCalendarDay>
          );
        })}
      </StyledCalendar>
    </>
  );
}

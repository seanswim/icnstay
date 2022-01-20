import styled from 'styled-components';
import CalendarModule from '../CalendarModule';
import { useState } from 'react';

const MainContainer = styled.div`
  padding: 1rem;
`;

const AccommodationDesc = () => {
  // Input data variances
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [biddingPrice, setBiddingPrice] = useState('');
  const [openModal, setOpenModal] = useState(false);
  // Event handlers
  const openCalendarModule = () => {
    setOpenModal(!openModal);
  };
  const handleChangeBiddingPrice = (event) => {
    setBiddingPrice(event.target.value);
  };
  const handleCheckInDate = (date) => {
    setCheckInDate(date);
  }
  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
  }
  const handlePlacingBid = async () => {
    const bidInformation = {
      id: 1,
      userId: 1,
      username: 'tia',
      name: 'hotel deluna',
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      biddingPrice: biddingPrice,
      createdAt: '2022-01-19 15:33:47',
      updatedAt: '2022-01-19 15:33:47',
    };
    console.log(bidInformation)
  };

  return (
    <MainContainer>
      <h1>Description Section</h1>
      <div>Location :</div>
      <div>Price :</div>
      <div>Bidding ends at :</div>
      <div>Minimum Price :</div>
      <div>Highest Bidding :</div>
      <div>
      <div>Bidding Price :</div>
      <input 
        type="number"
        placeholder="원"
        onChange={handleChangeBiddingPrice}
      />
      </div>
      <div><button onClick={openCalendarModule}>{checkOutDate? `Check-in : ${checkInDate} Check-out : ${checkOutDate}`: 'Check-in/ Check-out'}</button></div>
      {openModal ?
        <CalendarModule 
          handleCheckInDate={handleCheckInDate} 
          handleCheckOutDate={handleCheckOutDate} 
          checkInDate={checkInDate} 
          checkOutDate={checkOutDate}
          openCalendarModule={openCalendarModule}/>
        : ''
      }
      <button onClick={() => handlePlacingBid()}>Place a bid</button>
    </MainContainer>
  );
};

export default AccommodationDesc;
import React from 'react';
import { useHistory } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';


function BackButton(props) {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
    console.log("Back button pressed")
  };

  return (
    <button onClick={handleGoBack} className="d-flex bg-transparent border-0 text-white">
      <ArrowCircleLeftIcon/>
    </button>
  );
}


export default BackButton;
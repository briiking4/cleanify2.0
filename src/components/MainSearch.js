import React, { useState, useEffect } from 'react';
import Score from './Score'
import Search from './Search'


function MainSearch(props) {

  const [searchSelected, setSelect] = useState(false)

  function handleSelect(){
    setSelect(true)
  }

   return (

      <div id="mainSearch" className="pt-3">

            <Search location="search"/>


      </div>
    );
}

export default MainSearch


import React, { useState } from 'react';


const Home = ({dummyTweets}) => {
  let getOnlyUsernameArr = dummyTweets.map(e => {
    return (
    <div>
      {e.username}
    </div>
    )
  });

  return (
    <div id="Home">
      <div className='button_event'>
        버튼이벤트
        <button></button>
      </div>
      
    </div>
  );
}

export default Home;

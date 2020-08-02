import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PopupWindow from './PopupWindow';
import PopupWindowWithHooks from './PopupWindowWithHooks';
import { getRandom, replaceWithRandom } from './helpers';

function App() {
  let data = {
    something: 600,
    other: 200
  };
  let [dataState, setDataState] = useState(data);
  useEffect(() => {
    let interval = setInterval(() => {
      setDataState(replaceWithRandom(dataState));
      const event = new CustomEvent('onOverlayDataUpdate', {
        detail: dataState
      });
      document.dispatchEvent(event);
    }, 5000);
    return function clear() {
      clearInterval(interval);
    };
  }, []);
  useEffect(
    function getData() {
      document.addEventListener('onOverlayDataUpdate', (e) => {
        setDataState(replaceWithRandom(e.detail));
      });
      return function cleanup() {
        document.removeEventListener('onOverlayDataUpdate', document);
      };
    },
    [dataState]
  );
  console.log(dataState);

  // State handling
  const [isPopupWindowOpen, setIsPopupWindowOpen] = useState(false);
  const [isPopupWindowWithHooksOpen, setIsPopupWindowWithHooksOpen] = useState(
    false
  );
  const togglePopupWindow = () => setIsPopupWindowOpen(!isPopupWindowOpen);
  const togglePopupWindowWithHooks = () =>
    setIsPopupWindowWithHooksOpen(!isPopupWindowWithHooksOpen);
  const closePopupWindow = () => setIsPopupWindowOpen(false);
  const closePopupWindowWithHooks = () => setIsPopupWindowWithHooksOpen(false);

  // Side Effect
  useEffect(() =>
    window.addEventListener('beforeunload', () => {
      closePopupWindow();
      closePopupWindowWithHooks();
    })
  );
  return (
    <div>
      <button type='buton' onClick={togglePopupWindow}>
        Toggle Window
      </button>
      <button type='buton' onClick={togglePopupWindowWithHooks}>
        Toggle Window With Hooks
      </button>
      {isPopupWindowOpen && (
        <PopupWindow closePopupWindow={closePopupWindow}>
          <div>What is going on here?</div>
          <div>I should be here always!</div>
        </PopupWindow>
      )}
      {isPopupWindowWithHooksOpen && (
        <PopupWindowWithHooks
          closePopupWindowWithHooks={closePopupWindowWithHooks}
        >
          <div>What is going on here?</div>
          <div>I should be here always!</div>
        </PopupWindowWithHooks>
      )}
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

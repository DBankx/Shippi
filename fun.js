import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// https://stackoverflow.com/questions/53595935/how-can-i-make-react-portal-work-with-react-hook

const PopupWindowWithHooks = (props) => {
  const [containerEl] = useState(document.createElement('div'));
  let externalWindow = null;

  useEffect(
    () => {
      externalWindow = window.open(
        '',
        '',
        `width=600,height=400,left=200,top=200`
      );

      externalWindow.document.body.appendChild(containerEl);
      externalWindow.addEventListener('beforeunload', () => {
        props.closePopupWindowWithHooks();
      });
      console.log('Created Popup Window');
      return function cleanup() {
        console.log('Cleaned up Popup Window');
        externalWindow.close();
        externalWindow = null;
      };
    },
    // Only re-renders this component if the variable changes
    []
  );
  return ReactDOM.createPortal(props.children, containerEl);
};

export default PopupWindowWithHooks;

//function to copy styles
function copyStyles(sourceDoc, targetDoc) {
  Array.from(
    sourceDoc.querySelectorAll('link[rel="stylesheet"], style')
  ).forEach((link) => {
    targetDoc.head.appendChild(link.cloneNode(true));
  });
}

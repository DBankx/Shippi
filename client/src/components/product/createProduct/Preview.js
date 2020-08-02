import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import copyStyles from '../../../helpers/copyStyles';

const Preview = (props) => {
  // create a new div element
  const [containerEl] = useState(document.createElement('div'));
  let externalWindow = null;

  useEffect(() => {
    externalWindow = window.open(
      '',
      '',
      `width=1290,height=700,left=200,top=200`
    );

    copyStyles(document, externalWindow.document);

    externalWindow.document.body.appendChild(containerEl);
    externalWindow.addEventListener('beforeunload', () => {
      props.closeWindow();
    });
    console.log('Created Popup Window');
    return function cleanup() {
      console.log('Cleaned up Popup Window');
      externalWindow.close();
      externalWindow = null;
    };
  }, []);

  return ReactDOM.createPortal(props.children, containerEl);
};

export default Preview;

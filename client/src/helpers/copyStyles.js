// function to copy style into an external window
export default function copyStyles(sourceDoc, targetDoc) {
  Array.from(
    sourceDoc.querySelectorAll('link[rel="stylesheet"], style')
  ).forEach((link) => {
    targetDoc.head.appendChild(link.cloneNode(true));
  });
}

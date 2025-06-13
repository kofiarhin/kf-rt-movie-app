import "./loadButton.styles.scss";
const LoadButton = ({ onSetPageNumber }) => {
  return (
    <div id="load-button-wrapper" onClick={onSetPageNumber}>
      <button>Load More</button>
    </div>
  );
};

export default LoadButton;

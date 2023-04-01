const InvalidInputMessage = (props) => {
  const { className, text } = props;
  return <p className={className}>{text}</p>;
};
export default InvalidInputMessage;

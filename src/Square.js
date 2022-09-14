export function Square(props) {
  return (
    <button className="square" onClick={props.uponClick}>
      {props.value}
    </button>
  );
}

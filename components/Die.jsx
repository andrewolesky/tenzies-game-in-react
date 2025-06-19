export default function Die(props) {
  return (
    <button
      onClick={props.hold}
      style={{ backgroundColor: props.isHeld ? "#59E391" : "white" }}
    >
      {props.value}
    </button>
  );
}

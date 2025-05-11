export default function Dice(props) {
  return (
    <>
      <button
        onClick={() => props.holdButton(props.id)}
        className="dice"
        style={{ backgroundColor: props.isHeld ? "#59E391" : "white" }}
      >
        {props.number}
      </button>
    </>
  );
}

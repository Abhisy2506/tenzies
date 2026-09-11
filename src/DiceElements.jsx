export default function DiceElememnts({id, isHeld, displayNumber, stopRolling}){

    const styles = {
        backgroundColor: isHeld ? "#59E391" : "white",
    };  

    return (
        <div className="single-dice-value">
            <button onClick={()=>{stopRolling(id)}} style={styles}>{displayNumber}</button>
        </div>
    )

}
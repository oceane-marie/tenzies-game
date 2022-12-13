import React from "react"

export default function Die(props) {
    //create conditional style if die is held
    const styles = {
        backgroundColor: props.held ? "#59E391" : "white"
    }
    return (
        <div className="die-face"
          onClick={props.hold}
          //passing the condition to style
          style={styles}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}

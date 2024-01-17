import './Message.css';

function Message({id, name, message }) {
    const nikName = name
    const reversed = nikName.split('').reverse().join('').toLowerCase();
    if (id) {
        return (
            <div className={"messageBox left"}>
                {`${reversed}: ${message}`}
            </div>
        )
    }
    else {
        return (
            <div className={"messageBox right"} >
                {`You: ${message}`}
            </div>
        )
    }
}
export default Message
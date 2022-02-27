

function ProfileBox(props) {
    return (
        <div id="profile-container">
            <div>{props.cookies.name}</div>
        </div>
    );
}

export {ProfileBox};

import "../Styles/CollapseList.css"


function ListItem(props) {
    return (
        <div id="list-item-container">
            {props.children}
        </div>
    );
}

export default ListItem;
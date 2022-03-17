
import "../Styles/CollapseList.css"


function ListItem(props) {

    const callback = props.scrape ? (e) => { props.scrape(props.item) } : (e) => { };

    return (
        <div onClick={callback} id="list-item-container">
            {props.children}
        </div>
    );
}

export default ListItem;
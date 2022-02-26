
import "../Styles/CollapseList.css"


function ListItem(props) {
    return (
        <div onClick={(e)=>{props.scrape(props.item)}} id="list-item-container">
            {props.children}
        </div>
    );
}

export default ListItem;
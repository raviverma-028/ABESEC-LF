import "./../styles/ItemCard.css";

function ItemCard({
  item,
  type,
  onDelete,
  onAction,
}) {
  return (
    <div className="item-card">

      <div className="item-card-top">

        <div className="item-icon">
          {type === "lost" ? "🔎" : "📦"}
        </div>

        <span
          className={
            type === "lost"
              ? "status lost"
              : "status found"
          }
        >
          {type === "lost"
            ? "LOST"
            : item.status}
        </span>

      </div>

      <h3>{item.itemName}</h3>

      <span className="item-category">
        {item.category}
      </span>

      <p className="item-description">
        {item.description}
      </p>

      <div className="item-details">

        <p>
          📍 {item.location}
        </p>

        <p>
          📅 {item.date}
        </p>

      </div>

      <div className="item-user">

        <div className="avatar">
          {(item.ownerName ||
            item.finderName ||
            "U")
            .charAt(0)
            .toUpperCase()}
        </div>

        <div>

          <strong>
            {item.ownerName ||
              item.finderName}
          </strong>

          <small>
            {item.contact}
          </small>

        </div>

      </div>

      <div className="item-actions">

        <button
          className="primary-btn"
          onClick={() => onAction(item)}
        >
          {type === "lost"
            ? "Contact Owner"
            : "Recover"}
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default ItemCard;
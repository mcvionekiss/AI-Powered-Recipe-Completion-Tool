export default function FoodItemInfo({ foodItem, onClose }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      }}>
      <h2>{foodItem.name}</h2>
      <p>Quantity: {foodItem.quantity}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

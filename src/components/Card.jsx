import { Link } from "react-router-dom";

export default function Cards({
  id,
  productId,
  productName,
  custName,
  amount,
  transactionDate,
}) {
  return (
    <Link className="p-4 text-white rounded-lg bg-primary shadow-md hover:bg-secondary hover:shadow-xl hover:translate-y-[-5px] ease-in transition">
      <h2 className="text-lg font-bold">ID : {id}</h2>
      <h2 className="text-lg font-bold mb-4">Product Name : {productName}</h2>
      <p>Product ID: {productId}</p>
      <p>Customer: {custName}</p>
      <p>Amount: {amount.toLocaleString()}</p>
      <p>Date: {transactionDate}</p>
    </Link>
  );
}

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditPage = () => {
  const { transactionId } = useParams();

  const [formData, setFormData] = useState({
    productName: "",
    amount: "",
    customerName: "",
    status: "", 
  });
  const [statusList, setStatusList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch data transaction + daftar status
  useEffect(() => {
    async function fetchTransaction() {
      try {
        const res = await fetch(`http://localhost:4000/api/transactions/${transactionId}`);
        const json = await res.json();
        console.log("API Response:", json);

        if (res.ok && json.data) {
          setStatusList(json.status || []);

          const transaction = json.data.find(
            (item) => item.id === parseInt(transactionId)
          );

          if (transaction) {
            setFormData({
              productName: transaction.productName,
              amount: transaction.amount,
              customerName: transaction.customerName,
              status: transaction.status,
            });
          } else {
            setMessage("Transaction not found");
          }
        } else {
          setMessage(json.error || "Failed to load transaction");
        }
      } catch (err) {
        setMessage("Error: " + err.message);
      }
    }

    fetchTransaction();
  }, [transactionId]);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit form
  // handle submit form
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  // bikin payload sesuai body Postman
  const payload = {
    productName: formData.productName,
    amount: Number(formData.amount), // pastikan number
    customerName: formData.customerName,
    status_id: Number(formData.status), // pastikan number (0 atau 1)
  };

  console.log("🚀 Payload dikirim ke backend:", payload);

  try {
    const res = await fetch(`http://localhost:4000/api/transactions/${transactionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    console.log("📥 Response dari backend:", json);

    if (res.ok) {
      setMessage("Transaction updated successfully!");
    } else {
      setMessage(json.error || "Update failed");
    }
  } catch (err) {
    setMessage(" Error: " + err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-4 mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block">Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">-- Select Status --</option>
            {statusList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white px-4 py-3 rounded-lg font-semibold hover:bg-secondary transition ease-in"
        >
          {loading ? "Updating..." : "Update Transaction"}
        </button>
        <Link to={"/"} className="flex justify-center w-full border-2 border-primary text-primary py-3 px-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition ease-in"> Back to home page</Link>
      </form>
      {message && <p className="my-8 text-center">{message}</p>}
    </div>
  );
}

export default EditPage;

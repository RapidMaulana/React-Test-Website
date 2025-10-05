import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AddData = () => {
  const [statusList, setStatusList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    productID: "",
    productName: "",
    amount: "",
    customerName: "",
    status_id: 0,
    transactionDate: "",
    transactionTime: "",
    createdBy: "",
  });

  useEffect(() => {
    fetchStatusList();
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toTimeString().slice(0, 5);
    setFormData((prev) => ({
      ...prev,
      transactionDate: dateStr,
      transactionTime: timeStr,
    }));
  }, []);

  const fetchStatusList = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/transactions`);
      if (!response.ok) throw new Error("Failed to fetch status list");
      const result = await response.json();
      setStatusList(result.status || []);
    } catch (err) {
      console.error("Failed to fetch status list:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "status_id" || name === "amount"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);
    setLoading(true);

    try {
      // Combine date and time into ISO format
      const dateTimeString = `${formData.transactionDate}T${formData.transactionTime}:00`;
      const transactionDateTime = new Date(dateTimeString).toISOString();

      // Prepare data for POST request
      const postData = {
        productID: formData.productID,
        productName: formData.productName,
        amount: parseInt(formData.amount),
        customerName: formData.customerName,
        status_id: parseInt(formData.status_id),
        transactionDate: transactionDateTime,
        createdBy: formData.createdBy,
      };

      console.log("Posting data to API:", postData);

      // POST data to the database using fetch
      const response = await fetch(`http://localhost:4000/api/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create transaction");
      }

      const result = await response.json();
      console.log("Transaction created successfully:", result);

      setSuccess(true);

      // Reset form but keep current date/time
      const now = new Date();
      setFormData({
        productID: "",
        productName: "",
        amount: "",
        customerName: "",
        status_id: 0,
        transactionDate: now.toISOString().split("T")[0],
        transactionTime: now.toTimeString().slice(0, 5),
        createdBy: "",
      });

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(result.data);
      }

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to create transaction");
      console.error("Error creating transaction:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add New Transaction
      </h2>

      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          <p className="font-medium">✓ Transaction created successfully!</p>
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          <p className="font-medium">✗ Error: {error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="productID"
            value={formData.productID}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="10001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Product Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount <span className="text-red-500">*</span>
          </label>
          <div>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="1000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Customer Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transaction Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="transactionDate"
            value={formData.transactionDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transaction Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            name="transactionTime"
            value={formData.transactionTime}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            name="status_id"
            value={formData.status_id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {statusList.length > 0 ? (
              statusList.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))
            ) : (
              <>
                <option value="0">SUCCESS</option>
                <option value="1">FAILED</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Created By <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Name"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-tertiary disabled:cursor-not-allowed transition font-semibold"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              Creating...
            </span>
          ) : (
            "Create Transaction"
          )}
        </button>
      <Link to={"/"} className="flex justify-center w-full border-2 border-primary text-primary py-3 px-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition ease-in"> Back to home page</Link>
      </form>
    </div>
  );
};
export default AddData;

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const DetailPage = () => {
  const { id } = useParams();

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDatas(){
      try{
        const response = await fetch(
          `http://localhost:4000/api/transactions/${id}`
        );
        const data = await response.json();

        if(data.success){
          setDatas(data.data[0]);
        } else {
          throw new Error("Failed to fetch data");
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDatas();
  }, []);

  console.log("ini adalah data", datas[0]?.id)

  if (error) {
    return <h1>Data Not Found :(</h1>;
  }

  if(loading == true){
    return <h1>Please wait while we fetch our data...</h1>
  }

  return (
    <div className="m-5">
        <h1 className="text-4xl font-bold">Order {datas.id}</h1>
        <div className="text-2xl py-10 border-b-2 border-gray-300">
            <p>Product ID : {datas.productID}</p>
            <p>Product Name : {datas.productName} </p>
            <p>Amount : {datas.amount} </p>
            <p>Customer Name : {datas.customerName} </p>
            <p>Status : {datas.status == 0 ? "Success" : "Failed"} </p>
            <p>Transaction Date : {datas.transactionDate} </p>
            <p>Created By : {datas.createBy} </p>
        </div>
        <div className="w-[30%] flex gap-5 mt-10">
            <Link to={"/"} className="w-full text-center p-3 text-white bg-primary rounded-lg text-2xl font-semibold hover:bg-secondary transition ease-in duration-100">Go to Home</Link>
            <Link to={`/edit/${datas.id}`} className="w-full text-center p-3 text-primary border-3 border-primary rounded-lg text-2xl font-semibold hover:bg-primary hover:text-white transition ease-in duration-100">Edit data</Link>
        </div>
    </div>
  );
};

export default DetailPage;

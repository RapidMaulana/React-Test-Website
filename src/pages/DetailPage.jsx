import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import data from "../data/viewData.json";

const DetailPage = () => {
  const { id } = useParams();
  const datas = data.data;

  const item = datas.find((i) => i.id.toString() === id);

  if (!item) {
    return <h1>Data Not Found :(</h1>;
  }

  return (
    <div className="m-5">
        <h1 className="text-4xl font-bold">Order {item.id}</h1>
        <div className="text-2xl py-10 border-b-2 border-gray-300">
            <p>Product ID : {item.productID}</p>
            <p>Product Name : {item.productName} </p>
            <p>Amount : {item.amount} </p>
            <p>Customer Name : {item.customerName} </p>
            <p>Status : {item.status == 0 ? "Success" : "Failed"} </p>
            <p>Transaction Date : {item.transactionDate} </p>
            <p>Created By : {item.createBy} </p>
        </div>
        <div className="w-[30%] flex gap-5 mt-10">
            <Link to={"/"} className="w-full text-center p-3 text-white bg-primary rounded-lg text-2xl font-semibold hover:bg-secondary transition ease-in duration-100">Go to Home</Link>
            <Link to={"/"} className="w-full text-center p-3 text-primary border-3 border-primary rounded-lg text-2xl font-semibold hover:bg-primary hover:text-white transition ease-in duration-100">Edit data</Link>
        </div>
    </div>
  );
};

export default DetailPage;

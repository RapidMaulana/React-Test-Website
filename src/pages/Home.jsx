import { Link } from "react-router-dom";

import data from "../data/viewData.json";

const HomePage = () => {
  const datas = data.data;
  const totalDatas = datas.length;

  return (
    <div className="m-5 flex flex-col items-start flex-1">
      <h1 className="py-8 text-[48px] font-bold">
        Showing total entries of {totalDatas} datas...
      </h1>
        <table className="w-full border-separate border-spacing-0 rounded-xl overflow-hidden">
          <tr className="bg-tertiary text-white h-10 text-lg">
            <th>ID</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Amount</th>
            <th>Customer Name</th>
            <th>Status</th>
            <th>Transaction Date</th>
            <th>Created By</th>
            <th>Go to Details</th>
          </tr>
          {datas.map((key, i) => {
            return (
              <tr key={i} className={`${i % 2 == 0 ? "bg-primary" : "bg-secondary"} text-white h-14 text-center text-lg`}>
                <td>{key.id}</td>
                <td>{key.productID}</td>
                <td>{key.productName}</td>
                <td>{key.amount}</td>
                <td>{key.customerName}</td>
                <td>{key.status == 0 ? "Success" : "Failed"}</td>
                <td>{key.transactionDate}</td>
                <td>{key.createBy}</td>
                <td><Link to={`/detail/${key.id}`} className="flex justify-center hover:text-tertiary transitions ease-in-out duration-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link-icon lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg></Link></td>
              </tr>
            );
          })}
        </table>
    </div>
  );
};
export default HomePage;

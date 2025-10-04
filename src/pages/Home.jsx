import Cards from "../components/Card";

import data from "../data/viewData.json";

const HomePage = () => {
    const datas = data.data;

  return (
    <div className="m-5">
      <h1>Hi Mr, Sir...</h1>
      <div className="contents-table grid grid-cols-3 gap-5">
        {datas.map((key, i) => {
            return <Cards
                id={key.id}
                productId={key.productID}
                productName={key.productName}
                custName={key.customerName}
                amount={key.amount}
                transactionDate={key.transactionDate}
            />
        })}
      </div>
    </div>
  );
};
export default HomePage;

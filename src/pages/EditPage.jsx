import { useParams } from "react-router-dom";

import data from "../data/viewData.json";

const EditPage = () => {
  const { id } = useParams();
  const datas = data.data;

  const item = datas.find((i) => i.id.toString() === id);
  return <div></div>;
};
export default EditPage;

import CategoryModal from "./CategoryModal";

const Filter = ({ categFunc }) => {
  return (
    <div>
      <h2 className=" p-1">Filtrar por</h2>

      <CategoryModal categFunc2={categFunc} />
    </div>
  );
};

export default Filter;

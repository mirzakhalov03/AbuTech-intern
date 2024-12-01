import { GoSearch } from "react-icons/go";
import ContractsTable from "../../components/table/Table";
import "./contracts.scss";
import { useGetContractsQuery } from "../../redux/api/contracts-api";
import Modal from "../../components/modal/CreateModal";
import EditModal from "../../components/modal/EditModal";
import { useState } from "react";
import { Input } from "antd";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Contracts = () => {
  const { data, isLoading, isError, error } = useGetContractsQuery("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredContracts, setFilteredContracts] = useState([]); 

  const handleEdit = (id: number) => {
    setSelectedContractId(id); 
    setEditModalVisible(true); 
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (data?.data?.contracts) {
      const filtered = data.data.contracts.filter((contract: any) =>
        contract.title.toLowerCase().includes(value)
      );
      setFilteredContracts(filtered);
    }
  };

  if (isLoading) {
    return <p className="text-center mt-[50px]">Yuklanmoqda...</p>;
  }

  if (isError) {
    console.error("Error fetching contracts:", error);
    return <p className="text-center mt-[50px]">Oops! Kechirasiz, xatolik yuz berdi</p>;
  }

  const contractsToShow = searchTerm ? filteredContracts : data?.data?.contracts;

  return (
    <div className="container">
      <div className="contracts__wrapper">
        <div className="topBar">
          <form className="search">
            <GoSearch className="text-[20px]  text-[#667085]" />
            <Input
              placeholder="Qidiruv"
              className="input w-[150px] sm:w-[300px]"
              value={searchTerm}
              onChange={handleSearch}
            />
          </form>
          <button onClick={() => setIsModalVisible(true)}>Qo'shish</button>
        </div>
        {contractsToShow ? (
          <ContractsTable contracts={contractsToShow} onEdit={handleEdit} />
        ) : (
          <p className="text-center mt-[50px]">Shartnomalar mavjud emas</p>
        )}
        <Modal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
        {editModalVisible && selectedContractId && (
          <EditModal
            id={selectedContractId}
            visible={editModalVisible}
            onClose={() => setEditModalVisible(false)}
          />
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Contracts;

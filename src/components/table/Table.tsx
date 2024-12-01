import { FiEdit } from "react-icons/fi"; 
import React from "react";
import { Table, Button } from "antd";
import type { TableColumnsType } from "antd";

interface DataType {
  key: React.Key; 
  number: number; 
  title: string;  
  courseName: string; 
  actionBtn: JSX.Element; 
}

interface ContractsProps {
  contracts: {
    id: number;
    title: string;
    course: { name: string };
    createdAt: string;
  }[];
}

const ContractsTable: React.FC<ContractsProps & { onEdit: (id: number) => void }> = ({ contracts, onEdit }) => {
  const columns: TableColumnsType<DataType> = [
    {
      title: "#",
      dataIndex: "number",
      key: "number",
      align: "center",
    },
    {
      title: "Nomi",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Kurs",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "",
      dataIndex: "actionBtn",
      key: "actionBtn",
      align: "center",
    },
  ];

  const data: DataType[] = contracts.map((contract, index) => ({
    key: contract.id,
    number: index + 1,
    title: contract.title,
    courseName: contract.course?.name || "Kurs nomi kiritilmagan",
    actionBtn: (
      <Button type="link" onClick={() => onEdit(contract.id)}>
        <FiEdit className="text-[#0EB182]" />
      </Button>
    ),
  }));

  return <Table<DataType> columns={columns} dataSource={data} size="middle" pagination={{ pageSize: 10 }} />;
};

export default ContractsTable;

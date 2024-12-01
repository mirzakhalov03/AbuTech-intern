import { AiOutlineFileAdd } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import "./modal.scss";
import { Select } from "antd";
import { useState } from "react";
import { Button, Upload } from 'antd';
import {  useGetCoursesQuery } from "../../redux/api/contracts-api";
import { UploadFile } from "./UploadFile";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  CreateContract } from "../../types";
import { createContract } from "../../redux/api/add-contracts-api";


interface CreateModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ visible, onClose }) => {
  const [courseId, setCourseId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null)
  const [attachmentName, setAttachmentName] = useState<string>("")
  

  const {data} = useGetCoursesQuery("")

  const handleSave = async () => {
    

    

    try {
        const uploadedFile = attachment
        ? await UploadFile(attachment)
        : null;

        console.log("Uploading file:", attachment);
        const contractData: CreateContract = {
          title: name,
          courseId: courseId!,
          attachment: {
            size: uploadedFile?.data[0].size || 0,
            url: uploadedFile?.data[0].path || "",
            origName: uploadedFile?.data[0].fileName || "",
          },
        };

        await createContract(contractData)
        onClose();

        if (!uploadedFile || !uploadedFile.data) {
            alert("File upload failed. Please try again.");
            return;
        }


        toast.success("Shartnoma muvaffaqiyatli yaratildi");
        onClose();
    } catch (error) {
        console.error("Error saving contract:", error);
        toast.error("Xatolik yuz berdi");
    }
};
  

  if (!visible) return null; 

  return (
    <div className="modalBackdrop">
      <div className="modal">
        <div className="topBarModal">
          <h2>Shartnoma yaratish</h2>
          <RxCross2 onClick={onClose} className="text-[25px] cursor-pointer" />
        </div>
        <div className="dropdowns_wrapper">
          <div className="dropdown">
            <label className="pb-2">
              Kurs<small className="text-red-500">*</small>
            </label>
            <Select
              aria-required
              defaultValue="Tanlang"
              className="w-full h-[35px]"
              onChange={(value) => setCourseId(Number(value))}
              options={data?.data?.courses?.map((course:any) => ({
                value: course.id,
                label: course.name,
            }))}
            />
          </div>
          <div className="courseName">
            <label className="pb-2">
              Nomi<small className="text-red-500">*</small>
            </label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-[#E3E3E3] rounded-lg p-1 indent-1 outline-none"
            />
          </div>
          <div className="fileUpload">
            <label className="flex items-center justify-center gap-1 text-[#0EB182] w-full border border-dashed rounded-lg p-[8px] border-[#E3E3E3]">
              <AiOutlineFileAdd />
              <Upload 
              className=""
              accept=".pdf,.doc,.docx,.zip"
              beforeUpload={(file) => {
                setAttachment(file);
                setAttachmentName(file.name);
                return false;
              }}
              showUploadList={false}

              >
                <Button className="border-none bg-transparent text-[#0EB182]">{attachmentName || "Faylni biriktiring"}</Button>
              </Upload>
            </label>
          </div>
        </div>
        <div className="modalActionBtns">
          <button className="cancelActionBtn" onClick={onClose}>
            Bekor qilish
          </button>
          <button className="saveActionBtn" onClick={handleSave}>
            Saqlash
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateModal;

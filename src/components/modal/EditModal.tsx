import { AiOutlineFileAdd } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { Select, Button, Upload } from "antd";
import './modal.scss';
import { useGetContractByIdQuery, useGetCoursesQuery } from "../../redux/api/contracts-api";
import { useEffect, useState } from "react";
import { EditContract } from "../../redux/api/edit-contract-api";
import { UploadFile } from "./UploadFile";
import { CreateContract } from "../../types";

interface EditModalProps {
  id: number;
  visible: boolean;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ id, visible, onClose }) => {
  const { data: contractData, isLoading: contractLoading, isError: contractError } = useGetContractByIdQuery(id);
  const { data: coursesData, isLoading: coursesLoading, isError: coursesError } = useGetCoursesQuery("");

  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [attachment, setAttachment] = useState<File | null>(null)
  const [attachmentName, setAttachmentName] = useState<string>("")
  console.log(attachment)

  useEffect(() => {
    if (contractData) {
      setSelectedCourseId(contractData?.data?.course?.id || null);
      setTitle(contractData?.data?.title || "");
    }
  }, [contractData]);

  if (!visible) return null;

  if (contractLoading || coursesLoading) return <p>Loading...</p>;
  if (contractError || coursesError) return <p>Error loading data!</p>;

  const handleSave =  async () => {
    try{
        const uploadedFile = attachment
        ? await UploadFile(attachment)
        : null;

        const contractData2: CreateContract = {
            title: title,
            courseId: selectedCourseId!,
            attachment: uploadedFile
              ? {
                  size: uploadedFile?.data[0].size || 0,
                  url: uploadedFile?.data[0].path || "",
                  origName: uploadedFile?.data[0].fileName || "",
                }
              : contractData?.data?.attachment || { url: "", origName: "", size: 0 },
          };

        await EditContract(id, contractData2)
        onClose();
    } catch (error) {
      console.error("Xatolik:", error);

    }

    
  };

  return (
    <div className="modalBackdrop">
      <div className="modal">
        <div className="topBarModal">
          <h2>Shartnomani o'zgartirish</h2>
          <RxCross2 onClick={onClose} className="text-[25px] cursor-pointer" />
        </div>
        <div className="dropdowns_wrapper">
          <div className="dropdown">
            <label className="pb-2">
              Kurs<small className="text-red-500">*</small>
            </label>
            <Select
              defaultValue={contractData?.data?.course?.id}
              className="w-full h-[35px]"
              onChange={(value) => setSelectedCourseId(Number(value))}
              options={coursesData?.data?.courses?.map((course: any) => ({
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
                <Button className="border-none bg-transparent text-[#0EB182]">{attachmentName|| contractData?.data?.attachment?.origName || "Faylni biriktiring"}</Button>
              </Upload>
            </label>
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
      </div>
    </div>
  );
};

export default EditModal;

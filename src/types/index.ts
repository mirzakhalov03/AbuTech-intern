export interface Attachment {
    size: number,
    url: string | ''
    origName: string | ''
  }
  
export interface FormValues {
    course: string;
    name: string;
    file: Attachment | null;
  }

export type CreateContract = {
    title: string;
    courseId: number;
    attachment: {
        size: number;
        url: string;
        origName: string;
    };
};

export interface Course {
    id: number;
    name: string;
    createdAt: string;
  }


  export interface Course {
    id: number;
    name: string;
    disciplineId: number;
    disciplineName: string;
    hasCurriculum: boolean;
    hasStudyMonths: boolean;
    createdAt: string;
    imageIllustration: string;
  }
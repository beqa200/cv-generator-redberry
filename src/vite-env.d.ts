/// <reference types="vite/client" />



interface FormData {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  experiences: Array<{
    position: string;
    employer: string;
    start_date: string;
    due_date: string;
    description: string;
  }>;
  educations: Array<{
    institute: string;
    degree_id: string;
    due_date: string;
    description: string;
  }>;
  image: string;
  about_me: string;
}


interface ContextProps {
  pageCount: number;
  setPageCount: (pageCount: number) => void;
  storedFormData: any;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

interface Inputs {
    name: string;
    surname: string;
    image: string;
    about_me: string;
    email: string;
    phone_number: string;
    position: string;
    employer: string;
}

interface CVPropsTpye {
    firstname: string;
    lastname: string;
    image: string;
    about: string;
    email: string;
    phone: string;
}
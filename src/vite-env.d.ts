/// <reference types="vite/client" />

interface ContextProps {
  pageCount: number;
  setPageCount: (pageCount: number) => void;
}

interface Inputs {
    firstname: string;
    lastname: string;
    image: string;
    about: string;
    email: string;
    phone: string;
}
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { InitialInstructorData, InstructorData } from "../zodTypes";

interface registerInstructorProps {
  registerFormData: InitialInstructorData;
  updateRegisterDataForm: (formData: Partial<InstructorData>) => void;
  dataLoaded: boolean;
  resetLocalStorage: () => void;
}

const defaultFormData: InstructorData = {
  occupation: [""],
  specificSkills: [""],
  yearsOfExpertise: 0,
  qualification: [""],
  termsAndConditions: false,
  equipment: false,
  sampleContentUrl: "",
};

const registerInstructorContext = createContext<registerInstructorProps | null>(
  null
);

const REGISTER_INSTRUCTOR_DATA_KEY = "registerInstructorData";

export function RegisterInstructorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [registerFormData, setRegisterFormData] =
    useState<InstructorData>(defaultFormData);
  const [dataLoaded, setDataLoaded] = useState(false);

  const updateRegisterDataForm = (formData: Partial<InstructorData>) => {
    setRegisterFormData((prevFormData) => ({
      ...prevFormData,
      ...formData,
    }));
  };

  function resetLocalStorage() {
    localStorage.removeItem(REGISTER_INSTRUCTOR_DATA_KEY);
    setRegisterFormData(defaultFormData);
  }

  return (
    <registerInstructorContext.Provider
      value={{
        registerFormData,
        updateRegisterDataForm,
        dataLoaded,
        resetLocalStorage,
      }}
    >
      {children}
    </registerInstructorContext.Provider>
  );
}

export const useRegisterInstructorContext = () => {
  const context = useContext(registerInstructorContext);
  if (!context) {
    throw new Error(
      "useRegisterInstructorContext must be used within a RegisterInstructorProvider"
    );
  }
  return context;
};

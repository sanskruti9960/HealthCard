import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = React.useState({
    fullName: '',
    phone: '',
    birthDate: '',
    gender: '',
    bloodGrp: '',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    medicalConditions: '',
    allergies: '',
    pastSurgery: '',
    insuranceProvider: '',
    policyNumber: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <FormContext.Provider value={{ formData, handleChange }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
export default FormContext
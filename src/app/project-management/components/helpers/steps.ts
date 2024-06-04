import { Step, StepCounter } from "../../../shared/StepperComp/StepperComp";

export const steps: StepCounter = {
  totalSteps: 4,
  currentStep: 1,
  stepData: [
    {
      step: 1,
      title: "Proje Bilgileri",
      description: "Proje Bilgilerini Giriniz",
      active: true,
      completed: false,
    },
    {
      step: 2,
      title: "Adım Ekleme",
      description: "Proje Adımlarını Ekleyiniz",
      active: false,
      completed: false,
    },
    {
      step: 3,
      title: "Yönetici Ekleme",
      description: "Proje Yöneticisi Ekleyin",
      active: false,
      completed: false,
    },
    {
      step: 4,
      title: "Çalışan Ekleme",
      description: "Projede Çalışacak Kişileri Ekleyin",
      active: false,
      completed: false,
    },
  ],
};

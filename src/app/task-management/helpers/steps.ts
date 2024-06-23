import { StepCounter } from "../../shared/StepperComp/StepperComp";

export const steps: StepCounter = {
  currentStep: 1,
  totalSteps: 3,
  stepData: [
    {
      step: 1,
      title: "Görev Bilgilerini ve Bağlı Projeyi Seçiniz ( Zorunlu )",
      description: "Görev Bilgilerini Giriniz ve Bağlı Projeyi Seçiniz",
      active: true,
      completed: false,
    },
    {
      step: 2,
      title: "Görev Görsellerini Yükleyiniz ( Zorunlu )",
      description: "Görev Görsellerini Yükleyiniz",
      active: false,
      completed: false,
    },

    {
      step: 3,
      title: "Personel Seçiniz ( Zorunlu )",
      description: "Görev personeli seçin",
      active: false,
      completed: false,
    },
  ],
};

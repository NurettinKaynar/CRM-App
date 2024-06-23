import { StepCounter } from "../../shared/StepperComp/StepperComp";

export const steps: StepCounter = {
    currentStep: 1,
    totalSteps:5,
    stepData: [
      {
        step: 1,
        title: "Görev Bilgilerini ve Bağlı Projeyi Seçiniz",
        description: "Görev Bilgilerini Giriniz ve Bağlı Projeyi Seçiniz",
        active: true,
        completed: false,
      },
      {
        step: 2,
        title: "Görev Görsellerini Yükleyiniz",
        description: "Görev Görsellerini Yükleyiniz",
        active: false,
        completed: false,
      },
      {
        step: 3,
        title: "Yönetici Seçiniz",
        description: "Görev yöneticisi seçin",
        active: false,
        completed: false,
      },
      {
        step: 4,
        title: "Personel Seçiniz",
        description: "Görev personeli seçin",
        active: false,
        completed: false,
      },
      {
        step: 5,
        title: "Yorum Ekleyin",
        description: "Görev ait yorum ekleyiniz",
        active: false,
        completed: false,
      },
    ],
  };
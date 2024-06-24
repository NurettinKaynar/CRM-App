
export interface StepCounter {
  currentStep: number;
  stepData: Step[];
  totalSteps: number;
}

export interface Step {
  step: number;
  active: boolean;
  completed: boolean;
  title: string;
  description: string;
}

const StepperComp = ({
  currentStep,
  stepData,
}: {
  currentStep: number;
  stepData: Step[];
}) => {
  return (
    <div className="stepper-nav ps-lg-10">
      {stepData.map((item: Step, idx) => (
        <div
          key={idx}
          className={`stepper-item ${currentStep == idx + 1 ? "current" : ""} ${
            item.step < currentStep ? "completed" : ""
          }`}
          data-kt-stepper-element="nav">
          <div className="stepper-wrapper">
            <div className="stepper-icon w-40px h-40px">
              {item.step < currentStep ? (
                <i className="stepper-check fas fa-check"></i>
              ) : (
                <span className="stepper-number">{item.step}</span>
              )}
            </div>
            <div className="stepper-label">
              <h3 className="stepper-title">{item.title}</h3>
              <div className="stepper-desc"> {item.description}</div>
            </div>
          </div>
          {idx < stepData.length - 1 && (
            <div className="stepper-line h-40px"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepperComp;

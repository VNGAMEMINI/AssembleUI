import { useState } from "react";
import { Stepper } from "@assemble-ui/react";

const steps = [
  {
    id: "account",
    label: "Tài khoản",
    description: "Tạo tài khoản",
  },
  {
    id: "profile",
    label: "Hồ sơ",
    description: "Cập nhật thông tin",
  },
  {
    id: "confirm",
    label: "Xác nhận",
    description: "Hoàn tất",
  },
  {
    id: "disabled",
    label: "Bị khóa",
    description: "Chưa khả dụng",
    disabled: true,
  },
];

export function StepperDemo() {
  const [activeStep, setActiveStep] = useState("profile");

  return (
    <div className="demo-preview">
      <Stepper
        steps={steps}
        activeStep={activeStep}
        onStepChange={setActiveStep}
        aria-label="Tiến trình đăng ký"
      />

      <p>
        Bước hiện tại: <strong>{activeStep}</strong>
      </p>
    </div>
  );
}

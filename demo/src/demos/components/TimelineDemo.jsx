import { Timeline } from "@assemble-ui/react";

const items = [
  {
    id: "created",
    title: "Tạo project",
    content: "Khởi tạo AssembleUI project.",
    time: "09:00",
    status: "success",
  },
  {
    id: "components",
    title: "Xây dựng Components",
    content: "Hoàn thiện các thành phần UI cơ bản.",
    time: "11:30",
    status: "success",
  },
  {
    id: "patterns",
    title: "Xây dựng Patterns",
    content: "Đang mở rộng các UI composition.",
    time: "14:00",
    status: "warning",
  },
  {
    id: "release",
    title: "Release",
    content: "Chuẩn bị package để phát hành.",
    time: "Sắp tới",
    status: "default",
  },
];

export function TimelineDemo() {
  return (
    <div className="demo-preview">
      <Timeline items={items} />
    </div>
  );
}

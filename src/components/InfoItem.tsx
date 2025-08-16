import React from "react";

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

export function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="p-2 border rounded-full border-primary bg-primary/10">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm">{label}</span>
        <span className="text-sm">{value}</span>
      </div>
    </div>
  );
}

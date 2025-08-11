import { FileUser, HeartPulse, User } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PhoneLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile layout */}
      <div className="dock lg:hidden">
        <button>
          <FileUser className="size-[1.2em]" />
          <span className="dock-label">Register</span>
        </button>
        <button>
          <HeartPulse className="size-[1.2em]" />
          <span className="dock-label">MCU</span>
        </button>
        <button>
          <User className="size-[1.2em]" />
          <span className="dock-label">Profile</span>
        </button>
      </div>

      {/* Render children here */}
      <div className="p-4">{children}</div>
    </div>
  );
}

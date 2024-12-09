import { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LogOut, User, Settings, Bell } from "lucide-react";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentImage: string;
  onLogout: () => void;
}

export default function ProfileDropdown({
  isOpen,
  onClose,
  studentName,
  studentImage,
  onLogout,
}: ProfileDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-72 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50"
    >
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <img
            src={studentImage}
            alt={studentName}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-gray-700">{studentName}</p>
            <p className="text-xs text-gray-500">Student</p>
          </div>
        </div>
      </div>

      <div className="py-2">
        <NavLink
          to="/profile"
          onClick={onClose}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
        >
          <User className="h-4 w-4 mr-3 text-gray-500" />
          Your Profile
        </NavLink>
        <NavLink
          to="/settings"
          onClick={onClose}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
        >
          <Settings className="h-4 w-4 mr-3 text-gray-500" />
          Settings
        </NavLink>
        <NavLink
          to="/notifications"
          onClick={onClose}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
        >
          <Bell className="h-4 w-4 mr-3 text-gray-500" />
          Notifications
        </NavLink>
      </div>

      <div className="py-2 border-t border-gray-100">
        <button
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign out
        </button>
      </div>
    </div>
  );
}

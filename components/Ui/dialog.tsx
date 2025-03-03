import React from "react";

export const Dialog = ({
  open,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
          {children}
        </div>
      </div>
    )
  );
};

export const DialogHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-lg font-semibold mb-4">{children}</div>;
};

export const DialogTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-xl font-bold">{children}</h2>;
};

export const DialogContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-4">{children}</div>;
};

export const DialogFooter = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-end gap-2">{children}</div>;
};

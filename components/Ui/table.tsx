import React from "react";

export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border border-gray-300">{children}</table>
    </div>
  );
};

export const TableHeader = ({ children }: { children: React.ReactNode }) => {
  return <thead className="bg-gray-200">{children}</thead>;
};

export const TableRow = ({ children }: { children: React.ReactNode }) => {
  return <tr className="border-b border-gray-300">{children}</tr>;
};

export const TableHead = ({ children }: { children: React.ReactNode }) => {
  return <th className="px-4 py-2 text-left text-gray-700">{children}</th>;
};

export const TableBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>;
};

export const TableCell = ({ children }: { children: React.ReactNode }) => {
  return <td className="px-4 py-2">{children}</td>;
};

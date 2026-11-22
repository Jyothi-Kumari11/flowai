interface DashboardHeaderProps {
  heading: string;
  subheading?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({ heading, subheading, children }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{heading}</h1>
        {subheading && <p className="text-gray-500 mt-1">{subheading}</p>}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}

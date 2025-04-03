export const Modal = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-[35rem] w-[30rem] z-20 rounded-tr-3xl rounded-bl-3xl text-white ${className}`} {...props}  >
      {children}
    </div>
  );
};

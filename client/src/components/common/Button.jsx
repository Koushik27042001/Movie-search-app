function Button({ children, onClick, variant = "primary", className = "", ...props }) {
  const base = "px-4 py-2 rounded font-medium transition";
  const variants = {
    primary: "bg-amber-500 hover:bg-amber-600 text-black",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

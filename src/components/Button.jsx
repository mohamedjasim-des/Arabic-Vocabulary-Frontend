export default function Button({ children, disabled, ...props }) {
  return (
    <button
      {...props}
      className={`w-full py-2 text-white rounded-lg transition 
        ${disabled ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
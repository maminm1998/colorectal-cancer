const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(100, 100, 0, 0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "4px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        {children}
        <button
          onClick={onClose}
          className="bg-orange-400 w-full p-2  text-white rounded-lg"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default Modal;

function Error({ message = "Something went wrong. Please try again." }) {
  return (
    <div className="text-center py-12 text-red-400">
      <p className="text-lg">{message}</p>
    </div>
  );
}

export default Error;

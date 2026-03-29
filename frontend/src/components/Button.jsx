const Button = ({ label = "Get the Trends", onClick }) => {
  return (
    <div className="mx-auto mt-5 flex w-full max-w-xl justify-end">
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 active:scale-[0.99]"
      >
        {label}
      </button>
    </div>
  )
}

export default Button

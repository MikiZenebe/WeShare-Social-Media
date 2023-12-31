/* eslint-disable react/prop-types */
export default function CustomButton({
  title,
  containerStyle,
  iconRight,
  type,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`inline-flex items-center text-base ${containerStyle}`}
    >
      {title}
      {iconRight && <div className="ml-2">{iconRight}</div>}
    </button>
  );
}

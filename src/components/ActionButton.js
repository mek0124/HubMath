import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ActionButton({ 
  text, 
  icon, 
  onClick, 
  type = 'button', 
  fullWidth = false,
  isLoading = false,
  variant = 'primary', // primary, secondary, outline
  size = 'md', // sm, md, lg
  className = ''
}) {
  // Size classes
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-accent hover:bg-blue-600 text-white',
    secondary: 'bg-tertiary hover:bg-blue-700 text-fontColor',
    outline: 'bg-transparent border-2 border-accent text-accent hover:bg-accent/20'
  };
  
  const buttonClasses = `
    ${fullWidth ? 'w-full' : ''}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    rounded-lg
    font-bold
    transform
    transition-all
    duration-300
    hover:scale-105
    hover:shadow-lg
    focus:outline-none
    focus:ring-2
    focus:ring-accent
    focus:ring-opacity-50
    flex
    items-center
    justify-center
    ${className}
  `;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={buttonClasses}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon && (
        <FontAwesomeIcon icon={icon} className={text ? 'mr-2' : ''} />
      )}
      {text}
    </button>
  );
}

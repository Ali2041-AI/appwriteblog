function Button({
    children,
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white',
    className='',
    ...props
}){
    return (

        <button type={type} className={`${className} ${bgColor} ${textColor} px-4 py-2 rounded-md`} {...props}>
            {children}
        </button>
    )
}
export default Button;
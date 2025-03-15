import './App.css'
export const Nutrition = ({ label, quantity, unit}) => {
    return (
      
            <ul>
            <li>{label} :<span>{quantity.toFixed(2)} {unit}</span></li>
            </ul>
        
    )
}
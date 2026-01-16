import { forwardRef } from 'react'
import { useId } from 'react'

const Location=forwardRef(function Location({
  innercolor,
  className,
  ...props
 },referance){
const id=useId();

return (

<div className="space-y-2">
  <label 
  className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight"
  >City / Area
  </label>
  <div className="relative">
    <MapPin 
    className="absolute left-5 top-4 text-red-400" 
    size={18} 
    />
    <input 
    type="text" 
    placeholder="City / Area" 
    className={`w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-${innercolor}-500 focus:bg-white transition-all font-medium ${className}`}
    {...props}
    id={id}
    ref={referance}
    />
  </div>
</div>

)
})

export default Location

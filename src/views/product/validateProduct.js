const validateProduct = (values) =>{
    const error = {}

    if(!values.name.trim()){
        error.name = 'product name is required'
    }
    if(!values.type.trim()){
        error.type = 'product type is required'
    }
    if(!values.quality.trim()){
        error.quality = 'product quality is required'
    }
    if(!values.quantity.trim()){
        error.quantity = 'product quantity is required'
    }
    else if(values.quantity?.length >6){
        error.quantity = 'quantity must be lessthan 7 digits'
    }
    if(!values.price.trim()){
        error.price = 'product price is required'
    }
    else if(values.price?.length >2){
        error.price = 'price must be lessthan 3 digits'
    }
    return error
}
export default validateProduct
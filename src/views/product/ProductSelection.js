import {useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import validateProduct from './validateProduct'
import SaveButton from '../../components/Button'
import classes from './Products.module.css'
const ProductSelection = (props) =>{
 const [productInfo,setProductInfo] =useState({name:"",type:"",quality:"Fresh",quantity:"",price:""})
 const [errors,setErrors] = useState({name:"",type:"",quality:"",quantity:"",price:""})

 useEffect(()=>{
  
 },[])
 const onChangeHandler = (e) =>{
  const {name,value} = e.target
  setProductInfo(preValue=>{
    return {...preValue,[name]:value}
  })
  if(value){
    setErrors(prevErrors=>{
      return {...prevErrors,[name]:''}
    })
  }
 }
 const selectChangeHandler = (e)=>{
  const {name,value} = e.target
  setProductInfo(preValue=>{
    return {...preValue,[name]:value}
  })
  if(value){
    setErrors(prevErrors=>{
      return {...prevErrors,[name]:''}
    })
  }
 }
    const onSaveHandler = ()=>{
      if(props.isNewFarmer){
      console.log(props.getFarmer())
      }
      const err = validateProduct(productInfo) 
      setErrors(err)
    }
    return<div>
       <div className="fw-bold py-2">Product Information</div>
       <div className="border border-2 rounded-3 shadow-sm p-4">
      <div className='d-flex'>
      <Form.Group className="mb-3 flex-fill me-5" controlId="product">
        <Form.Label>Product</Form.Label>
        <Form.Select 
        name='name'
        className={errors.name?classes.errorBorder:''}
        onChange={selectChangeHandler}
        value={productInfo.name || ''} >
        <option>Tomato</option>
        <option>Onion</option>
        <option>Mango</option>
        <option>Avocado</option>
      </Form.Select>
      <span className={classes.errorText}>{errors.name}</span>
      </Form.Group> 
      <Form.Group className="mb-3 flex-fill me-5" controlId="type">
      <Form.Label>Type</Form.Label>
      <Form.Select
      name='type'
       className={errors.type?classes.errorBorder:''}
       onChange={selectChangeHandler}
        value={productInfo.type || ''}
       >
      <option>Type 1</option>
      <option>Type 2</option>
      <option>Type 3</option>
      <option>Type 4</option>
    </Form.Select>
    <span className={classes.errorText}>{errors.type}</span>
    </Form.Group> 
    <Form.Group className="mb-3 flex-fill" controlId="product">
    <Form.Label>Quality</Form.Label>
    <Form.Select 
    name='quality'
    className={errors.quality?classes.errorBorder:''}
    onChange={selectChangeHandler}
    value={productInfo.quality || ''}
    >
    <option>Fresh</option>
    <option>nutritive </option>
    <option>flavor </option>
  </Form.Select>
  <span className={classes.errorText}>{errors.quality}</span>
  </Form.Group> 
      
    </div>
    <div className='d-flex justify-content-between align-items-center mt-4'>
    <Form.Group className="mb-3 flex-fill me-5" controlId="priceinput">
      <Form.Label>Quantity</Form.Label>
      <Form.Control
      type='text'
      name='quantity'
      onChange={onChangeHandler}
      value={productInfo.quantity || ''}
      className={errors.quantity?classes.errorBorder:''}
     />
     <span className={classes.errorText}>{errors.quantity}</span>
    </Form.Group> 
    <Form.Group className="mb-3 flex-fill me-5" controlId="pricecheck">
    <Form.Label>Price per Kg</Form.Label>
    <Form.Control
    type='text'
      name='price'
      onChange={onChangeHandler}
      value={productInfo.price || ''}
      className={errors.price?classes.errorBorder:''}
     />
     <span className={classes.errorText}>{errors.price}</span>
  </Form.Group> 
   <div className='flex-fill'>
   <Form.Check
  type='checkbox'
  id='currentPrice'
  label='use current price'
   />
   </div>
  
    
  </div>
       </div>
       <div className='d-flex justify-content-end ms-auto mt-4'>
   <SaveButton title="Save" onSave={onSaveHandler} />
    </div>
    </div>
}
export default ProductSelection
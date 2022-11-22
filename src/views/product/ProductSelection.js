import {useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import validateProduct from './validateProduct'
import SaveButton from '../../components/Button'
import classes from './Products.module.css'
import apiClient from '../../url'
const ProductSelection = (props) =>{
  const [products,setProducts] = useState([])
  const [types,setTypes] =useState([])
 const [productInfo,setProductInfo] =useState({productId:"",productTypeId:"",quality:"Fresh",quantity:"",warehousePosition:''})
 const [errors,setErrors] = useState({productId:"",productTypeId:"",quality:"",quantity:"",warehousePosition:''})
 
 const fetchProducts = async()=>{
 const response = await apiClient.get('localadmin/products/for-filter')
 if(response.status === 200){
  setProducts(response.data)
  setTypes(response.data[0]?.productTypes)
 }
 }
 useEffect(()=>{
  fetchProducts()
 },[])
 console.log('products in my coldroom=',products)
 console.log('product types of the selected product=',types)
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
 const productSelectChangeHandler = (e) =>{
  const {name,value} = e.target
  const index=products.findIndex(product=>product.id*1 === e.target.value*1)
  setTypes(products[index].productTypes)
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
    const onSaveHandler = async()=>{
      const productData = {}
      const err = validateProduct(productInfo) 
        setErrors(err)
        let error = Object.values(err)?.length
        let farmerInfo ={}
        let response = null
      if(props?.isNewFarmer){
         farmerInfo =props.getFarmer()            
         const farmer = {
          fName:farmerInfo.farmer.fName,
          lName:farmerInfo.farmer.lName,
          phoneNumber:farmerInfo.farmer.phoneNumber,          
          address:{
            region:farmerInfo.farmer.region,
            zone:farmerInfo.farmer.zone,
            woreda:farmerInfo.farmer.woreda,
            kebele:farmerInfo.farmer.kebele
           }
         }
          productData.isNew = true
          productData.farmer = farmer
          productData.product = productInfo  
          console.log('new farmer =',farmerInfo)

      }
      else if(props.farmerId){
        console.log('farmerId = ',props.farmerId)
        productData.isNew = false
        productData.farmerId =props.farmerId
        productData.product = productInfo

      }
      
      console.log('farmer error=',farmerInfo.error)
      console.log('product error=',error)
      if(!error && !farmerInfo.error ){
         
        try{
        response = await apiClient.post('localadmin/products',productData)
        if(response.status === 201){
          console.log('product added =',response.data)
        }
        }
        catch(err){
          console.log(err)
        }
      }
      
    }
    return<div>
       <div className="fw-bold py-2">Product Information</div>
       <div className="border border-2 rounded-3 shadow-sm p-4">
      <div className='d-flex'>
      <Form.Group className="mb-3 flex-fill me-5" controlId="product">
        <Form.Label>Product</Form.Label>
        <Form.Select 
        name='productId'
        className={errors.productId?classes.errorBorder:''}
        onChange={productSelectChangeHandler}
        value={productInfo.productId || ''} >
        {
          products?.length >0 && (
            products.map(product=>(<option key={product.id} value={product.id}>{product.name}</option>))
          )}
      </Form.Select>
      <span className={classes.errorText}>{errors.productId}</span>
      </Form.Group> 
      <Form.Group className="mb-3 flex-fill me-5" controlId="type">
      <Form.Label>Type</Form.Label>
      <Form.Select
      name='productTypeId'
       className={errors.productTypeId?classes.errorBorder:''}
       onChange={selectChangeHandler}
        value={productInfo.productTypeId || ''}
       >
       {
        types?.length > 0 && (
          types.map(type=>(<option value={type.id}>{type.title}</option>))
        )}
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
    <option value='Fresh'>Fresh</option>
    <option value='Nutritive'>nutritive </option>
    <option value='Flavor'>flavor </option>
  </Form.Select>
  <span className={classes.errorText}>{errors.quality}</span>
  </Form.Group> 
      
    </div>
    <div className='d-flex justify-content-start align-items-center mt-4'>
    <Form.Group className="mb-3 me-5 col-4" controlId="priceinput">
      <Form.Label>Quantity</Form.Label>
      <Form.Control
      type='number'
      name='quantity'
      onChange={onChangeHandler}
      value={productInfo.quantity || ''}
      className={errors.quantity?classes.errorBorder:''}
     />
     <span className={classes.errorText}>{errors.quantity}</span>
    </Form.Group> 
    <Form.Group className="mb-3 me-5 col-4" controlId="position">
    <Form.Label>Product SKU</Form.Label>
    <Form.Control
    type='text'
    name='warehousePosition'
    onChange={onChangeHandler}
    value={productInfo.warehousePosition || ''}
    className={errors.warehousePosition?classes.errorBorder:''}
   />
   <span className={classes.errorText}>{errors.warehousePosition}</span>
  </Form.Group> 
    
  
    
  </div>
       </div>
       <div className='d-flex justify-content-end ms-auto mt-4'>
   <SaveButton title="Save" onSave={onSaveHandler} />
    </div>
    </div>
}
export default ProductSelection
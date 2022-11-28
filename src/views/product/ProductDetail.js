import { useState,useRef,useEffect } from "react";
import Table from "react-bootstrap/Table";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ReactToPrint from "react-to-print";
import {useDispatch } from "react-redux";
import { isLoadingAction } from "../../store/slices/spinerSlice";
// import { buttonAction } from "../../store/slices/ButtonSpinerSlice";
import apiClient from "../../url/index";
import EditProductTypeInofo from './EditProductTypeInfo'
import { useParams,useNavigate } from "react-router-dom";
import classes from "./Products.module.css";


const ProductDetail = () => {
    const [productTypes,setProductTypes] = useState([])
  const [show,setShow] = useState(false)
  const [producttoedited,setProduct] = useState({})
  const componentRef = useRef()
  const navigate = useNavigate()
//  const products = useSelector(state=>state.productDetail.productTypes)
  const dispatch = useDispatch()
  const {prId} = useParams()

  const featchProductDetails = async ()=>{
    dispatch(isLoadingAction.setIsLoading(true))
  try{
   var response = await apiClient.get(`admin/products/${prId}`)
   if(response.status === 200){
    console.log('product types=..',response.data)
    dispatch(setProductTypes(response.data))
   
   }
  }
  catch(err){
    console.log(err)
  }
  finally {dispatch(isLoadingAction.setIsLoading(false))}
}
   useEffect(()=>{   
    featchProductDetails()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
  const editProductTypeHandler = (product) =>{
    setProduct(product)
    setShow(true)
  }
  const closeModalHandler = () =>{
    setShow(false)
  }
 
  return (
    <div ref={componentRef}>
    <Button onClick={()=>navigate(-1)} variant='none' className={`${classes.boxShadow} fs-3 fw-bold`}><i className="fas fa-arrow-left"></i></Button> 
      <h5 className="text-bold">Product Details</h5>
      <p className={`${classes.titleP} fw-bold small`}>
        In the product Details section you can review and manage  product with
        their type.You can view and edit product type price.
        </p>
      <div className={classes.bottomBorder}>
       
      </div>
      <div className="d-flex justify-content-end mt-4">
        <div>
        <ReactToPrint
        trigger={()=><Button variant='none' className="exportbtn py-1 onPrintDnone"><span><i className="fas fa-file-export"></i></span> Export</Button>}
        content={()=>componentRef.current}       
        documentTitle='new document'
        pageStyle='print'
        />
          
        </div>
      </div>
      <div className="mt-3">
        <Table responsive="md">
          <thead className={classes.header}>
            <tr>
              <th>NO</th>
              <th>Product Type</th>
              <th>Product Type Description</th>
              <th>Product Type Image</th>
              <th className="onPrintDnone"></th>
            </tr>
          </thead>
          <tbody>
          {
            productTypes.map((product,index) =>(
              <tr key={index}>
              <td className="p-4">{index+1}</td>
              <td className="p-4">{product.title}</td>
              <td className="p-4">{product.description}</td>
              <td className="p-4">
              <img src={product.imageUrl} alt="product_type_image" className={classes.img} />
              </td>
              <td className={`onPrintDnone`}>
              <Dropdown>
      <Dropdown.Toggle variant="none" id="dropdown-basic">
      <i className="fas fa-ellipsis-v"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu className={classes.dropdownBg}>
      <Button variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`} onClick={()=>editProductTypeHandler(product)}>Edit Product Type</Button>
        </Dropdown.Menu>
    </Dropdown>
              </td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
      <EditProductTypeInofo show={show} onClose={closeModalHandler} product={producttoedited} />
    </div>
  );
};
export default ProductDetail;

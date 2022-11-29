import { useState,useRef,useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import ReactToPrint from "react-to-print";
import {useDispatch } from "react-redux";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import SaveButton from '../../components/Button'
import CancelButton from "../../components/CancelButton";

// import { buttonAction } from "../../store/slices/ButtonSpinerSlice";
import apiClient from "../../url/index";
import { useParams,useNavigate } from "react-router-dom";
import classes from "./Products.module.css";


const ProductDetail = () => {
    const [productTypes,setProductTypes] = useState([])
  const [show,setShow] = useState(false)
  const [producttoedited,setProduct] = useState({})
  const componentRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {prId} = useParams()

  const featchProductDetails = async ()=>{
    dispatch(isLoadingAction.setIsLoading(true))
  try{
   var response = await apiClient.get(`localadmin/products/get-price/${prId}`)
   if(response.status === 200){
    setProductTypes(response.data)
   
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
  const editProductTypePriceHandler = (product) =>{
    setProduct(product)
    setShow(true)
  }
  const handleClose = () =>{
    setShow(false)
  }
 console.log('producttoedited',producttoedited)
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
              <th>Product Type Image</th>
              <th>Price Pre Kg</th>
              <th className="onPrintDnone"></th>
            </tr>
          </thead>
          <tbody>
          {
            productTypes.map((product,index) =>(
              <tr key={product.id}>
              <td className="p-4">{index+1}</td>
              <td className="p-4">{product.title}</td>
              <td className="p-4">
              <img src={product.imageUrl} alt="product_type_image" className={classes.img} />
              </td>
              <td className="p-4">{product.pricePerKg?product.pricePerKg:0}</td>
              <td className={`onPrintDnone`}>
             <Button variant="none" className={`${classes.dropdownItem} w-100 rounded-0 text-start ps-3`} onClick={()=>editProductTypePriceHandler(product)}>Edit Price</Button>       
              </td>
            </tr>
            ))
          }         
          </tbody>
        </Table>
      </div>
      <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Product type price</Modal.Title>
      </Modal.Header>
      <Modal.Body>
     <div className="p-3">
     <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <div className="d-flex justify-content-end my-3">
      <CancelButton title='Cancel' onClose={handleClose}/>
      <div className="ms-4"><SaveButton title='Save' /></div>
      
     
      </div> 
     </div>
      </Modal.Body>
    
    </Modal>
    </div>
  );
};
export default ProductDetail;

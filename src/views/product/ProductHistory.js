import { Fragment,useEffect,useRef } from "react";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import ReactToPrint from "react-to-print";
import apiClient from "../../url/index";
import {useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import { productAction } from "../../store/slices/ProductSlice";
import classes from "./Products.module.css";



const ProductHistory = () => {
  const dispatch = useDispatch()
  const products = useSelector(state =>state.product.productHistries)
  const navigate = useNavigate()
  const componentRef = useRef()  
  const searchBy = useRef()

  async function  featchProductHistory(){
    dispatch(isLoadingAction.setIsLoading(true))
  try{
   var response = await apiClient.get(`admin/orders`)
   if(response.status === 200){
    dispatch(productAction.setProductHistory(response.data || []))
   }
  }
  catch(err){}
  finally {dispatch(isLoadingAction.setIsLoading(false))}
}
  useEffect( ()=>{
    
  featchProductHistory()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const enterKeyHandler = (event) =>{
    if(event.key === 'Enter' || !event.target.value){
      featchProductHistory()
    }
  }
  const searchHandler = () =>{
    featchProductHistory()
  }
  const filterByDateHandler = () =>{}
  return (
    <Fragment>
    <Button onClick={()=>navigate(-1)} variant='none' className={`${classes.boxShadow} fs-3 fw-bold`}><i className="fas fa-arrow-left"></i></Button> 
    <div ref={componentRef}>
      <div className="fw-bold">Product history</div>
      <div className="d-flex justify-content-between">
      <div>
        <div className="mt-3">
          <span className="fw-bold">Cold room</span>: Bahir Dar</div>
        <div className="mt-3">
          <span className="fw-bold">Total product stocks</span>: 1000kg
        </div>
      </div>
    </div>
      <div className={`${classes.bottomBorder} mt-5`}></div>
        <div className={`${classes.grayBg} d-flex justify-content-end mt-3 p-2`}>
        <InputGroup className="mb-3 w-50 border rounded onPrintDnone">
        <InputGroup.Text id="basic-addon1" className={classes.searchIcon}>
          <span onClick={searchHandler}>
            <i className="fas fa-search"></i>
          </span>
        </InputGroup.Text>
        <Form.Control
          className={classes.searchInput}
          placeholder="search by farmer name"
          aria-label="productName"
          aria-describedby="basic-addon1"
          ref={searchBy}
          onKeyUp={enterKeyHandler}
        />
      </InputGroup>
      <div className="ms-3 me-3 onPrintDnone">
      <Form.Group controlId="search-by-date">
      <Form.Control 
      type="date"
      onChange={filterByDateHandler}
       />
    </Form.Group>
      </div>
        <div>
        <ReactToPrint
        trigger={()=><Button variant='none' className="exportbtn onPrintDnone py-1"><span><i className="fas fa-file-export"></i></span> Export</Button>}
        content={()=>componentRef.current}       
        documentTitle='new document'
        pageStyle='print'
        />
        </div>
      </div>
      {products?.length > 0 && (
      <div className="mt-4">
        <Table responsive="md">
          <thead className={classes.header}>
            <tr>
              <th>Product SKU</th>
              <th>Product</th>
              <th>Type</th>
              <th>Farmer</th>
              <th>Added Date</th>
              <th>Quantity(Kg)</th>
              <th>Price per Kg(ETB)</th>
            </tr>
          </thead>
          <tbody>
          {
            products.map((order) =>(
              <tr className={classes.row} key={order.id}>
              <td className="p-3">{order.farmerProduct.warehousePosition}</td>
              <td className="p-3">{order.farmerProduct.product?.name}</td>
              <td className="p-3">{order.farmerProduct.productType?.title}</td>
              <td className="p-3">{order.farmerProduct.quality}</td>
              <td className="p-3">{order.quantity}</td>
              <td className="p-3">{order.farmerProduct.pricePerKg}</td>
              <td className="p-3 text-center">null</td>
              <td className="p-3 text-center">{order?.price}</td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
      )}
      
      </div>
    </Fragment>
  );
};
export default ProductHistory;

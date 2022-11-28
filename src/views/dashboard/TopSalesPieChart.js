import {useState,useEffect} from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Form from 'react-bootstrap/Form';
import addYear from './addYear';
import apiClient from '../../url/index';
import classes from './TopSalesPieChart.module.css'

// const data = [
//   { name: 'Tomato', value: 400 },
//   { name: 'Onion', value: 300 },
//   { name: 'Other', value: 300 },
// ];

const COLORS = ['#84DB3A','#FF7E00', '#FFFFFF',];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

 const SalesPieChart = () => {
  const [salesOverview,setSalesOverview] = useState([])
  const currentYear = new Date().getFullYear()*1
  const [selectedValue,setSelectedValue] = useState(currentYear)
  const years = addYear() 

  const rearrangeResponse =(response) =>{
    const topSeller = response.data.sales.map(element=>{
      return {
        name:element.farmerProduct.product?.name,
        value:element.soldQuantity
      }
    }) 
    console.log('piechart data1=',topSeller)
    const bestSells = []
    topSeller.forEach((el,index)=>{
      bestSells[index] = topSeller[index]
    })
     if(topSeller.length > 2){
    const topeSale1 = topSeller[0]?.value
    const topeSale2 = topSeller[1]?.value
    const sum = topeSale1 + topeSale2
    const otherValue = response.data.total-sum
    if(otherValue > 0){
    const other = {
      name:'Other',
      value:otherValue
    }
    bestSells.push(other)
  }    
    setSalesOverview(bestSells)
  }
  else{
    setSalesOverview(bestSells)
  }
  }
  useEffect(()=>{
    const fetchCurrentYearOrders = async() =>{
      try{
        const response  = await apiClient.get(`admin/dashboard/pie?year=${currentYear}`)
        if(response.status === 200){
          console.log('piechart data=',response.data)
          rearrangeResponse(response)
      }
      }
      catch(err){}
    }
    fetchCurrentYearOrders()
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
const filterByYearHandler = async(e)=>{
  setSelectedValue(e.target.value)
  try{
    const response  = await apiClient.get(`admin/dashboard/pie?year=${e.target.value}`)
    if(response.status === 200){
      rearrangeResponse(response)
    }
  }
  catch(err){}
}
    return (
      <div className='w-100 h-100 p-3'>
         <div className='d-flex justify-content-between'>
            <div className='fw-bold fs-5'>Sold Products</div>
            <div>
            <Form.Select onChange={filterByYearHandler} value={selectedValue}>
            {
              years.map(year =>{
               return (<option value={year} key={year} >Year {year}</option>)
              })
            }
      </Form.Select>
            </div>
        </div>
        <ResponsiveContainer width="100%" height="80%">
        <PieChart width={400} height={400}>
          <Pie
            data={salesOverview}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {salesOverview.length > 0 &&(salesOverview.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            )))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
        <div className='d-flex'>
          <div className='d-flex align-items-center'>
            <div className={`${classes.greenBg} border`}></div>
            <span className='text-white ms-2'>{salesOverview[0]?.name}</span>
          </div>
          <div className='d-flex align-items-center ms-2'>
            <div className={`${classes.yellowBg} border`}></div>
            <span className='text-white ms-2'>{salesOverview[1]?.name}</span>
          </div>
          {salesOverview.length > 2 &&(
            <div className='d-flex align-items-center ms-2'>
            <div className={`${classes.whiteBg} border`}></div>
            <span className='text-white ms-2'>{salesOverview[2]?.name}</span>
          </div>
          )}
          
        </div>
      </div>
    );
            }
            export default  SalesPieChart

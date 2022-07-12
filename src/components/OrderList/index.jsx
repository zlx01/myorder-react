import {NoteWrapper, OrderListWrapper} from "./style";

export default function OrderList({list, deleteOrder}) {
  return (
    <OrderListWrapper>
      {
        list.map(item => (
          <OrderItem key={item.id} data={item} deleteOrder={() => deleteOrder(item.id)}/>
        ))
      }
    </OrderListWrapper>
  )
}

const OrderItem = (props) => {
  const {data, deleteOrder} = props;
  return (
    <NoteWrapper>
      <div className="list-head">
        <span>{data.shop} &gt;</span>
        <span style={{color:'#ef3863'}}>{data.state}</span>
      </div>
      <div className="body">
        <img src={data.img} alt=""/>
        <div className="body_right">
          <div className="row">
            <div className="title">{data.title}</div>
            <div>￥ {data.price}</div>
          </div>
          <div className="row">
            <div>{data.desc}</div>
            <div>x {data.acount}</div>
          </div>
        </div>
      </div>
      <div className="foot">
        <div className="total">合计￥<span>{data.price}</span></div>
        <div className="btn-group">
          <button onClick={deleteOrder}>删除订单</button>
          <button>查看相似</button>
        </div>
      </div>
    </NoteWrapper>
  )
}

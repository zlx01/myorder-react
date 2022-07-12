import backIcon from '../../assets/images/back-icon.svg';
import searchIcon from '../../assets/images/search-icon.svg';
import moreIcon from '../../assets/images/more-icon.svg';
import emptyPic from '../../assets/images/empty.png';
import {EmptyItem, OrderWrapper} from "./style";
import {useEffect, useState} from "react";
import {getOrder, getRecommend} from "../../api/request";
import OrderList from "../OrderList";
import RecommendList from "../RecommendList";
import WeUI from "react-weui";
const { Toast } = WeUI;

export default function MyOrder() {
  const tabList = ["全部", "待支付", "待发货", "待收货/使用", "评价", "退款"];
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('全部');
  const [query, setQuery] = useState('');
  const [list, setList] = useState([]);
  const [recommend, setRecommend] = useState([]);

  const changeTab = (target) => {
    setTab(target);
  }
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      setQuery(e.target.value);
    }
  }

  const deleteOrder = (id) => {
    setList(list.filter(order => order.id !== id));
  }

  useEffect(() => {
    (async () => {
      const {data} = await getRecommend();
      setRecommend([...data]);
    })()
  }, []);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const {result} = await getOrder({tab, query});
      setList([...result])
      setLoading(false);
    })()
  }, [tab, query])

  return (
    <OrderWrapper>
      <div className="main-box">
        <div className="search-order">
          <img src={backIcon} alt="back"/>
          <div className="search-group">
            <input type="text" placeholder="搜索订单" onKeyUp={handleEnterKey}/>
            <img src={searchIcon} alt="search" className="search-img"/>
          </div>
          <img src={moreIcon} alt="more"/>
        </div>
        <ul>
          {
            tabList.map((item) => {
              return (
                <li key={item} className={tab === item ? "active" : ""} onClick={() => changeTab(item)}>{item}</li>
              )
            })
          }
        </ul>
        <Toast show={loading} icon="loading">
          加载中...
        </Toast>
        {list.length > 0 && <OrderList list={list} deleteOrder={deleteOrder}></OrderList>}
        {list.length === 0 && loading === false && (
          <EmptyItem>
            <img src={emptyPic} alt="empty"/>
            <h2>暂无订单</h2>
          </EmptyItem>
        )}
        {recommend.length > 0 && <RecommendList recommend={recommend}></RecommendList>}
      </div>
    </OrderWrapper>
  )
}

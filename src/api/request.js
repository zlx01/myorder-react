import axios from 'axios';

export const getOrder = ({tab, query}) =>
  axios
    .get('https://www.fastmock.site/mock/759aba4bef0b02794e330cccc1c88555/beers/order')
    .then(res => {
        let result = res.data;
        // let result = orders;
        // console.log(tab);
        if (tab) {
          switch (tab) {
            case "待支付":
              result = result.filter(item => item.state === "待支付");
              break;
            case "待发货":
              result = result.filter(item => item.state === "待发货");
              break;
            case "待收货/使用":
              result = result.filter(item => item.state === "待收货/使用");
              break;
            case "评价":
              result = result.filter(item => item.state === "评价");
              break;
            case "退款":
              result = result.filter(item => item.state === "退款");
              break;
            default:
              break;
          }
        }
        if (query) {
          result = result.filter(item => item.title.includes(query));
        }
        return Promise.resolve({
          result
        });
      }
    )

export const getRecommend = () =>
  axios.get('https://www.fastmock.site/mock/759aba4bef0b02794e330cccc1c88555/beers/goods')
